import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "../styles/Colors";

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
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? Colors.orangeText : Colors.phoneButton,
          },
          styles.buttonView,
        ]}
      >
        <MaterialIcons
          name="phone-in-talk"
          size={24}
          color={Colors.white}
          onPress={() => callNumber(cattery.phoneNumber)}
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
