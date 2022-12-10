import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";

export function HeartButton_InfoPage({
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
          borderRadius: 13,
          width: 35,
          height: 35,
        },
      ]}
    >
      <View
        style={{
          backgroundColor: Colors.arrowBackground,
          borderRadius: 13,
          width: 35,
          height: 35,
          paddingTop: 8,
          alignItems: "center",
        }}
      >
        <AntDesign
          name="heart"
          color={isLiked ? selectedColor : notSelectedColor}
          size={18}
          iconStyle={{
            fontSize: FontSizes.button,
            marginLeft: 3,
          }}
        />
      </View>
    </Pressable>
  );
}