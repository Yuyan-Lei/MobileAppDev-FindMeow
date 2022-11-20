import React from "react";
import { Pressable, Text, View } from "react-native";

export function HeartButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View style={{ padding: 8 }}>
        <Text style={{ color: "orange", fontSize: 24 }}>♡</Text>
      </View>
    </Pressable>
  );
}
