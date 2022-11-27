import { Chip } from "@rneui/themed";
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
import CatBreedSelector from "./CatBreedSelector";
import CatImagePicker from "./CatImagePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { Button } from "react-native";
import { Keyboard } from "react-native";
import moment from "moment";
import { Colors } from "../styles/Colors";

export default function PostNewCatScreen({ route, navigation: { navigate } }) {
  const [catName, setCatName] = useState("");
  const [image, setImage] = useState(null);
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [vetChecked, setVetChecked] = useState(false);
  const [dewormed, setDewormed] = useState(false);
  const [ready, setReady] = useState(false);
  const [neutered, setNeutered] = useState(false);

  const [userPhone, setUserPhone] = useState("");

  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log(selectedDate);
    setShow(false);
    setBirthDate(selectedDate);
    console.log(moment(birthDate).format("YYYY-MM-DD"));
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
        Birthday: moment(birthDate).format("YYYY-MM-DD"),
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
        <View
          style={{
            flexDirection: "row",
            marginTop: "25%",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={styles.title}>Upload Cat</Text>
        </View>
        <CatImagePicker image={image} setImage={setImage}></CatImagePicker>
        <Text style={styles.subTitle}>Cat Name</Text>
        <TextInput
          placeholder="Name"
          style={styles.textInput}
          value={catName}
          onChangeText={setCatName}
        ></TextInput>
        <Text style={styles.subTitle}>Breed</Text>
        <CatBreedSelector
          hideAllOption
          selectedBreed={breed}
          setSelectedBreed={setBreed}
        />
        <Text style={styles.subTitle}>Birthdate</Text>

        {/* Date picker */}
        {Platform.OS === "ios" ? (
          <View style={{ flexDirection: "row" }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={birthDate}
              mode="date"
              onChange={onChange}
            />
          </View>
        ) : (
          <View>
            <Button title="Pick a date" onPress={() => setShow(true)} />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={birthDate}
                mode="date"
                onChange={onChange}
              />
            )}
          </View>
        )}
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
          search={false}
        />
        <Text style={styles.subTitle}>Price</Text>
        <View style={styles.priceInput}>
          <TextInput
            placeholder="100"
            value={price}
            keyboardType="number-pad"
            style={{ width: "95%" }}
            onChangeText={setPrice}
          />
          <Text>$</Text>
        </View>
        <Text style={styles.subTitle}>Description</Text>
        <TextInput
          placeholder="Describe the kitten"
          style={styles.textInput}
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.subTitle}>Labels</Text>
        <View style={styles.chipContainer}>
          <Chip
            title="Vaccinated"
            type={vaccinated ? "solid" : "outline"}
            containerStyle={styles.chip}
            color="#F59156"
            onPress={() => setVaccinated(!vaccinated)}
          ></Chip>
          <Chip
            title="Vet Checked"
            type={vetChecked ? "solid" : "outline"}
            containerStyle={styles.chip}
            color="#F59156"
            onPress={() => setVetChecked(!vetChecked)}
          ></Chip>
          <Chip
            title="Dewormed"
            type={dewormed ? "solid" : "outline"}
            containerStyle={styles.chip}
            color="#F59156"
            onPress={() => setDewormed(!dewormed)}
          ></Chip>
          <Chip
            title="Ready to go home"
            type={ready ? "solid" : "outline"}
            containerStyle={styles.chip}
            color="#F59156"
            onPress={() => setReady(!ready)}
          ></Chip>
          <Chip
            title="Neutered / Spayed"
            type={neutered ? "solid" : "outline"}
            containerStyle={styles.chip}
            color="#F59156"
            onPress={() => setNeutered(!neutered)}
          ></Chip>
        </View>

        <Pressable onPress={onPostNewCat} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>

        <View style={{ height: 20 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  title: {
    color: "#F59156",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
  },
  subTitle: {
    color: "#F59156",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  textInput: {
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    padding: 10,
  },
  priceInput: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    margin: 5,
  },
});
