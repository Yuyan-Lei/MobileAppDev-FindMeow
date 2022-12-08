import { FontAwesome5 } from '@expo/vector-icons';
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";

export function MapButton({ onPress, length, size }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={{left: 20, right: 40, bottom: 20, top: 30}}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.orangeOnPressed : Colors.orange,
        },
        styles.buttonView,
      ]}
    >
      <View
        style={[
          {
            width: length,
            height: length,
          },
          styles.buttonView,
        ]}
      >
        <FontAwesome5 name="map-marked-alt" size={size} color={Colors.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
  },
});
