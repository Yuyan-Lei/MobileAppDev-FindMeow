import React from "react";
import { StyleSheet, Text } from "react-native";

export function TitleText({ children }) {
  return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 24,
    textAlign: "center",
    color: "#2E2525",
  },
});
