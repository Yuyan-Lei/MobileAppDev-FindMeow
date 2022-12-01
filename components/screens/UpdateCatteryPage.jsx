import { REACT_APP_GOOGLE_MAP_APP_KEY } from "@env";
import { Pressable } from "@react-native-material/core";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { writeImageToDB } from "../../firebaseUtils/firestore";
import { updateCattery } from "../../firebaseUtils/user";
import { FillAndroidButtomBar, FillAndroidTopBar } from "../FillAndroidBar";
import CatImagePicker from "../pressable/CatImagePicker";

export default function UpdateCatteryPage({ route, navigation }) {
  const user = route.params.cattery;
  const [catteryName, setCatteryName] = useState(user.catteryName);
  const [image, setImage] = useState(user.picture);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [website, setWebsite] = useState(user.website);
  const [placeId, setPlaceId] = useState(user.placeId);
  const [address, setAddress] = useState(user.address);
  const [shortAddress, setShortAddress] = useState(user.shortAddress);
  const ref = useRef();

  // Verify all the inputs in this page and return the error message if any errors.
  const verifyInput = () => {
    if (catteryName === "") {
      return "You didn't specify a cattery name, please fill that.";
    }
    if (catteryName.length > 20) {
      return "Cattery name must be no more than 20 characters, please fix that.";
    }
    const validPhoneNumberPattern = /[0-9]+/g;
    if (
      !phoneNumber.match(validPhoneNumberPattern) ||
      phoneNumber.length !== 10
    ) {
      return "You didn't specify the phone number or set an invalid phone number, please fill or fix that.";
    }
    if (website === "") {
      return "You didn't specify a website, please fill that.";
    }
    if (address === "") {
      return "You didn't specify the address of the cattery, please fill that.";
    }
    if (image === null || image === undefined) {
      return "You didn't specify the image of the cattery, please fill that.";
    }
    return "";
  };

  useEffect(() => {
    ref.current?.setAddressText(address || "");
  }, []);

  let onUpdateCatteryLocked = false;
  async function onUpdateCattery() {
    if (onUpdateCatteryLocked) return;
    const errorInInput = verifyInput();
    if (errorInInput !== "") {
      Alert.alert("Update failed", errorInInput);
      return;
    }
    onUpdateCatteryLocked = true;
    try {
      if (image === user.picture) {
        await updateCattery({
          catteryName,
          picture: user.picture,
          phoneNumber,
          website,
          placeId,
          address,
          shortAddress,
        });
        navigation.goBack();
      } else {
        const url = await writeImageToDB(image);
        await updateCattery({
          catteryName,
          picture: url,
          phoneNumber,
          website,
          placeId,
          address,
          shortAddress,
        });
        navigation.goBack();
      }
    } catch {
      Alert.alert("Update failed. Check network.");
    } finally {
      onUpdateCatteryLocked = false;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <FillAndroidTopBar />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ margin: 12 }}>
          {/* Screen Title */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={styles.title}>Update Cattery</Text>
          </View>

          {/* Image Picker*/}
          <CatImagePicker image={image} setImage={setImage}></CatImagePicker>

          {/* Address */}
          <Text style={styles.subTitle}>Address</Text>
          <GooglePlacesAutocomplete
            styles={{ textInput: { fontFamily: "Poppins" } }}
            placeholder="Search"
            ref={ref}
            query={{
              key: REACT_APP_GOOGLE_MAP_APP_KEY,
              language: "en", // language of the results
            }}
            onPress={(data, details = null) => {
              setShortAddress(data.terms.at(-3).value + ", "+ data.terms.at(-2).value);
              setAddress(data.description);
              setPlaceId(data.place_id);
            }}
            onFail={(error) => console.error(error)}
          />

          {/* Cattery Name */}
          <Text style={styles.subTitle}>Cattery Name</Text>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            value={catteryName}
            onChangeText={setCatteryName}
          ></TextInput>

          {/* Phone Number */}
          <Text style={styles.subTitle}>Phone Number</Text>
          <TextInput
            placeholder="Phone Number"
            style={styles.textInput}
            value={phoneNumber}
            keyboardType="phone-pad"
            onChangeText={setPhoneNumber}
          ></TextInput>

          {/* Website */}
          <Text style={styles.subTitle}>Website</Text>
          <TextInput
            placeholder="www.xxx.com"
            style={styles.textInput}
            value={website}
            onChangeText={setWebsite}
          ></TextInput>

          {/* Submit Button */}
          <Pressable onPress={onUpdateCattery} style={styles.SubmitButton}>
            <Text style={styles.SubmitButtonText}>Submit</Text>
          </Pressable>
        </View>
        <FillAndroidButtomBar />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 55,
    backgroundColor: "#FFFCF6",
  },
  title: {
    fontFamily: "PoppinsSemiBold",
    color: "#F59156",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: "PoppinsSemiBold",
    color: "#F59156",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  textInput: {
    fontFamily: "Poppins",
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    padding: 10,
  },
  SubmitButton: {
    backgroundColor: "#FFB801",
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    marginTop: "10%",
  },
  SubmitButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginTop: 5,
    fontFamily: "PoppinsSemiBold",
  },
});
