import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { db } from "../../firebaseUtils/firebase-setup";
import { BreederCard } from "../cards/BreederCard";
import { FilterButton } from "../pressable/FilterButton";
import { SearchBar } from "../pressable/SearchBar";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";
import FindBreederFilter from "./FindBreederFilter";
import PostNewCatScreen from "./PostNewCatScreen";

function MainScreen({ route, navigation }) {
  const [searchName, setSearchName] = useState("");

  /* values used for DiscoverFilter start */
  const [visible, setVisible] = useState(false);
  const [catteries, setCatteries] = useState([]);

  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCatNum, setSelectedCatNum] = useState("All");

  const refRBSheet = useRef();
  /* values used for DiscoverFilter end */

  function resetAllFilters() {
    setSelectedBreed("");
    setSelectedState("");
    setSelectedCatNum("");
  }

  function isScrollToTop(event) {
    return event.nativeEvent.contentOffset.y < 100;
  }

  function onScrollToTop() {
    refreshCatteryData();
  }

  const [refreshCatteryDataLock, setRefreshCatteryData] = useState(false);
  async function refreshCatteryData() {
    if (refreshCatteryDataLock) return;
    setRefreshCatteryData(true);

    try {
      /* Grouping constraints starts */
      let clauseBreed, clauseState, clauseCatNum;

      if (selectedBreed !== "All") {
        clauseBreed = where("breed", "==", selectedBreed);
      }

      if (selectedState !== "All") {
        // TODO
      }

      if (selectedCatNum.toLowerCase() === "yes") {
        clauseCatNum = where("cats", "!=", []);
      } else if (selectedCatNum.toLowerCase() === "no") {
        clauseCatNum = where("cats", "==", []);
      }

      const candidates = [clauseBreed, clauseState, clauseCatNum];

      const constraints = candidates.filter((item) => item !== undefined);
      /* Grouping constraints ends */
      const q = query(
        collection(db, "Users"),
        where("isCattery", "==", true),
        ...constraints
      );

      const catterySnap = await getDocs(q);

      setCatteries(
        catterySnap.docs
          .map((catteryDoc) => {
            return {
              email: catteryDoc.id,
              ...catteryDoc.data(),
            };
          })
          .filter((cattery) => {
            return (
              searchName === "" ||
              (cattery.catteryName &&
                cattery.catteryName
                  .toLowerCase()
                  .includes(searchName.toLowerCase()))
            );
          })
      );
    } finally {
      setRefreshCatteryData(false);
    }
  }

  useEffect(() => {
    refreshCatteryData();
  }, [searchName, selectedBreed, selectedState, selectedCatNum]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshCatteryData();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.containter}>
      <View style={styles.cardView}>
        <TitleText>Find Breeders</TitleText>
      </View>
      <View style={styles.toolBarView}>
        <View style={styles.searchBarView}>
          <SearchBar text={searchName} setText={setSearchName} />
        </View>
        <FilterButton
          onPress={() => refRBSheet.current.open()}
          size={24}
          length={60}
        />
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          keyboardAvoidingViewEnabled={true}
          customStyles={styles.RBSheetCustomStyles}
          height={495}
        >
          <FindBreederFilter
            states={{
              visible,
              setVisible,

              selectedBreed,
              setSelectedBreed,
              selectedState,
              setSelectedState,
              selectedCatNum,
              setSelectedCatNum,

              resetAllFilters,
              refRBSheet,
            }}
          />
        </RBSheet>
      </View>
      <View style={styles.listView}>
        <FlatList
          data={catteries}
          renderItem={({ item }) => (
            <BreederCard cattery={item} navigation={navigation} />
          )}
          ListFooterComponent={<View style={{ height: 120 }} />}
          onScrollEndDrag={(event) => {
            if (isScrollToTop(event)) {
              onScrollToTop();
            }
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

export default function FindBreederMainScreen() {
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
  RBSheetCustomStyles: {
    wrapper: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      container: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      },
      draggableIcon: {
        backgroundColor: "#EFEFEF",
        width: 100,
      },
    },
    container: {
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
    },
  },
  containter: {
    alignItems: "center",
    paddingTop: 55,
    backgroundColor: "white",
    flex: 1,
  },
  cardView: {
    alignItems: "center",
    padding: 12,
  },
  toolBarView: {
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 60,
  },
  searchBarView: {
    backgroundColor: Colors.dimGray,
    marginRight: 12,
    borderRadius: 10,
  },
  listView: {
    paddingVertical: 16,
    width: "100%",
  },
});
