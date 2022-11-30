import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { getAllCats } from "../../firebaseUtils/cat";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { getAllCatteries, getUserLocation } from "../../firebaseUtils/user";
import { BreederCard } from "../cards/BreederCard";
import { CatCard } from "../cards/CatCard";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";

function CatsScreen({ navigation, cats, isScrollToTop, onScrollToTop }) {
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
      />
    </View>
  );
}

function CatteriesScreen({
  navigation,
  catteries,
  isScrollToTop,
  onScrollToTop,
}) {
  return (
    <View style={{ width: "100%" }}>
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
      />
    </View>
  );
}

function MainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [likeCats, setLikeCats] = useState([]);
  const [likeCatteries, setLikeCatteries] = useState([]);

  function isScrollToTop(event) {
    return event.nativeEvent.contentOffset.y < 100;
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

    const newLikedCats = catsSnapshots.docs
      .map((catEntry) => {
        const birthday = new Date(catEntry.data().Birthday);
        const now = new Date();
        const age =
          now.getMonth() -
          birthday.getMonth() +
          12 * (now.getFullYear() - birthday.getFullYear());
        return {
          id: catEntry.id,
          name: catEntry.data().Breed,
          sex: catEntry.data().Gender,
          price: catEntry.data().Price,
          month: age,
          photo: catEntry.data().Picture,
          cattery: catEntry.data().Cattery,
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

    return () => {
      clearInterval(intervalCat);
      clearInterval(intervalCattery);
    };
  }, []);
  /* subscribe user likes to display liked catteries and catteries  - end */

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
        />
      )}
      {selectedIndex === 1 && (
        <CatteriesScreen
          navigation={navigation}
          catteries={likeCatteries}
          isScrollToTop={isScrollToTop}
          onScrollToTop={() => refreshLikedCatteryData({ forceLoad: true })}
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
