import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButtons } from "../pressable/FilterButtons";

const mockData = [
  { name: "aaa", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "bbb", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
];

export default function DiscoverMainScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 20, marginTop: 12 }}>
        Discover
      </Text>
      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <View>
        <FlatList
          data={mockData}
          renderItem={({ item, index }) => <CatCard cat={item} />}
          numColumns={2}
        />
      </View>
    </View>
  );
}
