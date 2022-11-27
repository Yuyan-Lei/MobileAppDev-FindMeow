import { Icon, Slider } from "@rneui/themed";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Colors } from "../styles/Colors";
import { OrangeText } from "../texts/OrangeText";
import { ALL_BREEDS } from "../listContents/allBreeds";
import { ALL_STATES } from "../listContents/allStates";

const DiscoverFilter = ({
  states: {
    value,
    setValue,

    selectedBreed,
    setSelectedBreed,
    selectedAge,
    setSelectedAge,
    selectedState,
    setSelectedState,
    selectedGender,
    setSelectedGender,

    resetAllFilters,
    refRBSheet,
  },
}) => {
  const [breedLocal, setBreedLocal] = useState(selectedBreed);
  const [ageLocal, setAgeLocal] = useState(selectedAge);
  const [stateLocal, setStateLocal] = useState(selectedState);
  const [genderLocal, setGenderLocal] = useState(selectedGender);

  const breed = [{ key: "All", value: "All" }, ...ALL_BREEDS];

  const age = [
    { key: "All", value: "All" },
    { key: "< 1 month", value: "< 1 month" },
    { key: "1 - 3 months", value: "1 - 3 months" },
    { key: "3 - 6 months", value: "3 - 6 months" },
    { key: "6 - 12 months", value: "6 - 12 months" },
    { key: "> 1 year", value: "> 1 year" },
  ];

  const state = [{ key: "All", value: "All" }, ...ALL_STATES];

  const gender = [
    { key: "All", value: "All" },
    { key: "Female", value: "Female" },
    { key: "Male", value: "Male" },
  ];

  const resetHandler = () => {
    setBreedLocal(selectedBreed);
    setAgeLocal(selectedAge);
    setStateLocal(selectedState);
    setGenderLocal(selectedGender);
    resetAllFilters();
  };

  const applyHandler = () => {
    setBreedLocal(breedLocal);
    setAgeLocal(ageLocal);
    setStateLocal(stateLocal);
    setGenderLocal(genderLocal);

    Alert.alert(
      "Feature for this button is coming soon~",
      "See you next time!",
      [{ text: "Sad" }, { text: "Wait for you" }]
    );
    refRBSheet.current.close();
  };

  return (
    <ScrollView style={styles.filterContainer}>
      <Text style={styles.filterText}>Filter</Text>

      <Text style={styles.reminderText}>
        Arrange Based On The Following Choices
      </Text>
      <OrangeText>From $0 to ${value}</OrangeText>

      <Slider
        value={value}
        onValueChange={setValue}
        maximumValue={10000}
        minimumValue={0}
        step={100}
        minimumTrackTintColor={Colors.orangeText}
        allowTouchTrack
        style={styles.sliderStyle}
        trackStyle={styles.sliderTrackStyle}
        thumbStyle={styles.sliderThumbStyle}
        thumbProps={{
          children: (
            <Icon
              name="dollar"
              type="font-awesome"
              size={10}
              color={Colors.orangeText}
              reverse
              containerStyle={styles.sliderThumbContainerStyle}
            />
          ),
        }}
      />

      <OrangeText>Breed</OrangeText>
      <SelectList
        setSelected={(val) => setBreedLocal(val)}
        data={breed}
        save="value"
        defaultOption={{ key: selectedBreed, value: selectedBreed }}
      />

      <OrangeText>Age</OrangeText>
      <SelectList
        setSelected={(val) => setAgeLocal(val)}
        data={age}
        save="value"
        defaultOption={{ key: selectedAge, value: selectedAge }}
        search={false}
      />

      <OrangeText>Gender</OrangeText>
      <SelectList
        setSelected={(val) => setGenderLocal(val)}
        data={gender}
        save="value"
        defaultOption={{ key: selectedGender, value: selectedGender }}
        search={false}
      />

      <OrangeText>Location</OrangeText>
      <SelectList
        setSelected={(val) => setStateLocal(val)}
        data={state}
        save="value"
        defaultOption={{ key: selectedState, value: selectedState }}
      />

      <View style={styles.submitButtonContainer}>
        <Pressable onPress={resetHandler} style={styles.submitButton}>
          <Text style={styles.submitText}>Reset</Text>
        </Pressable>

        <Pressable onPress={applyHandler} style={styles.submitButton}>
          <Text style={styles.submitText}>Apply</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sliderThumbContainerStyle: {
    bottom: 20,
    right: 20,
  },
  sliderThumbStyle: {
    height: 1,
    width: 1,
  },
  sliderTrackStyle: {
    height: 5,
    color: Colors.orange,
  },
  sliderStyle: {
    marginLeft: 15,
    marginRight: 15,
  },
  filterContainer: {
    marginHorizontal: 15,
  },
  filterText: {
    fontFamily: "PoppinsBold",
    fontSize: 26,
    textAlign: "left",
    color: "#F59156",
    marginTop: 20,
    marginLeft: 5,
    marginBottom: 5,
  },
  button: {
    margin: 10,
    marginTop: 100,
    width: 100,
    alignSelf: "flex-end",
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "left",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
  reminderText: {
    fontFamily: "PoppinsLight",
    fontSize: 14,
    textAlign: "left",
    marginLeft: 5,
    color: "#ADADAD",
  },
  submitButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 40,
    paddingBottom: 10,
  },
  submitButton: {
    backgroundColor: Colors.orangeText,
    padding: 8,
    borderRadius: 25,
    height: 40,
    width: 150,
  },
  submitText: {
    fontFamily: "PoppinsSemiBold",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});

export default DiscoverFilter;
