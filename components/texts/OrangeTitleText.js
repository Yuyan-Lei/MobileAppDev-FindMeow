import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../styles/Colors";

export function OrangeTitleText({ children }) {
  return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "left",
    color: Colors.orangeText,
  },
});
