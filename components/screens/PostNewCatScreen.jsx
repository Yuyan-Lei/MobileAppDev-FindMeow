import { Button } from "@rneui/themed";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { SelectList } from "react-native-dropdown-select-list";
import { createCat } from "../../firebaseUtils/cat";
import { db } from "../../firebaseUtils/firebase-setup";
import {
  getCurrentUserEmail,
  writeImageToDB,
} from "../../firebaseUtils/firestore";
import CatBreedSelector from "../pressable/CatBreedSelector";
import CatImagePicker from "../pressable/CatImagePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
// import { Button } from "react-native";
import { Keyboard } from "react-native";
import moment from "moment";
import { Colors } from "../styles/Colors";
import { colors } from "react-native-elements";

export default function PostNewCatScreen({ route, navigation: { navigate } }) {
  const [catName, setCatName] = useState("");
  const [image, setImage] = useState(null);
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [vetChecked, setVetChecked] = useState(false);
  const [dewormed, setDewormed] = useState(false);
  const [ready, setReady] = useState(false);
  const [neutered, setNeutered] = useState(false);

  const [userPhone, setUserPhone] = useState("");

  const [show, setShow] = useState(false);

  // Verify all the inputs in this page and return the error message if any errors.
  const verifyInput = () => {
    if (catName === '') {
      return "You didn't specify a cat name, please fill that.";
    }
    if (image === null) {
      return "You didn't set the image, please take a photo or upload a local image.";
    }
    if (breed === '') {
      return "You didn't specify the breed of the cat, please fill that.";
    }
    if (birthDate === null) {
      return "You didn't specify the birth date of the cat, please fill that.";
    }
    if (isNaN(price) || price <= 0) {
      return "You didn't specify the price or set an invalid price, please fill or fix that."
    }
    if (gender === '') {
      return "You didn't specify the gender of the cat, please fill that.";
    }
    return '';
  };

  const convertDateToStr = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
    setShow(false);
    setBirthDate(selectedDate);
  };

  useEffect(() => {
    const docRef = doc(db, "Users", getCurrentUserEmail());
    const unSubscribe = onSnapshot(docRef, (snapshot) => {
      setUserPhone(snapshot.data().phoneNumber);
    });

    if (Platform.OS === "android") {
      setShow(false);
    }

    return () => unSubscribe();
  }, []);

  let onPostNewCatLocked = false;
  async function onPostNewCat() {
    /* Fix double clicking */
    if (onPostNewCatLocked) return;
    const errorInInput = verifyInput();
    if (errorInInput !== '') {
      Alert.alert("Post new cat failed", errorInInput);
      return;
    }
    onPostNewCatLocked = true;

    const tags = [];
    if (vaccinated) {
      tags.push("Vaccinated");
    }
    if (vetChecked) {
      tags.push("Vet Checked");
    }
    if (dewormed) {
      tags.push("Dewormed");
    }
    if (ready) {
      tags.push("Ready to go home");
    }
    if (neutered) {
      tags.push("Neutered");
    }
    try {
      const url = await writeImageToDB(image);
      await createCat({
        Name: catName,
        Breed: breed,
        Birthday: convertDateToStr(birthDate),
        Picture: url,
        Gender: gender,
        Price: price,
        Description: description,
        Tags: tags,
        Cattery: getCurrentUserEmail(),
        Contact: userPhone,
        UploadTime: new Date().getTime(),
      });
      Alert.alert("Posted a cat!");
      navigate("Cats");
    } catch {
      Alert.alert("Posting cats failed.");
    } finally {
      onPostNewCatLocked = false;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>

        {/* Screen Title */}
        <View
          style={{
            flexDirection: "row",
            marginTop: "20%",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={styles.title}>Upload Cat</Text>
        </View>

        {/* Image picker */}
        <CatImagePicker image={image} setImage={setImage}></CatImagePicker>

        {/* Cat Name */}
        <Text style={styles.subTitle}>Cat Name</Text>
        <TextInput
          placeholder="Name"
          style={styles.textInput}
          value={catName}
          onChangeText={setCatName}
        ></TextInput>

        {/* Breed */}
        <Text style={styles.subTitle}>Breed</Text>
        <CatBreedSelector
          hideAllOption
          selectedBreed={breed}
          setSelectedBreed={setBreed}
        />

        {/* Birthday */}
        <Text style={styles.subTitle}>Birthday</Text>

        {/* Date picker */}
        {Platform.OS === "ios" ? (
          <View style={{ flexDirection: "row" }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={birthDate || new Date()}
              mode="date"
              onChange={onChange}
            />
          </View>
        ) : (
          <View>
            <Pressable
              onPress={() => setShow(true)}
              style={styles.dateButtonView}
            >
              <Text style={styles.dateButtonText}>
                {birthDate === null
                  ? "Pick a date"
                  : convertDateToStr(birthDate)}
              </Text>
            </Pressable>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={birthDate === null ? new Date() : birthDate}
                mode="date"
                onChange={onChange}
              />
            )}
          </View>
        )}

        {/* Gender */}
        <Text style={styles.subTitle}>Gender</Text>
        <SelectList
          setSelected={setGender}
          data={[
            { key: "Female", value: "Female" },
            { key: "Male", value: "Male" },
          ]}
          save="value"
          defaultOption={{ key: gender, value: gender }}
          placeholder="Select Gender"
          boxStyles={{
            backgroundColor: "white",
            borderWidth: 0,
          }}
          fontFamily= "Poppins"
          search={false}
        />

        {/* Price */}
        <Text style={styles.subTitle}>Price</Text>
        <View style={styles.priceInput}>
          <TextInput
            placeholder="100"
            value={price}
            keyboardType="number-pad"
            style={{ width: "95%" }}
            onChangeText={price => setPrice(parseInt(price, 10))}
          />
          <Text>$</Text>
        </View>

        {/* Descriptions */}
        <Text style={styles.subTitle}>Description</Text>
        <TextInput
          placeholder="Describe the kitten"
          style={styles.textInput}
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />

        {/* Chips */}
        <Text style={styles.subTitle}>Labels</Text>
        <View style={styles.ButtonContainer}>
          <Button
            title="Vaccinated"
            type={vaccinated ? "solid" : "outline"}
            containerStyle={styles.Button}
            color={Colors.orangeText}
            buttonStyle={{ borderColor: Colors.orangeText, borderRadius: 30 }}
            titleStyle={
              vaccinated
                ? { color: "white", fontSize: 14 }
                : { color: Colors.orangeText, fontSize: 14 }
            }
            onPress={() => setVaccinated(!vaccinated)}
          ></Button>
          <Button
            title="Vet Checked"
            type={vetChecked ? "solid" : "outline"}
            containerStyle={styles.Button}
            color={Colors.orangeText}
            buttonStyle={{ borderColor: Colors.orangeText, borderRadius: 30 }}
            titleStyle={
              vetChecked
                ? { color: "white", fontSize: 14 }
                : { color: Colors.orangeText, fontSize: 14 }
            }
            onPress={() => setVetChecked(!vetChecked)}
          ></Button>
          <Button
            title="Dewormed"
            type={dewormed ? "solid" : "outline"}
            containerStyle={styles.Button}
            color={Colors.orangeText}
            buttonStyle={{ borderColor: Colors.orangeText, borderRadius: 30 }}
            titleStyle={
              dewormed
                ? { color: "white", fontSize: 14 }
                : { color: Colors.orangeText, fontSize: 14 }
            }
            onPress={() => setDewormed(!dewormed)}
          ></Button>
          <Button
            title="Ready to go home"
            type={ready ? "solid" : "outline"}
            containerStyle={styles.Button}
            color={Colors.orangeText}
            buttonStyle={{ borderColor: Colors.orangeText, borderRadius: 30 }}
            titleStyle={
              ready
                ? { color: "white", fontSize: 14 }
                : { color: Colors.orangeText, fontSize: 14 }
            }
            onPress={() => setReady(!ready)}
          ></Button>
          <Button
            title="Neutered / Spayed"
            type={neutered ? "solid" : "outline"}
            containerStyle={styles.Button}
            color={Colors.orangeText}
            buttonStyle={{ borderColor: Colors.orangeText, borderRadius: 30 }}
            titleStyle={
              neutered
                ? { color: "white", fontSize: 14, fontFamily: "PoppinsSemiBold"}
                : { color: Colors.orangeText, fontSize: 14, fontFamily: "Poppins"}
            }
            onPress={() => setNeutered(!neutered)}
          ></Button>
        </View>

        {/* Submit Button */}
        <Pressable onPress={onPostNewCat} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>

        {/* Empty Footer */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  dateButtonText: {
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  dateButtonView: {
    backgroundColor: "#FFB801",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    padding: 6,
    width: 120,
  },
  container: {
    paddingHorizontal: 30,
    backgroundColor: "#FFFCF6",
  },
  submitButton: {
    backgroundColor: "#FFB801",
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    marginTop: "10%",
  },
  submitButtonText: {
    fontFamily: "PoppinsSemiBold",
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    paddingTop: 3,
  },
  title: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.orangeText,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
  },
  subTitle: {
    fontFamily: "PoppinsSemiBold",
    color: Colors.orangeText,
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
  priceInput: {
    fontFamily: "Poppins",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  ButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  Button: {
    margin: 5,
    borderColor: Colors.orangeText,
  },
});
