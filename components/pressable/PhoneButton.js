import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
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
    <View style={{ width: 60, height: 40, top: 4, marginBottom: 10 }}>
      <Pressable onPress={onPress} style={styles.buttonView}>
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

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: Colors.phoneButton,
    padding: 8,
    borderRadius: 100,
    height: 40,
    width: 40,
  },
});
