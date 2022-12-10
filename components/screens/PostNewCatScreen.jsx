import CalendarPicker from "react-native-calendar-picker";
import { Button } from "@rneui/themed";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { createCat, deleteCat, updateCat } from "../../firebaseUtils/cat";
import { db } from "../../firebaseUtils/firebase-setup";
import {
  getCurrentUserEmail,
  writeImageToDB,
} from "../../firebaseUtils/firestore";
import CatBreedSelector from "../pressable/CatBreedSelector";
import CatGenderSelector from "../pressable/CatGenderSelector";
import CatImagePicker from "../pressable/CatImagePicker";
import moment from "moment";
import { deleteCatInCattery } from "../../firebaseUtils/user";
import { Colors } from "../styles/Colors";
import { globalVariables } from "../../utils/globalVariables";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export default function PostNewCatScreen({
  route: { params },
  navigation: { navigate, goBack },
}) {
  const [catName, setCatName] = useState(params.cat ? params.cat.Name : "");
  const [image, setImage] = useState(params.cat ? params.cat.Picture : null);
  const [breed, setBreed] = useState(params.cat ? params.cat.Breed : "");
  const [gender, setGender] = useState(params.cat ? params.cat.Gender : "");
  const [birthDate, setBirthDate] = useState(
    params.cat ? new Date(params.cat.Birthday) : null
  );
  const [price, setPrice] = useState(params.cat ? params.cat.Price + "" : "");
  const [description, setDescription] = useState(
    params.cat ? params.cat.Description : ""
  );
  const [vaccinated, setVaccinated] = useState(
    params.cat ? params.cat.Tags.includes("Vaccinated") : false
  );
  const [vetChecked, setVetChecked] = useState(
    params.cat ? params.cat.Tags.includes("Vet Checked") : false
  );
  const [dewormed, setDewormed] = useState(
    params.cat ? params.cat.Tags.includes("Dewormed") : false
  );
  const [ready, setReady] = useState(
    params.cat ? params.cat.Tags.includes("Ready to go home") : false
  );
  const [neutered, setNeutered] = useState(
    params.cat ? params.cat.Tags.includes("Neutered") : false
  );
  const [catId, setCatId] = useState(params.cat ? params.cat.id : "");
  const [cat, setCat] = useState(params.cat);

  const [userPhone, setUserPhone] = useState("");

  const [show, setShow] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  // Reset the screen
  const reset = () => {
    setCatName("");
    setImage(null);
    setBreed("");
    setGender("");
    setBirthDate(null);
    setPrice("");
    setDescription("");
    setVaccinated(false);
    setVetChecked(false);
    setDewormed(false);
    setReady(false);
    setNeutered(false);
    setCatId("");
    setCat(undefined);
  };

  // Verify all the inputs in this page and return the error message if any errors.
  const verifyInput = () => {
    if (catName === "") {
      return "You didn't specify a cat name, please fill that.";
    }
    if (image === null) {
      return "You didn't set the image, please take a photo or upload a local image.";
    }
    if (breed === "") {
      return "You didn't specify the breed of the cat, please fill that.";
    }
    if (birthDate === null) {
      return "You didn't specify the birth date of the cat, please fill that.";
    }
    const priceInt = parseInt(price, 10);
    if (isNaN(priceInt) || priceInt <= 0) {
      return "You didn't specify the price or set an invalid price, please fill or fix that.";
    }
    if (gender === "") {
      return "You didn't specify the gender of the cat, please fill that.";
    }
    return "";
  };

  const convertDateToStr = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const onDateChange = (selectedDate) => {
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

  /* Builds a new cat using all inputs in this page. */
  const buildCatItem = () => {
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

    return {
      Name: catName,
      Breed: breed,
      Birthday: convertDateToStr(birthDate),
      Gender: gender,
      Price: parseInt(price, 10),
      Description: description,
      Tags: tags,
      Cattery: getCurrentUserEmail(),
      Contact: userPhone,
      UploadTime: new Date().getTime(),
    };
  };

  let onPostNewCatLocked = false;
  async function onUpdateCat() {
    /* Fix double clicking */
    if (onPostNewCatLocked) return;
    const errorInInput = verifyInput();
    if (errorInInput !== "") {
      Alert.alert("Update cat failed", errorInInput);
      return;
    }
    onPostNewCatLocked = true;

    const CatItem = buildCatItem();

    try {
      let url = cat.Picture;
      if (image !== cat.Picture) {
        url = await writeImageToDB(image);
      }
      setSubmitting(true);
      await updateCat(catId, {
        ...CatItem,
        Picture: url,
      });
      Alert.alert("Updated!");
      reset();
      goBack();
    } catch {
      Alert.alert("Update failed.");
    } finally {
      onPostNewCatLocked = false;
      setSubmitting(false);
    }
  }

  async function onPostNewCat() {
    /* Fix double clicking */
    if (onPostNewCatLocked) return;
    const errorInInput = verifyInput();
    if (errorInInput !== "") {
      Alert.alert("Post new cat failed", errorInInput);
      return;
    }
    onPostNewCatLocked = true;
    setSubmitting(true);

    const CatItem = buildCatItem();
    try {
      const url = await writeImageToDB(image);
      await createCat({
        ...CatItem,
        Picture: url,
      });
      Alert.alert("Posted a cat!");
      reset();
      navigate("Cats");
    } catch {
      Alert.alert("Posting cats failed.");
    } finally {
      onPostNewCatLocked = false;
      setSubmitting(false);
    }
  }

  async function onDeleteCat() {
    /* Fix double clicking */
    if (onPostNewCatLocked) return;

    Alert.alert("Are you sure you want to delete this cat?", "", [
      { text: "Cancel" },
      {
        text: "OK",
        onPress: async () => {
          try {
            await deleteCat(catId);

            onPostNewCatLocked = true;

            await deleteCatInCattery(catId);
            globalVariables.starListNeedReload = true;

            Alert.alert("Deleted!");
            reset();
            navigate("MainScreen");
          } catch {
            Alert.alert("Posting cats failed.");
          } finally {
            onPostNewCatLocked = false;
          }
        },
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Screen Title */}
        <View style={styles.titleContainer}>
          {catId === "" ? (
            <Text style={styles.title}>Upload Cat</Text>
          ) : (
            <Text style={styles.title}>Update Cat</Text>
          )}
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
        <Pressable
          onPress={() => setShow(!show)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? Colors.catInfoMainBackground
                : Colors.white,
            },
            styles.dateButtonView,
          ]}
        >
          <Text style={styles.dateButtonText}>
            {birthDate === null ? "Select date" : convertDateToStr(birthDate)}
          </Text>
        </Pressable>
        {show && (
          <View style={styles.calendarContainer}>
            <CalendarPicker
              maxDate={new Date()}
              scaleFactor={420}
              textStyle={styles.calendarTextStyle}
              todayBackgroundColor={Colors.white}
              headerWrapperStyle={styles.calendarHeader}
              onDateChange={onDateChange}
            />
          </View>
        )}

        {/* Gender */}
        <Text style={styles.subTitle}>Gender</Text>
        <CatGenderSelector
          hideAllOption
          selectedGender={gender}
          setSelectedGender={setGender}
        />

        {/* Price */}
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
                ? {
                    color: Colors.white,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.bold,
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.normal,
                  }
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
                ? {
                    color: Colors.white,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.bold,
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.normal,
                  }
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
                ? {
                    color: Colors.white,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.bold,
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.normal,
                  }
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
                ? {
                    color: Colors.white,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.bold,
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.normal,
                  }
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
                ? {
                    color: Colors.white,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.bold,
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.normal,
                  }
            }
            onPress={() => setNeutered(!neutered)}
          ></Button>
        </View>

        {/* Submit Button */}
        <Pressable
          onPress={catId === "" ? onPostNewCat : onUpdateCat}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.orangeOnPressed : Colors.orange,
            },
            submitting ? styles.submittingButton : styles.submitButton,
          ]}
          disabled={submitting}
        >
          <Text style={styles.submitButtonText}>
            {submitting ? "Submitting" : "Submit"}
          </Text>
        </Pressable>

        {/* Delete Button */}
        {catId !== "" && (
          <Pressable
            onPress={onDeleteCat}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors.deleteButtonOnPress
                  : Colors.deleteButton,
              },
              styles.deleteButton,
            ]}
          >
            <Text style={styles.submitButtonText}>Delete</Text>
          </Pressable>
        )}

        {/* Empty Footer */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  dateButtonText: {
    fontFamily: FontFamily.normal,
    textAlign: "center",
    fontSize: FontSizes.text,
    height: 30,
    paddingTop: 5,
    color: Colors.black,
  },
  dateButtonView: {
    borderRadius: 10,
    alignItems: "flex-start",
    padding: 10,
    width: "100%",
  },
  calendarHeader: {
    paddingHorizontal: 40,
  },
  calendarContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  calendarSelectedDay: {
    backgroundColor: Colors.orange,
    color: Colors.white,
  },
  calendarTextStyle: {
    fontFamily: FontFamily.normal,
    color: Colors.black,
  },
  container: {
    paddingHorizontal: 30,
    backgroundColor: Colors.postCatContainer,
  },
  titleContainer: {
    marginTop: "20%",
    alignItems: "center",
    marginBottom: 20,
  },
  submitButton: {
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    marginTop: "10%",
  },
  submittingButton: {
    backgroundColor: Colors.submittingButton,
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    marginTop: "10%",
  },
  deleteButton: {
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    marginTop: "5%",
  },
  submitButtonText: {
    fontFamily: FontFamily.bold,
    textAlign: "center",
    fontSize: FontSizes.subSubTitle,
    color: Colors.white,
    fontWeight: "600",
    paddingTop: 3,
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
  priceInput: {
    fontFamily: FontFamily.normal,
    flexDirection: "row",
    backgroundColor: Colors.white,
    height: 50,
    borderRadius: 10,
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
