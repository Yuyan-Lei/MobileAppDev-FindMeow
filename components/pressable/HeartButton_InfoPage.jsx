import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";

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
    <Pressable onPress={onPress}>
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
            fontSize: 18,
            marginLeft: 3,
          }}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  heartText: {
    fontSize: 18,
    marginTop: 1,
  },
});
