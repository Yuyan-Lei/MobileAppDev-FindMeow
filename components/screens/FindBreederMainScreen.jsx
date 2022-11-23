import React, { useState, useRef } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { BreederCard } from "../cards/BreederCard";
import { SearchBar } from "../pressable/SearchBar";
import { TitleText } from "../texts/TitleText";
import FindBreederFilter from "./FindBreederFilter";
import { FilterButton } from "../pressable/FilterButton";
import { Colors } from "../styles/Colors";
import RBSheet from "react-native-raw-bottom-sheet";

const mockBreeders = [
  {
    name: "Angel Girls",
    breed: "Ragdoll",
    availableCount: 5,
    location: "Washington, D.C.",
    image: "resources/cats/Angel Girls.png",
  },
  {
    name: "Heavenly Cats",
    breed: "British Shorthair",
    availableCount: 1,
    location: "San Jose, CA",
  },
  {
    name: "Osoragdolls",
    breed: "Ragdoll",
    availableCount: 2,
    location: "Los Angeles, CA",
  },
  {
    name: "Blue Gems",
    breed: "Ragdoll",
    availableCount: 0,
    location: "Riverside, WA",
  },
  {
    name: "Osoragdolls",
    breed: "Ragdoll",
    availableCount: 2,
    location: "Los Angeles, CA",
  },
  {
    name: "Blue Gems",
    breed: "Ragdoll",
    availableCount: 0,
    location: "Riverside, WA",
  },
];

export default function FindBreederMainScreen() {
  const [searchName, setSearchName] = useState("");

  /* values used for DiscoverFilter start */
  const [visible, setVisible] = useState(false);

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
          data={mockBreeders}
          renderItem={({ item }) => <BreederCard breeder={item} />}
          ListFooterComponent={<View style={{ height: 250 }} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    alignItems: "center",
    padding: 28,
    paddingTop: 55,
    backgroundColor: "white",
  },
  cardView: {
    alignItems: "center",
    padding: 12,
  },
  toolBarView: {
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 24,
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
