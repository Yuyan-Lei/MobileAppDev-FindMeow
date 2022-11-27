import { REACT_APP_GOOGLE_MAP_APP_KEY } from '@env';
import { Pressable } from "@react-native-material/core";
import React, { useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { writeImageToDB } from "../../firebaseUtils/firestore";
import { updateCattery } from "../../firebaseUtils/user";
import { FillAndroidButtomBar, FillAndroidTopBar } from "../FillAndroidBar";
import { TitleText } from "../texts/TitleText";
import CatImagePicker from "./CatImagePicker";

export default function UpdateCatteryPage({ route, navigation }) {
  const user = route.params.cattery;
  const [catteryName, setCatteryName] = useState(user.catteryName);
  const [image, setImage] = useState(user.picture);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [website, setWebsite] = useState(user.website);
  const [placeId, setPlaceId] = useState(user.placeId);
  const [address, setAddress] = useState(user.address);
  const ref = useRef();

  // Verify all the inputs in this page and return the error message if any errors.
  const verifyInput = () => {
    if (catteryName === '') {
      return "You didn't specify a cattery name, please fill that.";
    }
    if (phoneNumber === '') {
      return "You didn't specify a phone number, please fill that.";
    }
    if (website === '') {
      return "You didn't specify a website, please fill that.";
    }
    if (address === '') {
      return "You didn't specify the address of the cattery, please fill that.";
    }
    if (image === null || image === undefined) {
      return "You didn't specify the image of the cattery, please fill that.";
    }
    return '';
  };

  useEffect(() => {
    ref.current?.setAddressText(address || '');
  }, []);

  let onUpdateCatteryLocked = false;
  async function onUpdateCattery() {
    if (onUpdateCatteryLocked) return;
    const errorInInput = verifyInput();
    if (errorInInput !== '') {
      Alert.alert("Update failed", errorInInput);
      return;
    }
    onUpdateCatteryLocked = true;
    try {
      if (image === user.picture) {
        await updateCattery({ catteryName, picture: user.picture, phoneNumber, website, placeId, address })
        navigation.goBack();
      } else {
        const url = await writeImageToDB(image)
        await updateCattery({ catteryName, picture: url, phoneNumber, website, placeId, address })
        navigation.goBack();
      }
    } catch {
      Alert.alert("Update failed. Check network.");
    } finally {
      onUpdateCatteryLocked = false;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <FillAndroidTopBar />
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={{ margin: 12 }}>
          <TitleText>Update Cattery</TitleText>
          <CatImagePicker image={image} setImage={setImage}></CatImagePicker>
          <Text style={styles.subTitle}>Address</Text>
          <GooglePlacesAutocomplete
            placeholder="Search"
            ref={ref}
            query={{
              key: REACT_APP_GOOGLE_MAP_APP_KEY,
              language: 'en', // language of the results
            }}
            onPress={(data, details = null) => {
              setAddress(data.description);
              setPlaceId(data.place_id);
            }}
            onFail={(error) => console.error(error)}
          />
          <Text style={styles.subTitle}>Cattery Name</Text>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            value={catteryName}
            onChangeText={setCatteryName}></TextInput>
          <Text style={styles.subTitle}>Phone Number</Text>
          <TextInput
            placeholder="Phone Number"
            style={styles.textInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}></TextInput>
          <Text style={styles.subTitle}>Website</Text>
          <TextInput
            placeholder="www.xxx.com"
            style={styles.textInput}
            value={website}
            onChangeText={setWebsite}></TextInput>
          <Pressable
            onPress={onUpdateCattery}
            style={styles.SubmitButton}>
            <Text style={styles.SubmitButtonText}>Submit</Text>
          </Pressable>
        </View>
        <FillAndroidButtomBar />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 55,
    backgroundColor: "#FFFCF6",
  },
  title: {
    color: '#F59156',
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
  },
  subTitle: {
    color: '#F59156',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  textInput: {
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    padding: 10
  },
  SubmitButton: {
    backgroundColor: "#FFB801",
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    marginTop: '10%'
  },
  SubmitButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
