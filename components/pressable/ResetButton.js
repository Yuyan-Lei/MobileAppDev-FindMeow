import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../styles/Colors";

export function ResetButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.orange : Colors.orangeText,
        },
        styles.submitButton,
      ]}
    >
      <Text style={styles.submitText}>Reset</Text>
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
    fontFamily: "PoppinsSemiBold",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});
