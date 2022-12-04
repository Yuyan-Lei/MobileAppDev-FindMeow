import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { getAllCats } from "../../firebaseUtils/cat";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { Ionicons } from '@expo/vector-icons';
import {
  calculateDistance,
  getAllCatteries,
  getUserLocation,
} from "../../firebaseUtils/user";
import { globalVariables } from "../../utils/globalVariables";
import { useSwipe } from "../../utils/useSwipe";
import { BreederCard } from "../cards/BreederCard";
import { CatCard } from "../cards/CatCard";
import { FilterButtons } from "../pressable/FilterButtons";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";
import PostNewCatScreen from "./PostNewCatScreen";

function EmptyStarPage({origin}) {
  return (
    <View style={{ 
      alignItems: "center",
      width: 220,
      marginTop: "40%", 
    }}>
      <Ionicons name="md-heart-circle-outline" size={56} color="black" />
      <Text style={{
        fontFamily: "PoppinsBold",
        color: Colors.black,
        fontSize: "18",
        marginTop: 15,
      }}>Nothing stared yet</Text>
      <Text style={{
        marginTop: 15,
        color: "rgb(154, 153, 153)",
        fontFamily: "Poppins",
        textAlign: "center"
      }}>All the {origin} you've stared will show up here.</Text>
    </View>
  );
}

function CatsScreen({
  navigation,
  cats,
  isScrollToTop,
  onScrollToTop,
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
    cats.length > 0 ?
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 0,
        paddingBottom: 100,
      }}
    >
      <FlatList
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
        onScrollEndDrag={(event) => {
          if (isScrollToTop(event)) {
            onScrollToTop();
          }
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        showsVerticalScrollIndicator={false}
      />
    </View> : <EmptyStarPage origin="cats" />
  );
}

function CatteriesScreen({
  navigation,
  catteries,
  isScrollToTop,
  onScrollToTop,
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
    <View style={{ flex: 1 }}>
      {catteries.length > 0 ? 
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
        onScrollEndDrag={(event) => {
          if (isScrollToTop(event)) {
            onScrollToTop();
          }
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      /> : <EmptyStarPage origin="catteries" />}
    </View>
  );
}

function MainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [likeCats, setLikeCats] = useState([]);
  const [likeCatteries, setLikeCatteries] = useState([]);

  function isScrollToTop(event) {
    return event.nativeEvent.contentOffset.y < -100;
  }

  const [lastTimeRefreshLikedCatData, setLastTimeRefreshLikedCatData] =
    useState(0);

  async function refreshLikedCatData({ forceLoad = false } = {}) {
    const nowTime = new Date().getTime();
    if (!forceLoad && nowTime - lastTimeRefreshLikedCatData < 10000) return;
    setLastTimeRefreshLikedCatData(nowTime);

    const userDoc = doc(db, "Users", getCurrentUserEmail());
    const likedCatSnapShot = await getDoc(userDoc);

    const likeCats = likedCatSnapShot.data().likeCats;
    const catsSnapshots = await getAllCats();
    const allCatteries = await getAllCatteries();
    const location = await getUserLocation();

    const newLikedCats = catsSnapshots.docs
      .map((catEntry) => {
        const birthday = new Date(catEntry.data().Birthday);
        const now = new Date();
        const age =
          now.getMonth() -
          birthday.getMonth() +
          12 * (now.getFullYear() - birthday.getFullYear());

        const cattery = allCatteries.find(
          (ca) => ca.email === catEntry.data().Cattery
        );
        const distance =
          cattery.geoLocation && location
            ? calculateDistance(location, cattery.geoLocation)
            : 9999;
        return {
          id: catEntry.id,
          name: catEntry.data().Breed,
          sex: catEntry.data().Gender,
          price: catEntry.data().Price,
          month: age,
          photo: catEntry.data().Picture,
          cattery: catEntry.data().Cattery,
          distance,
          uploadTime: catEntry.data().UploadTime,
        };
      })
      .filter((entry) => likeCats.includes(entry.id))
      .sort((d1, d2) => d2.uploadTime - d1.uploadTime);

    setLikeCats(newLikedCats);
  }

  const [lastTimeRefreshLikedCatteryData, setLastTimeRefreshLikedCatteryData] =
    useState(0);

  async function refreshLikedCatteryData({ forceLoad = false } = {}) {
    const nowTime = new Date().getTime();
    if (!forceLoad && nowTime - lastTimeRefreshLikedCatteryData < 10000) return;
    setLastTimeRefreshLikedCatteryData(nowTime);

    const userDoc = doc(db, "Users", getCurrentUserEmail());
    const userSnap = await getDoc(userDoc);

    const likeCatteries = userSnap.data().likeCatteries || [];
    const catterySnap = await getAllCatteries();

    setLikeCatteries(
      catterySnap.filter((cattery) => likeCatteries.includes(cattery.email))
    );
  }

  /* subscribe user likes to display liked catteries and catteries  - start */
  useEffect(() => {
    refreshLikedCatData();
    refreshLikedCatteryData();

    const intervalCat = setInterval(() => {
      refreshLikedCatData();
    }, 13000);

    const intervalCattery = setInterval(() => {
      refreshLikedCatteryData();
    }, 17000);

    const intervalImmediateRefresh = setInterval(() => {
      if (globalVariables.starListNeedReload) {
        globalVariables.starListNeedReload = false;
        refreshLikedCatData({ forceLoad: true });
        refreshLikedCatteryData({ forceLoad: true });
      }
    }, 200);

    return () => {
      clearInterval(intervalCat);
      clearInterval(intervalCattery);
      clearInterval(intervalImmediateRefresh);
    };
  }, []);
  /* subscribe user likes to display liked catteries and catteries  - end */

  const configGestureRecognizer = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

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
          cats={likeCats}
          isScrollToTop={isScrollToTop}
          onScrollToTop={() => refreshLikedCatData({ forceLoad: true })}
          setSelectedIndex={setSelectedIndex}
        />
      )}
      {selectedIndex === 1 && (
        <CatteriesScreen
          navigation={navigation}
          catteries={likeCatteries}
          isScrollToTop={isScrollToTop}
          onScrollToTop={() => refreshLikedCatteryData({ forceLoad: true })}
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
