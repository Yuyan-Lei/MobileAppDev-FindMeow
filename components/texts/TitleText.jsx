import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export function TitleText({ children }) {
  return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.pageTitle,
    textAlign: "center",
    color: Colors.black,
  },
});
