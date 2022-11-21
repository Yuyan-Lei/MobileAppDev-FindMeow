import React from "react";
import { View, Alert, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";

export function MessageButton({ onPress }) {
  const messageHandler = () => {
    Alert.alert("Phone number", "123-456-7890", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK button Pressed") },
    ]);
  };
  return (
    <View style={{ width: 60, height: 40, top: 4 }}>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: Colors.messageButton,
          padding: 8,
          borderRadius: 100,
          height: 40,
          width: 40,
        }}
      >
        <MaterialIcons
          name="textsms"
          size={24}
          color="white"
          onPress={messageHandler}
          style={{}}
        />
      </Pressable>
    </View>
  );
}
