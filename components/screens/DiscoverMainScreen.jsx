import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";

const cats = [
  { name: "aaa", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "bbb", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
  { name: "ccc", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "ddd", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
  { name: "eee", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "fff", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
  { name: "ggg", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "hhh", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
  { name: "iii", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "ooo", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
];

export default function DiscoverMainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={{ margin: 16, marginTop: 28, marginBottom: 200 }}>
      <View style={{ flexDirection: "row", margin: 12 }}>
        <View style={{ flex: 7 }}>
          <TitleText>Discover</TitleText>
        </View>

        <FilterButton />
      </View>

      {/* <TitleText>Discover</TitleText> */}

      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
      <View style={{ padding: 12 }}>
        <FlatList
          data={cats}
          renderItem={({ item, index }) => <CatCard cat={item} />}
          numColumns={2}
          ListFooterComponent={<View style={{ height: 60 }} />}
        />
      </View>
    </View>
  );
}
