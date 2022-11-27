import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";

export function HeartButton({
  onPress,
  isLiked,
  selectedColor,
  notSelectedColor,
}) {
  if (selectedColor === undefined) {
    selectedColor = "orange";
  }

  if (notSelectedColor === undefined) {
    notSelectedColor = "gray";
  }

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          padding: 8,
          backgroundColor: Colors.heartBackground,
          borderRadius: 20,
        }}
      >
        <Text
          style={[
            {
              color: isLiked ? selectedColor : notSelectedColor,
            },
            styles.heartText,
          ]}
        >
          <AntDesign name="heart" color="black" />
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heartText: {
    fontSize: 24,
    fontWeight: "600",
  },
});
