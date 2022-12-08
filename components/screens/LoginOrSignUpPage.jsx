import { REACT_APP_GOOGLE_MAP_APP_KEY } from "@env";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Pressable, TextInput } from "@react-native-material/core";
import { CommonActions } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import "core-js/features/array/at";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { auth } from "../../firebaseUtils/firebase-setup";
import {
  createCattery,
  createUser,
  getUserData,
} from "../../firebaseUtils/user";
import { SelectList } from "react-native-dropdown-select-list";
import { ALL_BREEDS } from "../listContents/allBreeds";

import {
  BUYER_USERNAME,
  BUYER_PASSWORD,
  CATTERY_USERNAME,
  CATTERY_PASSWORD,
} from "@env";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export default function LoginOrSignUpPage({ route, navigation }) {
  const [pageState, setPageState] = useState(0);
  const [isCattery, setIsCattery] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [address, setAddress] = useState("");
  const [breed, setBreed] = useState("");
  const [shortAddress, setShortAddress] = useState("");

  const ref = useRef();

  // Verify all the inputs in this page and return the error message if any errors.
  const verifyInput = () => {
    // Don't verify anything if the user is not a cattery.
    if (!isCattery) {
      return "";
    }
    if (name === "") {
      return "You didn't specify the cattery name, please fill that.";
    }
    if (name.length > 20) {
      return "Cattery name must be no more than 20 characters, please fix that.";
    }
    const validPhoneNumberPattern = /[0-9]+/g;
    if (
      !phoneNumber.match(validPhoneNumberPattern) ||
      phoneNumber.length !== 10
    ) {
      return "You didn't specify the phone number or set an invalid phone number, please fill or fix that.";
    }
    if (breed === "") {
      return "You didn't specify the breed, please fill that.'";
    }
    if (website === "") {
      return "You didn't specify the website of the cattery, please fill that.";
    }
    if (address === "") {
      return "You didn't specify the address, please fill that.";
    }
    return "";
  };

  useEffect(() => {
    ref.current?.setAddressText(address || "");
  }, []);

  useEffect(() => {
    setUserName("");
    setPassword("");
    setConfirmPassword("");
  }, [pageState]);

  const verifyPassword = (password) => {
    // Valid password pattern:
    // 1. Contains both digit and word character
    // 2. More than 6 characters
    const validPasswordPattern = /(?=.*[0-9]+)(?=.*[a-zA-Z]+).{6,}/g;
    return password.match(validPasswordPattern);
  };

  function navigateToHomeSafely() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }],
      })
    );
  }

  const onCreateAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert(
        "SignUp Failed",
        "Those passwords don't match. Please try again."
      );
      setPassword("");
      setConfirmPassword("");
      return;
    }
    if (!verifyPassword(password)) {
      Alert.alert(
        "SignUp Failed",
        "Please use 6 or more characters with a mix of numbers and letters."
      );
      setPassword("");
      setConfirmPassword("");
      return;
    }
    if (isCattery && verifyInput() !== "") {
      Alert.alert("SignUp Failed", verifyInput());
      return;
    }
    createUserWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        return user.email;
      })
      .then((email) => {
        if (!isCattery) {
          return createUser(email);
        } else {
          return createCattery(email, {
            catteryName: name,
            breed,
            phoneNumber,
            website,
            placeId,
            address,
            shortAddress,
          });
        }
      })
      .then(() => navigateToHomeSafely())
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/email-already-in-use":
            Alert.alert(
              "SignUp Failed",
              "The email is already registered, please use another email."
            );
            setUserName("");
            setPassword("");
            setConfirmPassword("");
            break;
          case "auth/invalid-email":
            Alert.alert(
              "SignUp Failed",
              "The email is invalid, please correct your email address."
            );
            setUserName("");
            setPassword("");
            setConfirmPassword("");
            break;
          case "auth/weak-password":
            Alert.alert(
              "SignUp Failed",
              "The password is too weak, please update your password."
            );
            setPassword("");
            setConfirmPassword("");
            break;
          default:
            Alert.alert(
              "SignUp Failed",
              "Error happened while signing up, please try again later."
            );
        }
      });
  };

  const onSignIn = () => {
    signInWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        getUserData().then((user) => navigateToHomeSafely());
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = "";
        switch (errorCode) {
          case "auth/invalid-email":
            errorMessage =
              "The email is invalid, please correct your email address.";
            setUserName("");
            setPassword("");
            setConfirmPassword("");
            break;
          case "auth/user-disabled":
            errorMessage =
              "The user corresponding to the given email has been disabled.";
            setUserName("");
            setPassword("");
            setConfirmPassword("");
            break;
          case "auth/user-not-found":
            errorMessage = "No user was found using the email.";
            setUserName("");
            setPassword("");
            setConfirmPassword("");
            break;
          case "auth/wrong-password":
            errorMessage = "Wrong password. Please try again.";
            setPassword("");
            setConfirmPassword("");
            break;
          default:
            errorMessage =
              "Error happened while logging in, please try again later.";
        }
        Alert.alert("Login Failed", errorMessage);
      });
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>
        Find Your Favorite Cat to Join Your Family
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.majorContent}
      >
        <View style={{ flexDirection: "row" }}>
          <Pressable
            style={styles.headPressable}
            onPress={() => setPageState(0)}
          >
            <Text
              style={
                pageState === 0
                  ? styles.selectedButton
                  : styles.notSelectedButton
              }
            >
              Log In
            </Text>
          </Pressable>
          <Pressable
            style={styles.headPressable}
            onPress={() => setPageState(1)}
          >
            <Text
              style={
                pageState === 1
                  ? styles.selectedButton
                  : styles.notSelectedButton
              }
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TextInput
            inputStyle={{ fontFamily: FontFamily.regular }}
            label="EMAIL"
            value={userName}
            leading={(props) => (
              <MaterialCommunityIcons name="email" {...props} />
            )}
            color={Colors.orangeText}
            onChangeText={setUserName}
          />
          <TextInput
            inputStyle={{ fontFamily: FontFamily.regular }}
            label="PASSWORD"
            secureTextEntry={true}
            leading={(props) => <Entypo name="lock" {...props} />}
            value={password}
            color={Colors.orangeText}
            onChangeText={setPassword}
          />
          {pageState === 0 ? (
            <View>
              <Pressable
                onPress={() => onSignIn()}
                style={styles.loginAndSignUpButton}
              >
                <Text style={styles.loginAndSignUpButtonText}>Log In</Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <TextInput
                inputStyle={{ fontFamily: FontFamily.regular }}
                label={
                  confirmPassword !== "" && confirmPassword !== password
                    ? "PASSWORDS NOT MATCH"
                    : "CONFIRM PASSWORD"
                }
                secureTextEntry={true}
                leading={(props) => <Entypo name="lock" {...props} />}
                value={confirmPassword}
                color={
                  confirmPassword !== "" && confirmPassword !== password
                    ? Colors.deleteButton
                    : Colors.orangeText
                }
                onChangeText={setConfirmPassword}
              />
              <CheckBox
                title="I'm a cattery owner"
                checked={isCattery}
                onPress={() => setIsCattery(!isCattery)}
                textStyle={{
                  color: Colors.orangeText,
                  fontSize: FontSizes.text,
                  fontFamily: FontFamily.bold,
                }}
                checkedColor={Colors.orangeText}
                containerStyle={{ backgroundColor: "transparent" }}
              />
              {isCattery && (
                <View>
                  <TextInput
                    label="Cattery Name"
                    value={name}
                    color={Colors.orangeText}
                    leading={(props) => (
                      <MaterialIcons name="storefront" {...props} />
                    )}
                    onChangeText={setName}
                    inputStyle={{ fontFamily: FontFamily.regular }}
                  />
                  <TextInput
                    label="Cattery Phone"
                    value={phoneNumber}
                    color={Colors.orangeText}
                    keyboardType="phone-pad"
                    leading={(props) => <Feather name="phone" {...props} />}
                    onChangeText={setPhoneNumber}
                    inputStyle={{ fontFamily: FontFamily.regular }}
                  />
                  <TextInput
                    label="Cattery Website"
                    value={website}
                    color={Colors.orangeText}
                    leading={(props) => (
                      <MaterialCommunityIcons name="web" {...props} />
                    )}
                    onChangeText={setWebsite}
                    inputStyle={{ fontFamily: FontFamily.regular }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                      width: "100%",
                      borderBottomWidth: 1,
                      borderBottomColor: Colors.signUpDivider,
                      paddingTop: 6,
                      paddingBottom: 4,
                      backgroundColor: Colors.signUpBackground,
                      paddingLeft: 12,
                    }}
                  >
                    <FontAwesome5
                      name="cat"
                      size={FontSizes.catIcon}
                      color={Colors.signUpIcon}
                    />
                    <View style={{ flex: 1 }}>
                      <SelectList
                        setSelected={setBreed}
                        data={ALL_BREEDS}
                        save="value"
                        placeholder="Select Breed"
                        boxStyles={{
                          borderWidth: 0,
                          paddingLeft: 13,
                        }}
                        inputStyles={{
                          fontSize: FontSizes.subSubTitle,
                          color: Colors.selectListInput,
                          fontFamily: FontFamily.regular,
                        }}
                        defaultOption={{ key: breed, value: breed }}
                      />
                    </View>
                  </View>
                  {/* <Text style={styles.subTitle}>Address</Text> */}
                  <GooglePlacesAutocomplete
                    ref={ref}
                    query={{
                      key: REACT_APP_GOOGLE_MAP_APP_KEY,
                      language: "en", // language of the results
                    }}
                    onPress={(data, details = null) => {
                      setAddress(data.description);
                      setPlaceId(data.place_id);
                      setShortAddress(
                        data.terms.at(-3).value + ", " + data.terms.at(-2).value
                      );
                    }}
                    textInputProps={{
                      InputComp: TextInput,
                      label: "Cattery Address",
                      color: Colors.orangeText,

                      leading: (
                        <Feather
                          name="map-pin"
                          size={24}
                          color={Colors.signUpIcon}
                        />
                      ),
                    }}
                    styles={{
                      textInput: {
                        height: 52,
                        width: "100%",
                        color: Colors.black,
                        backgroundColor: Colors.signUpBackground,
                        fontSize: FontSizes.subSubTitle,
                        paddingHorizontal: 0,
                      },
                      container: {
                        color: Colors.black,
                      },
                    }}
                    onFail={(error) => console.error(error)}
                  />
                </View>
              )}
              <Pressable
                onPress={() => onCreateAccount()}
                style={styles.loginAndSignUpButton}
              >
                <Text style={styles.loginAndSignUpButtonText}>
                  Create Account
                </Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
        <View style={{ height: 30 }}></View>
      </KeyboardAvoidingView>

      {/* remove when publishing */}
      <View style={{ position: "absolute", flexDirection: "row" }}>
        <Pressable
          onPress={() => {
            setUserName(BUYER_USERNAME);
            setPassword(BUYER_PASSWORD);
          }}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Login as buyer</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setUserName(CATTERY_USERNAME);
            setPassword(CATTERY_PASSWORD);
          }}
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>Login as cattery</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.orange,
    flex: 1,
  },
  majorContent: {
    backgroundColor: Colors.dimGray,
    flex: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 20,
  },
  title: {
    fontFamily: FontFamily.heavy,
    fontSize: FontSizes.logInTitle,
    marginTop: 70,
    marginBottom: 35,
    textAlign: "center",
    padding: 20,
    fontWeight: "700",
  },
  headPressable: {
    marginHorizontal: 5,
    marginTop: 10,
    marginBottom: 30,
  },
  selectedButton: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.subTitle,
    color: Colors.signUpSelectedButton,
    fontWeight: "600",
  },
  notSelectedButton: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.text,
    color: Colors.signUpNoteSelecteButton,
  },
  loginAndSignUpButton: {
    backgroundColor: Colors.orange,
    borderRadius: 18,
    height: 72,
    alignItems: "center",
    padding: 22,
    marginTop: "10%",
  },
  loginAndSignUpButtonText: {
    fontFamily: FontFamily.bold,
    textAlign: "center",
    fontSize: FontSizes.subTitle,
    color: Colors.white,
    fontWeight: "600",
  },
  textInput: {
    fontFamily: FontFamily.normal,
    color: Colors.orangeText,
  },
  submitButton: {
    backgroundColor: Colors.orange,
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    marginTop: "10%",
  },
  submitButtonText: {
    fontFamily: FontFamily.bold,
    textAlign: "center",
    fontSize: FontSizes.subSubTitle,
    color: Colors.white,
    fontWeight: "600",
    paddingTop: 3,
  },
});
