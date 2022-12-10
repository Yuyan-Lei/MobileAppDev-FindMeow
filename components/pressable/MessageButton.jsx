import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "../styles/Colors";

export function MessageButton({ onPress, cattery }) {
  const messageNumber = (phone) => {
    let phoneNumber = phone;
    const url =
      Platform.OS === "android"
        ? `sms:${phoneNumber}?body=your message`
        : `sms:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Unsupported url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View style={{ width: 60, height: 40, top: 4 }}>
      <Pressable
        onPress={() => messageNumber(cattery.phoneNumber)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? Colors.orangeText : Colors.messageButton,
          },
          styles.buttonView,
        ]}
      >
        <MaterialIcons
          name="textsms"
          size={24}
          color={Colors.white}
          style={{}}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    padding: 8,
    borderRadius: 100,
    height: 40,
    width: 40,
  },
});
