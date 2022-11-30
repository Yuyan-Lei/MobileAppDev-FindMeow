import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { db } from "../../firebaseUtils/firebase-setup";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import PostNewCatScreen from "./PostNewCatScreen";
import DiscoverFilter from "./DiscoverFilter";
import { getUserLocation } from "../../firebaseUtils/user";

function MainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [location, setLocation] = useState(null);

  /* values used for DiscoverFilter start */
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);

  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");

  const refRBSheet = useRef();
  /* values used for DiscoverFilter end */

  function resetAllFilters() {
    setValue(0);

    setSelectedBreed("");
    setSelectedAge("");
    setSelectedState("");
    setSelectedGender("");
  }

  function isScrollToTop(event) {
    return event.nativeEvent.contentOffset.y < 100;
  }

  function onScrollToTop() {
    refreshCatData();
  }

  /* Set user location. */
  useEffect(() => {
    (async () => {
      let location = await getUserLocation();
      setLocation(location);
    })();
  }, []);

  const [refreshCatDataLock, setRefreshCatDataLock] = useState(false);
  async function refreshCatData() {
    setRefreshCatDataLock(true);
    try {
      let q;
      // 1. Newer Post
      if (selectedIndex == 0) {
        q = query(collection(db, "Cats"), orderBy("UploadTime", "desc"));
      }
      // 2. Nearby Post
      else if (selectedIndex == 1) {
        q = query(collection(db, "Cats"), orderBy("UploadTime", "desc"));
        // TODO ...
      }
      // 3. Lower Price
      else if (selectedIndex == 2) {
        q = query(collection(db, "Cats"), orderBy("Price", "desc"));
      }

      const catSnapShot = await getDocs(q);

      setData(
        catSnapShot.docs.map((catDoc) => {
          const birthday = new Date(catDoc.data().Birthday);
          const now = new Date();
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
            uploadTime: catDoc.data().UploadTime,
          };
        })
      );
    } finally {
      setRefreshCatDataLock(false);
    }
  }

  /* data collector used for top filter tags - start */
  const [data, setData] = useState([]);
  useEffect(() => {
    refreshCatData();
  }, []);
  /* data collector used for top filter tags - end */

  /* events for top filter tags - start */
  const onFilterChange = (value) => {
    let dataCopy = data;
    // 1. newer post
    if (value === 0) {
      setData(dataCopy.sort((d1, d2) => d2.uploadTime - d1.uploadTime));
    }
    // 2. nearby Post
    else if (value === 1) {
      Alert.alert(
        "Feature for this button is coming soon~",
        "See you next time!",
        [{ text: "Sad" }, { text: "Wait for you" }]
      );
    }
    // 3. Lower Price
    else if (value === 2) {
      setData(dataCopy.sort((d1, d2) => d1.price - d2.price));
    }
    setSelectedIndex(value);
  };
  /* events for top filter tags - end */

  useEffect(() => {
    setInterval(() => {
      refreshCatData();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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

      {/* <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      /> */}
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

      <View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <CatCard cat={item} navigation={navigation} location={location} />
          )}
          numColumns={2}
          extraData={location}
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
    paddingHorizontal: 12,
    paddingTop: 55,
    paddingBottom: 200,
  },
});
