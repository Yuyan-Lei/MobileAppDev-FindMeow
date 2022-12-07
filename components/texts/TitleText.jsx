import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../styles/Colors";

export function TitleText({ children }) {
  return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 24,
    textAlign: "center",
    color: Colors.black,
  },
});
