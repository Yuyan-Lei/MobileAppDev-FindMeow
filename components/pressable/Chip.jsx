import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, StyleSheet, View, Text } from "react-native";
import { Colors } from "../styles/Colors";

export function Chip(title, key) {
  return (
    <View style={styles.buttonView}>
      <Pressable
        style={{
          borderRadius: 30,
          backgroundColor: "#F59156",
          padding: 8,
        }}
      >
        <Text style={{ color: "white", marginHorizontal: 5, fontSize: 16 }}>
          title
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    padding: 8,
  },
});
