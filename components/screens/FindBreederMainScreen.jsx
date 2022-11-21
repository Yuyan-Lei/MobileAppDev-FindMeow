import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { BreederCard } from "../cards/BreederCard";
import { SearchBar } from "../pressable/SearchBar";
import { TitleText } from "../texts/TitleText";
import FindBreederFilter from "./FindBreederFilter";
import { FilterButton } from "../pressable/FilterButton";
import { Colors } from "../styles/Colors";

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
        <FilterButton onPress={() => setVisible(true)} />
      </View>
      <View style={styles.listView}>
        <FlatList
          data={mockBreeders}
          renderItem={({ item }) => <BreederCard breeder={item} />}
          ListFooterComponent={<View style={{ height: 200 }} />}
        />
      </View>
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
        }}
      />
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
    paddingHorizontal: 28,
  },
  searchBarView: {
    backgroundColor: Colors.dimGray,
    marginRight: 12,
    borderRadius: 10,
  },
  listView: {
    padding: 12,
  },
});
