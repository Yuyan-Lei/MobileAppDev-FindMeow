import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { calculateDistance, getUserLocation } from "../../firebaseUtils/user";
import { useSwipe } from "../../utils/useSwipe";
import { BreederCard } from "../cards/BreederCard";
import { CatCard } from "../cards/CatCard";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";
import PostNewCatScreen from "./PostNewCatScreen";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";
import { ButtonGroup } from "../pressable/ButtonGroup";
import { SwiperFlatList } from "react-native-swiper-flatlist";

function EmptyStarPage({ origin, setSelectedIndex }) {

  return (
    <Pressable
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          width: 220,
          marginTop: "40%",
        }}
      >
        <Ionicons
          name="md-heart-circle-outline"
          size={FontSizes.blackHeart}
          color={Colors.black}
        />
        <Text
          style={{
            fontFamily: FontFamily.heavy,
            color: Colors.black,
            fontSize: FontSizes.button,
            marginTop: 15,
          }}
        >
          Nothing liked yet
        </Text>
        <Text
          style={{
            marginTop: 15,
            color: Colors.reminderText,
            fontFamily: FontFamily.normal,
            textAlign: "center",
          }}
        >
          All the {origin} you've liked will show up here.
        </Text>
      </View>
    </Pressable>
  );
}

