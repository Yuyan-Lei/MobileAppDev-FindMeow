import { updatePassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Divider } from "react-native-elements";
import { auth } from "../../firebaseUtils/firebase-setup";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import { SubmitButton } from "../pressable/SubmitButton";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export default function UpdatePasswordScreen({ navigation }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const verifyPassword = (password) => {
    // Valid password pattern:
    // 1. Contains both numbers and letters
    // 2. More than 6 characters
    const validPasswordPattern = /(?=.*[0-9]+)(?=.*[a-zA-Z]+).{6,}/g;
    return password.match(validPasswordPattern);
  };

  const onUpdatePassword = () => {
    if (confirmPassword !== newPassword) {
      Alert.alert(
        "Update failed",
        "Passwords did not match, please try again."
      );
      return;
    }
    if (!verifyPassword(newPassword)) {
      Alert.alert(
        "Update failed",
        "Please use 6 or more characters with a mix of numbers and letters."
      );
      setNewPassword("");
      setConfirmPassword("");
      return;
    }
    const user = auth.currentUser;

    updatePassword(user, newPassword)
      .then(() => {
        Alert.alert("Password updated!");
        navigation.goBack();
      })
      .catch((error) => {
        const errorCode = error.code;
        Alert.alert("Update password failed", errorCode);
      });
  };
  return (
    <View style={styles.container}>
      {/* Screen Title */}
      <TitleText>Set Password</TitleText>

      {/* Password Input boxes */}
      <View style={styles.inputsContainer}>
        <TextInput
          placeholder="Set New Password"
          value={newPassword}
          style={styles.textInput}
          secureTextEntry
          onChangeText={setNewPassword}
        />
        <Divider style={styles.divider} />
        <TextInput
          placeholder="Enter Password Again"
          value={confirmPassword}
          style={styles.textInput}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Helper Text */}
      <Text style={styles.reminderText}>
        Please use 6 or more characters with a mix of numbers and letters.
      </Text>

      <SubmitButton onPress={onUpdatePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 65,
    flex: 1,
    backgroundColor: Colors.catInfoMainBackground,
  },
  inputsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 15,
  },
  textInput: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.text,
    padding: 14,
  },
  divider: {
    marginHorizontal: 10,
  },
  reminderText: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.text,
    paddingLeft: 14,
    color: Colors.reminderText,
  },
  SubmitButton: {
    backgroundColor: Colors.orange,
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    marginTop: "10%",
  },
  SubmitButtonText: {
    textAlign: "center",
    fontSize: FontSizes.subSubTitle,
    color: Colors.white,
    fontWeight: "600",
    marginTop: 3,
    fontFamily: FontFamily.bold,
  },
});
