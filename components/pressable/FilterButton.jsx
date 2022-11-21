import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { Colors } from "../styles/Colors";

// reference: https://reactnativeelements.com/docs/components/buttongroup
export function FilterButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          backgroundColor: Colors.orange,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <AntDesign name="filter" size={24} color="white" />
      </View>
    </Pressable>
  );
}
