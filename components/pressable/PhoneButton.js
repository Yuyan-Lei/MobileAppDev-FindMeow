import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
  Linking,
  Platform,
} from "react-native";
import { Colors } from "../styles/Colors";
import call from "react-native-phone-call";

export function PhoneButton({ onPress, cattery }) {
  const args = {
    number: "123-456-7890",
    prompt: false,
    skipCanOpen: true,
  };

  const callNumber = (phone) => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={{ width: 60, height: 40, top: 4, marginBottom: 10 }}>
      <Pressable onPress={onPress} style={styles.buttonView}>
        <MaterialIcons
          name="phone-in-talk"
          size={24}
          color="white"
          // onPress={() => call(args).catch(console.error)}
          onPress={() => callNumber(cattery.phoneNumber)}
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
