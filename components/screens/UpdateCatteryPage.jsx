import { REACT_APP_GOOGLE_MAP_APP_KEY } from "@env";
import "core-js/features/array/at";
import React, { useEffect, useRef, useState } from "react";
import "core-js/features/array/at";
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
import CatBreedSelector from "../pressable/CatBreedSelector";
import CatImagePicker from "../pressable/CatImagePicker";
import { SubmitButton } from "../pressable/SubmitButton";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export default function UpdateCatteryPage({ route, navigation }) {
  const user = route.params.cattery;
  const [catteryName, setCatteryName] = useState(user.catteryName);
  const [image, setImage] = useState(user.picture);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [website, setWebsite] = useState(user.website);
  const [placeId, setPlaceId] = useState(user.placeId);
  const [address, setAddress] = useState(user.address);
  const [shortAddress, setShortAddress] = useState(user.shortAddress);
  const [breed, setBreed] = useState(user.breed);
  const ref = useRef();

  // Verify all the inputs in this page and return the error message if any errors.
  const verifyInput = () => {
    if (catteryName === "") {
      return "You didn't specify a cattery name, please fill that.";
    }
    if (catteryName.length > 30) {
      return "Cattery name must be no more than 30 characters, please fix that.";
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
    if (breed === "") {
      return "You didn't specify the breed of the cattery, please fill that.";
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
          breed,
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
          breed,
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
        <View style={{ margin: 12, paddingBottom: 150 }}>
          {/* Screen Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Update Cattery</Text>
          </View>

          {/* Image Picker*/}
          <CatImagePicker image={image} setImage={setImage}></CatImagePicker>

          {/* Address */}
          <Text style={styles.subTitle}>Address</Text>
          <GooglePlacesAutocomplete
            styles={{
              textInput: styles.addressTextInput,
              description: styles.addressDescriptionText,
            }}
            placeholder="Search"
            ref={ref}
            query={{
              key: REACT_APP_GOOGLE_MAP_APP_KEY,
              language: "en", // language of the results
            }}
            onPress={(data, details = null) => {
              setShortAddress(
                data.terms.at(-3).value + ", " + data.terms.at(-2).value
              );
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

          {/* Breed */}
          <Text style={styles.subTitle}>Breed</Text>
          <CatBreedSelector
            hideAllOption
            selectedBreed={breed}
            setSelectedBreed={setBreed}
          />

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
          <SubmitButton onPress={onUpdateCattery} />
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
    backgroundColor: Colors.postCatContainer,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: FontFamily.bold,
    color: Colors.orangeText,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: FontSizes.pageTitle,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: FontFamily.bold,
    color: Colors.orangeText,
    marginTop: 10,
    marginBottom: 10,
    fontSize: FontSizes.text,
    fontWeight: "600",
  },
  textInput: {
    fontFamily: FontFamily.normal,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: Colors.white,
    fontSize: FontSizes.text,
    padding: 10,
  },
  addressTextInput: {
    borderRadius: 10,
    height: 50,
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.text,
  },
  addressDescriptionText: {
    fontFamily: FontFamily.normal,
    fontSize: FontSizes.text,
  },
});
