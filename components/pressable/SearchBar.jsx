import { AntDesign } from "@expo/vector-icons";
import { Input } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";

export function SearchBar({ text, setText }) {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Input
        value={text}
        onChangeText={(value) => setText(value)}
        leftIcon={<AntDesign name="search1" color="black" size={16} />}
        leftIconContainerStyle={{ paddingRight: 8 }}
        placeholder="Search"
        style={{ height: 60 }}
      />
    </View>
  );
}
