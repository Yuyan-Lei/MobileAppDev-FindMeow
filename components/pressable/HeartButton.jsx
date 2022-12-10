import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";

export function HeartButton({
  onPress,
  isLiked,
  selectedColor,
  notSelectedColor,
}) {
  if (selectedColor === undefined) {
    selectedColor = Colors.orange;
  }

  if (notSelectedColor === undefined) {
    notSelectedColor = Colors.white;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          borderRadius: 20,
          marginTop: 10,
          marginLeft: 6,
        },
      ]}
    >
      <View
        style={{
          padding: 5,
          backgroundColor: Colors.heartBackground,
          borderRadius: 20,
          alignItems: "center",
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
    fontSize: FontSizes.button,
    marginTop: 1,
  },
});
