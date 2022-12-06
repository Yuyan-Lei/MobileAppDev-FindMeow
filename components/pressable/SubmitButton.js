import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../styles/Colors";

export function SubmitButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.orangeText : Colors.orange,
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
    fontSize: 16,
    color: Colors.white,
    fontWeight: "600",
    marginTop: 5,
    fontFamily: "PoppinsSemiBold",
  },
});
