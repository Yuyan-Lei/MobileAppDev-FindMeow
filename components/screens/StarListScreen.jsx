import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { calculateDistance, getUserLocation } from "../../firebaseUtils/user";
import { useSwipe } from "../../utils/useSwipe";
import { BreederCard } from "../cards/BreederCard";
import { CatCard } from "../cards/CatCard";
import { FilterButtons } from "../pressable/FilterButtons";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";
import PostNewCatScreen from "./PostNewCatScreen";

function EmptyStarPage({ origin, setSelectedIndex }) {
  function onSwipeLeft() {
    setSelectedIndex(1);
  }

  function onSwipeRight() {
    setSelectedIndex(0);
  }

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight);

  return (
    <Pressable
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
      }}
      onPressIn={onTouchStart}
      onPressOut={onTouchEnd}
    >
      <View
        style={{
          alignItems: "center",
          width: 220,
          marginTop: "40%",
        }}
      >
        <Ionicons name="md-heart-circle-outline" size={56} color="black" />
        <Text
          style={{
            fontFamily: "PoppinsBold",
            color: Colors.black,
            fontSize: 18,
            marginTop: 15,
          }}
        >
          Nothing liked yet
        </Text>
        <Text
          style={{
            marginTop: 15,
            color: "rgb(154, 153, 153)",
            fontFamily: "Poppins",
            textAlign: "center",
          }}
        >
          All the {origin} you've liked will show up here.
        </Text>
      </View>
    </Pressable>
  );
}

function CatsScreen({
  navigation,
  cats,
  refreshing,
  onRefresh,
  setSelectedIndex,
}) {
  const [location, setLocation] = useState(null);

  /* Set user location. */
  useEffect(() => {
    (async () => {
      let location = await getUserLocation();
      setLocation(location);
    })();
  }, []);

  function onSwipeLeft() {
    setSelectedIndex(1);
  }

  function onSwipeRight() {
    setSelectedIndex(0);
  }

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight);

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 0,
        width: "100%",
        flex: 1,
      }}
    >
      {cats.length > 0 ? (
        <FlatList
          style={{ flex: 1 }}
          data={cats}
          renderItem={({ item, index }) => {
            return (
              <CatCard
                key={item.id}
                cat={item}
                location={location}
                navigation={navigation}
              />
            );
          }}
          numColumns={2}
          extraData={location}
          ListFooterComponent={<View style={{ height: 60 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
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
}) {
  function onSwipeLeft() {
    setSelectedIndex(1);
  }

  function onSwipeRight() {
    setSelectedIndex(0);
  }

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        padding: 16,
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
              />
            );
          }}
          numColumns={1}
          ListFooterComponent={<View style={{ height: 60 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      ) : (
        <EmptyStarPage origin="catteries" setSelectedIndex={setSelectedIndex} />
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
      setUserLikedCatEmails(userLikedCats);
      setUserLikedCatteryEmails(userLikedCatteries);
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
          uploadTime: cattery.uploadTime,
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

      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        buttons={["Cats", "Catteries"]}
      />
      {selectedIndex === 0 && (
        <CatsScreen
          navigation={navigation}
          cats={likedCats}
          // refreshing={refreshingCat}
          // onRefresh={() => refreshLikedCatData({ forceLoad: true })}
          setSelectedIndex={setSelectedIndex}
        />
      )}
      {selectedIndex === 1 && (
        <CatteriesScreen
          navigation={navigation}
          catteries={likedCatteries}
          // refreshing={refreshingCattery}
          // onRefresh={() => refreshLikedCatteryData({ forceLoad: true })}
          setSelectedIndex={setSelectedIndex}
        />
      )}
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
    backgroundColor: "white",
    flex: 1,
  },
});
