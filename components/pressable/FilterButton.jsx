import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { Colors } from "../styles/Colors";

// reference: https://reactnativeelements.com/docs/components/buttongroup
export function FilterButton({ onPress, length, size }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: length,
          height: length,
          justifyContent: "center",
          backgroundColor: Colors.orange,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <AntDesign name="filter" size={size} color="white" />
      </View>
    </Pressable>
  );
}
