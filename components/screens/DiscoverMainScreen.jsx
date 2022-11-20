import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import { rootStackNavigate } from "../RootNavigation";
import DiscoverFilter from "./DiscoverFilter";

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

  /* values used for DiscoverFilter start */
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  /* values used for DiscoverFilter end */

  function resetAllFilters() {
    setValue(0);

    setCheck1(false);
    setCheck2(false);
    setCheck3(false);
    setCheck4(false);

    setSelectedBreed("");
    setSelectedAge("");
  }

  return (
    <View style={{ marginHorizontal: 16, marginTop: 55, marginBottom: 200 }}>
      <View style={{ margin: 12 }}>
        <View>
          <TitleText>Discover</TitleText>
        </View>
        <View style={{ position: "absolute", right: 0 }}>
          <FilterButton onPress={() => setVisible(true)} />
        </View>
      </View>

      <DiscoverFilter
        states={{
          visible,
          setVisible,
          value,
          setValue,
          check1,
          setCheck1,
          check2,
          setCheck2,
          check3,
          setCheck3,
          check4,
          setCheck4,
          selectedBreed,
          setSelectedBreed,
          selectedAge,
          setSelectedAge,
          resetAllFilters,
        }}
      />

      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        buttons={["Latest Post", "Nearby", "Lowest Price"]}
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
