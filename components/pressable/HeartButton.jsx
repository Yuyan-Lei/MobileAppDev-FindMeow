import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";

export function HeartButton({
  onPress,
  isLiked,
  selectedColor,
  notSelectedColor,
}) {
  if (selectedColor === undefined) {
    selectedColor = "orange";
  }

  if (notSelectedColor === undefined) {
    notSelectedColor = "white";
  }

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          padding: 5,
          backgroundColor: Colors.heartBackground,
          borderRadius: 20,
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        <AntDesign
          name="heart"
          style={[
            {
              color: isLiked ? selectedColor : notSelectedColor,
            },
            styles.heartText,
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heartText: {
    fontSize: 18,
  },
});