function CatsScreen({ navigation, cats, refreshing, onRefresh, allCatteries }) {
  const [location, setLocation] = useState(null);

  /* Set user location. */
  useEffect(() => {
    (async () => {
      let location = await getUserLocation();
      setLocation(location);
    })();
  }, []);

  return (
    <View 
      style={{
        flex: 1,
        width: "100%",
      }}>
      {cats.length > 0 ? (
        <FlatList
          data={cats}
          renderItem={({ item, index }) => {
            return (
              <CatCard
                key={item.id}
                cat={item}
                location={location}
                navigation={navigation}
                catteryDoc={allCatteries.find(
                  (cattery) =>
                    cattery.email && cattery.email === item.catteryEmail
                )}
              />
            );
          }}
          numColumns={2}
          extraData={location}
          ListFooterComponent={<View style={{ height: 100 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyStarPage origin="cats" />
      )}
    </View>
  );
}

function CatteriesScreen({
  navigation,
  catteries,
  refreshing,
  onRefresh,
  setSelectedIndex,
  userLikedCatteryEmails,
}) {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      {catteries.length > 0 ? (
        <FlatList
          data={catteries}
          renderItem={({ item, index }) => {
            return (
              <BreederCard
                key={item.email}
                cattery={item}
                navigation={navigation}
                userLikedCatteryEmails={userLikedCatteryEmails}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          ListFooterComponent={<View style={{ height: 100 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <EmptyStarPage origin="catteries" />
      )}
    </View>
  );
}

function MainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const [likedCatteries, setLikedCatteries] = useState([]);

  const [allCats, setAllCats] = useState([]);
  const [allCatteries, setAllCatteries] = useState([]);
  const [location, setLocation] = useState(null);
  const [userLikedCatEmails, setUserLikedCatEmails] = useState([]);
  const [userLikedCatteryEmails, setUserLikedCatteryEmails] = useState([]);
  const availableSelections = ["Cats", "Catteries"];

  const flatListRef = useRef();
  const { height, width } = useWindowDimensions();

  /* renew allCats, allCatteries, location, userLikedCats, userLikedCatteries */
  useEffect(() => {
    const allCatQuery = query(collection(db, "Cats"));
    const unsubscribeCat = onSnapshot(allCatQuery, (catSnapShot) => {
      const allCats = catSnapShot.docs.map((doc) => {
        return {
          id: doc.id,
          email: doc.id,
          ...doc.data(),
        };
      });
      setAllCats(allCats);
    });

    const allCatteryQuery = query(
      collection(db, "Users"),
      where("isCattery", "==", true)
    );
    const unsubscribeCattery = onSnapshot(
      allCatteryQuery,
      (catterySnapShot) => {
        const allCatteries = catterySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            email: doc.id,
            ...doc.data(),
          };
        });
        setAllCatteries(allCatteries);
      }
    );

    getUserLocation().then((location) => setLocation(location));

    const userDoc = query(doc(db, "Users", getCurrentUserEmail()));
    const unsubscribeUser = onSnapshot(userDoc, (userSnapShot) => {
      const userLikedCats = userSnapShot.data().likeCats;
      const userLikedCatteries = userSnapShot.data().likeCatteries;
      setUserLikedCatEmails(userLikedCats || []);
      setUserLikedCatteryEmails(userLikedCatteries || []);
    });

    return () => {
      unsubscribeCat();
      unsubscribeCattery();
      unsubscribeUser();
    };
  }, []);

  /* renew likedCats */
  useEffect(() => {
    const newLikedCats = allCats
      .map((cat) => {
        const birthday = new Date(cat.Birthday);
        const now = new Date();
        const age =
          now.getMonth() -
          birthday.getMonth() +
          12 * (now.getFullYear() - birthday.getFullYear());

        const cattery = allCatteries.find((ca) => ca.email === cat.Cattery);
        const distance =
          cattery && cattery.geoLocation && location
            ? calculateDistance(location, cattery.geoLocation)
            : null;
        return {
          id: cat.id,
          name: cat.Breed,
          sex: cat.Gender,
          price: cat.Price,
          month: age,
          photo: cat.Picture,
          cattery: cat.Cattery,
          distance,
          uploadTime: cat.UploadTime,
          ...cat,
        };
      })
      .filter((entry) => userLikedCatEmails.includes(entry.id))
      .sort((d1, d2) => d2.uploadTime - d1.uploadTime);

    setLikedCats(newLikedCats);
  }, [allCats, allCatteries, location, userLikedCatEmails]);

  /* renew likedCatteries */
  useEffect(() => {
    const newLikedCatteries = allCatteries
      .map((cattery) => {
        const distance =
          cattery.geoLocation && location
            ? calculateDistance(location, cattery.geoLocation)
            : 9999;
        return {
          id: cattery.id,
          email: cattery.id,
          name: cattery.name,
          photo: cattery.photo,
          distance,
          ...cattery,
        };
      })
      .filter((entry) => userLikedCatteryEmails.includes(entry.id))
      .sort((d1, d2) => d2.uploadTime - d1.uploadTime);

    setLikedCatteries(newLikedCatteries);
  }, [allCatteries, userLikedCatteryEmails]);

  return (
    <View style={styles.container}>
      <View style={{ margin: 12 }}>
        <View>
          <TitleText>Collections</TitleText>
        </View>
      </View>

      <ButtonGroup
        selectedValue={availableSelections[selectedIndex]}
        setSelectedValue={(value) => {
          const index = availableSelections.indexOf(value);
          flatListRef.current.scrollToIndex({ index, animated: true });
        }}
        selections={availableSelections}
        marginHorizontal={28}
      />

      <View style={{ flex: 1 }}>
        <SwiperFlatList
          ref={flatListRef}
          onViewableItemsChanged={(params) =>
            setSelectedIndex(params.changed?.[0]?.index)
          }
        >
          <View
            style={{ width, paddingHorizontal: 16 }}
          >
            <CatsScreen
              navigation={navigation}
              cats={likedCats}
              allCatteries={allCatteries}
            />
          </View>
          <View style={{ width, paddingHorizontal: 16 }}>
            <CatteriesScreen
              navigation={navigation}
              catteries={likedCatteries}
              userLikedCatteryEmails={userLikedCatteryEmails}
              setSelectedIndex={setSelectedIndex}
            />
          </View>
        </SwiperFlatList>
      </View>
    </View>
  );
}

export default function StarListScreen({ route, navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="CatInformation" component={CatInformation} />
      <Stack.Screen name="CatteryProfile" component={CatteryProfileScreen} />
      <Stack.Screen name="PostNewCatScreen" component={PostNewCatScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 55,
    backgroundColor: Colors.white,
    flex: 1,
  },
});
