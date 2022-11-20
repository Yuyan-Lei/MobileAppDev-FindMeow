import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../styles/colors";

export function OrangeText({ children }) {
  return <Text style={styles.titleText}>{children}</Text>;
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "left",
    color: Colors.orangeText,
    marginTop: 20,
    marginLeft: 5,
    marginBottom: 5,
  },
});
