import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";

// reference: https://reactnativeelements.com/docs/components/buttongroup
export function FilterButton({ onPress }) {
  return (
    <View style={{ width: 60, height: 40, top: 4 }}>
      <Pressable onPress={onPress}>
        <AntDesign name="filter" size={24} color="black" />
      </Pressable>
    </View>
  );
}
