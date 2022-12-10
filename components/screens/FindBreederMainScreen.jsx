import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, RefreshControl } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { BreederCard } from "../cards/BreederCard";
import { stateFullNameToAbbr } from "../listContents/allStates";
import { FilterButton } from "../pressable/FilterButton";
import { SearchBar } from "../pressable/SearchBar";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";
import FindBreederFilter from "./FindBreederFilter";
import PostNewCatScreen from "./PostNewCatScreen";
import { FontSizes } from "../styles/FontSizes";

function MainScreen({ route, navigation }) {
  const [searchName, setSearchName] = useState("");

  /* values used for DiscoverFilter start */
  const [visible, setVisible] = useState(false);
  const [catteries, setCatteries] = useState([]);
  const [catteriesFromQuery, setCatteriesFromQuery] = useState([]);

  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCatNum, setSelectedCatNum] = useState("All");

  const [userLikedCatteryEmails, setUserLikedCatteryEmails] = useState([]);

  /* renew userLikedCatteryEmails */
  useEffect(() => {
    const userDoc = query(doc(db, "Users", getCurrentUserEmail()));
    const unsubscribeUser = onSnapshot(userDoc, (userSnapShot) => {
      const userLikedCatteries = userSnapShot.data().likeCatteries;
      setUserLikedCatteryEmails(userLikedCatteries);
    });

    return () => {
      unsubscribeUser();
    };
  }, []);

  const refRBSheet = useRef();
  /* values used for DiscoverFilter end */

  /* use reference for setInterval functions
     otherwise functions cannot get newest variables */
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.selectedBreed = selectedBreed;
    savedCallback.selectedState = selectedState;
    savedCallback.selectedCatNum = selectedCatNum;
  }, [selectedBreed, selectedState, selectedCatNum]);

  function resetAllFilters() {
    setSelectedBreed("");
    setSelectedState("");
    setSelectedCatNum("");
  }

  function makeQuery(q) {
    try {
      let clauseBreed, clauseState, clauseCatNum;

      const selectedBreed = savedCallback.selectedBreed;
      const selectedCatNum = savedCallback.selectedCatNum;

      if (selectedBreed !== "All" && selectedBreed !== "") {
        clauseBreed = where("breed", "==", selectedBreed);
      }

      if (selectedCatNum.toLowerCase() === "yes") {
        clauseCatNum = where("cats", "!=", []);
      } else if (selectedCatNum.toLowerCase() === "no") {
        clauseCatNum = where("cats", "==", []);
      }

      const candidates = [clauseBreed, clauseState, clauseCatNum];

      const constraints = candidates.filter((item) => item !== undefined);

      q = query(
        collection(db, "Users"),
        where("isCattery", "==", true),
        ...constraints
      );
    } catch (e) {
      console.error(e);
    }
    return q;
  }

  useEffect(() => {
    const q = makeQuery(q);
    const unsubscribe = onSnapshot(q, (catterySnap) => {
      setCatteriesFromQuery(
        catterySnap.docs.map((catteryDoc) => {
          return {
            email: catteryDoc.id,
            ...catteryDoc.data(),
          };
        })
      );
    });
    return unsubscribe;
  }, [selectedBreed, selectedCatNum]);

  useEffect(() => {
    setCatteries(
      catteriesFromQuery
        .filter((cattery) => {
          return (
            searchName === "" ||
            (cattery.catteryName &&
              cattery.catteryName
                .toLowerCase()
                .includes(searchName.toLowerCase()))
          );
        })
        .filter((cattery) => {
          return (
            selectedState === "All" ||
            selectedState === "" ||
            (cattery.shortAddress &&
              cattery.shortAddress.slice(-2) ===
                stateFullNameToAbbr[selectedState])
          );
        })
    );
  }, [catteriesFromQuery, searchName, selectedState]);

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
          size={FontSizes.smallFilter}
          length={40}
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
            <BreederCard
              cattery={item}
              navigation={navigation}
              userLikedCatteryEmails={userLikedCatteryEmails}
            />
          )}
          ListFooterComponent={<View style={{ height: 200 }} />}
          refreshControl={<RefreshControl />}
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
      backgroundColor: Colors.filterWrapper,
      container: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      },
      draggableIcon: {
        backgroundColor: Colors.dragglableIcon,
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
    backgroundColor: Colors.white,
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
    paddingHorizontal: 52,
    marginTop: 12,
  },
  searchBarView: {
    backgroundColor: Colors.dimGray,
    marginRight: 12,
    borderRadius: 10,
  },
  listView: {
    padding: 16,
    width: "100%",
  },
});
