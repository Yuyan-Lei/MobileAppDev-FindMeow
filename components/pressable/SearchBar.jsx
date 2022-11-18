import { Input } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";
import { FilterButton } from "../pressable/FilterButton";

export function SearchBar({ text, setText }) {
  return (
    <View style={{ flexDirection: "row", marginHorizontal: 24 }}>
      <View style={{ width: "90%" }}>
        <Input
          value={text}
          onChangeText={(value) => setText(value)}
          leftIcon={<Text>🔍 | </Text>}
          placeholder="Search"
        />
      </View>
      <View style={{ width: "10%" }}>
        <FilterButton />
      </View>
    </View>
  );
}
