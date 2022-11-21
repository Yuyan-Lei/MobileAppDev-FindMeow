import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../styles/Colors";

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
    color: Colors.black,
    // textShadowOffset: { height: 4 },
    // textShadowRadius: 4,
    // textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
});
