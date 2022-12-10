import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export function SubmitButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.orangeOnPressed : Colors.orange,
        },
        styles.SubmitButton,
      ]}
    >
      <Text style={styles.SubmitButtonText}>Submit</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  SubmitButton: {
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    marginTop: "10%",
  },
  SubmitButtonText: {
    textAlign: "center",
    fontSize: FontSizes.subSubTitle,
    color: Colors.white,
    fontWeight: "600",
    marginTop: 5,
    fontFamily: FontFamily.bold,
  },
});
