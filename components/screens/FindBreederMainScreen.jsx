import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { BreederCard } from "../cards/BreederCard";
import { SearchBar } from "../pressable/SearchBar";
import { TitleText } from "../texts/TitleText";

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
  return (
    <View style={{ margin: 16, marginTop: 28 }}>
      <View style={{ alignItems: "center", margin: 12 }}>
        <TitleText>Find Breeders</TitleText>
      </View>
      <SearchBar text={searchName} setText={setSearchName} />
      <FlatList
        data={mockBreeders}
        renderItem={({ item }) => <BreederCard breeder={item} />}
      />
    </View>
  );
}
