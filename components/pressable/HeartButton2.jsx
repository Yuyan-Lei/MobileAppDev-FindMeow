import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";

export function HeartButton2({
  onPress,
  isLiked,
  selectedColor,
  notSelectedColor,
}) {
  if (selectedColor === undefined) {
    selectedColor = Colors.orangeText;
  }

  if (notSelectedColor === undefined) {
    notSelectedColor = Colors.gray;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          borderRadius: 20,
        },
        styles.buttonView,
      ]}
    >
      <View
        style={{
          padding: 5,
          borderRadius: 20,
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
    fontSize: FontSizes.pageTitle,
  },
});
