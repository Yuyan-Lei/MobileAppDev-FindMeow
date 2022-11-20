import React from "react";
import { View, Alert, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";

export function PhoneButton({ onPress }) {
  const phoneHandler = () => {
    Alert.alert("Phone number", "123-456-7890", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };
  return (
    <View style={{ width: 60, height: 40, top: 4 }}>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: Colors.phoneButton,
          padding: 8,
          borderRadius: 100,
          height: 40,
          width: 40,
        }}
      >
        <MaterialIcons
          name="phone-in-talk"
          size={24}
          color="white"
          onPress={phoneHandler}
        />
      </Pressable>
    </View>
  );
}
