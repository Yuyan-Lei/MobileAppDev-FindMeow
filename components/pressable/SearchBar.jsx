import { Input } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";

export function SearchBar({ text, setText }) {
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <Input
        value={text}
        onChangeText={(value) => setText(value)}
        leftIcon={<Text>🔍 | </Text>}
        placeholder="Search"
      />
    </View>
  );
}
