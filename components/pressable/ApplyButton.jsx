import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export function ApplyButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.orangeTextOnPressed : Colors.orangeText,
        },
        styles.submitButton,
      ]}
    >
      <Text style={styles.submitText}>Apply</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    padding: 8,
    borderRadius: 25,
    height: 40,
    width: 150,
  },
  submitText: {
    fontFamily: FontFamily.bold,
    alignItems: "center",
    textAlign: "center",
    color: Colors.white,
    fontSize: FontSizes.button,
  },
});
