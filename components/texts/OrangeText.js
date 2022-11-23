import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../styles/Colors";

export function OrangeText({ children }) {
  return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
    textAlign: "left",
    color: "#F59156",
    marginTop: 20,
    marginLeft: 5,
    marginBottom: 5,
  },
});
