import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import { Ionicons } from "@expo/vector-icons";

export function HeartButton2({
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
          padding: 5,

          borderRadius: 20,
          marginTop: 33,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Ionicons
          name="heart-outline"
          style={[
            {
              color: isLiked ? selectedColor : notSelectedColor,
            },
            styles.heartText,
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heartText: {
    fontSize: 24,
  },
});