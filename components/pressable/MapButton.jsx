import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";

export function MapButton({ onPress, length, size }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colors.orangeText : Colors.orange,
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
        <MaterialCommunityIcons name="map-search" size={size} color={Colors.white} />
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
