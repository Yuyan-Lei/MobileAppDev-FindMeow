import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
      <View style={{ padding: 8 }}>
        <Text
          style={[{
            color: isLiked ? selectedColor : notSelectedColor
          }, styles.heartText]}
        >
          ♡
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
})
