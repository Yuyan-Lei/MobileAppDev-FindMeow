import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { db } from "../../firebaseUtils/firebase-setup";
import { BreederCard } from "../cards/BreederCard";
import { FilterButton } from "../pressable/FilterButton";
import { SearchBar } from "../pressable/SearchBar";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import CatteryProfileScreen from "./CatteryProfileScreen";
import FindBreederFilter from "./FindBreederFilter";


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

  useEffect(() => {
    const q = query(collection(db, "Users"), where('isCattery', '==', true));
    const unSubscribe = onSnapshot(q, (snapshot) => {
      setCatteries(snapshot.docs.map((entry) => entry.data()));
    });

    return () => unSubscribe();
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
          animationType="slide"
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            container: {
              borderRadius: 28,
            },
            draggableIcon: {
              backgroundColor: "#EFEFEF",
              width: 100,
            },
          }}
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
          renderItem={({ item }) => <BreederCard cattery={item} navigation={navigation} />}
          ListFooterComponent={<View style={{ height: 250 }} />}
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
      <Stack.Screen name="CatteryProfile" component={CatteryProfileScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
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
