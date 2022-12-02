import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { db } from "../../firebaseUtils/firebase-setup";
import { calculateDistance, getAllCatteries, getUserLocation } from "../../firebaseUtils/user";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";
import DiscoverFilter from "./DiscoverFilter";
import PostNewCatScreen from "./PostNewCatScreen";

function MainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* values used for DiscoverFilter start */
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);

  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState([0, 10000]);

  const refRBSheet = useRef();
  /* values used for DiscoverFilter end */

  function resetAllFilters() {
    setValue(0);

    setSelectedBreed("");
    setSelectedAge("");
    setSelectedState("");
    setSelectedGender("");
    setSelectedPrice([0, 10000]);
  }

  function isScrollToTop(event) {
    return event.nativeEvent.contentOffset.y < 100;
  }

  function onScrollToTop() {
    refreshCatData(selectedIndex);
  }

  const [refreshCatDataLock, setRefreshCatDataLock] = useState(false);
  async function refreshCatData(selectedIndex) {
    if (refreshCatDataLock) return;
    setRefreshCatDataLock(true);
    setSelectedIndex(selectedIndex);
    let location = await getUserLocation();
    const allCatteries = await getAllCatteries();
    try {
      const catSnapShot = await getDocs(collection(db, "Cats"));

      let dataBeforeSorting =
        catSnapShot.docs.map((catDoc) => {
          const birthday = new Date(catDoc.data().Birthday);
          const now = new Date();
          const cattery = allCatteries.find(ca => ca.email === catDoc.data().Cattery);
          // if cattery doesn't have location, use 9999 to make cat in the bottom.
          const distance = cattery.geoLocation && location ? calculateDistance(location, cattery.geoLocation) : 9999;
          let age =
            now.getMonth() -
            birthday.getMonth() +
            12 * (now.getFullYear() - birthday.getFullYear());
          // age cannot be negative
          if (age === undefined || isNaN(age) || age < 0) {
            age = 0;
          }

          return {
            id: catDoc.id,
            name: catDoc.data().Breed,
            sex: catDoc.data().Gender,
            price: catDoc.data().Price,
            month: age,
            photo: catDoc.data().Picture,
            cattery: catDoc.data().Cattery,
            distance,
            uploadTime: catDoc.data().UploadTime,
          };
        });
      
        // console.log(selectedIndex);
        // 1. newer post
      if (selectedIndex === 0) {
        setData(dataBeforeSorting.sort((d1, d2) => d2.uploadTime - d1.uploadTime));
      }
      // 2. nearby Post
      else if (selectedIndex === 1) {
        setData(dataBeforeSorting.sort((d1, d2) => d1.distance - d2.distance));
      }
      // 3. Lower Price
      else if (selectedIndex === 2) {
        setData(dataBeforeSorting.sort((d1, d2) => d1.price - d2.price));
      }
    } finally {
      setRefreshCatDataLock(false);
    }
  }

  /* data collector used for top filter tags - start */
  const [data, setData] = useState([]);
  useEffect(() => {
    refreshCatData(selectedIndex);
  }, []);
  /* data collector used for top filter tags - end */

  /* events for top filter tags - start */
  const onFilterChange = (value) => {
    setSelectedIndex(value);
    refreshCatData(value);
  };
  /* events for top filter tags - end */

  useEffect(() => {
    const interval = setInterval(() => {
      refreshCatData(selectedIndex);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View>
          <TitleText>Discover</TitleText>
        </View>
        <View style={styles.filterButtonView}>
          <FilterButton
            onPress={() => refRBSheet.current.open()}
            size={18}
            length={29}
          />
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={styles.RBSheetCustomStyles}
        height={670}
      >
        <DiscoverFilter
          states={{
            visible,
            setVisible,
            value,
            setValue,

            selectedState,
            setSelectedState,
            selectedBreed,
            setSelectedBreed,
            selectedAge,
            setSelectedAge,
            selectedGender,
            setSelectedGender,
            selectedPrice,
            setSelectedPrice,

            resetAllFilters,
            refRBSheet,
          }}
        />
      </RBSheet>

      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={onFilterChange}
        buttons={["Newer Post", "Nearby", "Lower Price"]}
      />

      <View style={{ paddingHorizontal: 16 }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <CatCard cat={item} navigation={navigation} />
          )}
          numColumns={2}
          ListFooterComponent={<View style={{ height: 80 }} />}
          onScrollEndDrag={(event) => {
            if (isScrollToTop(event)) {
              onScrollToTop();
            }
          }}
        />
      </View>
    </View>
  );
}

export default function DiscoverMainScreen({ route, navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="CatInformation" component={CatInformation} />
      <Stack.Screen name="PostNewCatScreen" component={PostNewCatScreen} />
      <Stack.Screen name="CatteryProfile" component={CatteryProfileScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  RBSheetCustomStyles: {
    wrapper: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      draggableIcon: {
        backgroundColor: "#EFEFEF",
        width: 100,
      },
    },
    container: {
      borderRadius: 28,
    },
  },
  filterButtonView: {
    position: "absolute",
    right: 24,
    top: 18,
  },
  headerView: {
    padding: 12,
  },
  container: {
    // paddingHorizontal: 12,
    paddingTop: 55,
    paddingBottom: 200,
    backgroundColor: "white",
  },
});
