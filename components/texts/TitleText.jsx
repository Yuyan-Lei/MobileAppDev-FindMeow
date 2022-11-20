import React from "react";
import { StyleSheet, Text } from "react-native";

export function TitleText({ children }) {
  return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
    color: "#2E2525",
    // textShadowOffset: { height: 4 },
    // textShadowRadius: 4,
    // textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
});
