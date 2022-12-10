import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { ALL_BREEDS } from "../listContents/allBreeds";
import { ALL_STATES } from "../listContents/allStates";
import { Colors } from "../styles/Colors";
import { OrangeText } from "../texts/OrangeText";
import { ResetButton } from "../pressable/ResetButton";
import { ApplyButton } from "../pressable/ApplyButton";
import { OrangeTitleText } from "../texts/OrangeTitleText";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

const FindBreederFilter = ({
  states: {
    selectedBreed,
    setSelectedBreed,
    selectedState,
    setSelectedState,
    selectedCatNum,
    setSelectedCatNum,

    resetAllFilters,
    refRBSheet,
  },
}) => {
  const [breedLocal, setBreedLocal] = useState(selectedBreed);
  const [stateLocal, setStateLocal] = useState(selectedState);
  const [catNumLocal, setCatNumLocal] = useState(selectedCatNum);

  const breed = [{ key: "All", value: "All" }, ...ALL_BREEDS];

  const state = [{ key: "All", value: "All" }, ...ALL_STATES];

  const catNum = [
    { key: "All", value: "All" },
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" },
  ];

  const resetHandler = () => {
    setSelectedBreed(selectedBreed);
    setSelectedState(selectedState);
    setSelectedCatNum(selectedCatNum);
    resetAllFilters();
  };

  const applyHandler = () => {
    setSelectedBreed(breedLocal);
    setSelectedState(stateLocal);
    setSelectedCatNum(catNumLocal);

    refRBSheet.current.close();
  };

  return (
    <ScrollView
      style={styles.filterContainer}
      showsVerticalScrollIndicator={false}
    >
      <OrangeTitleText>Filter</OrangeTitleText>

      <Text style={styles.reminderText}>
        Arrange Based On The Following Choices
      </Text>

      <OrangeText>Breed</OrangeText>
      <SelectList
        setSelected={(val) => setBreedLocal(val)}
        data={breed}
        save="value"
        defaultOption={{ key: selectedBreed, value: selectedBreed }}
      />

      <OrangeText>Location</OrangeText>
      <SelectList
        setSelected={(val) => setStateLocal(val)}
        data={state}
        save="value"
        defaultOption={{ key: selectedState, value: selectedState }}
      />

      <OrangeText>Has Avaliable Kitten</OrangeText>
      <SelectList
        setSelected={(val) => setCatNumLocal(val)}
        data={catNum}
        save="value"
        defaultOption={{ key: selectedCatNum, value: selectedCatNum }}
        search={false}
      />

      <View style={styles.submitButtonContainer}>
        <ResetButton onPress={resetHandler} />
        <ApplyButton onPress={applyHandler} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginHorizontal: 15,
  },
  button: {
    margin: 10,
    marginTop: 100,
    width: 100,
    alignSelf: "flex-end",
  },
  checkbox: {
    flexDirection: "row",
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
  reminderText: {
    fontFamily: FontFamily.light,
    fontSize: FontSizes.text,
    textAlign: "left",
    marginLeft: 5,
    color: Colors.gray,
  },
  submitButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 40,
    paddingBottom: 10,
  },
  submitButton: {
    padding: 8,
    borderRadius: 25,
    height: 40,
    width: 150,
  },
  submitText: {
    fontFamily: FontFamily.bold,
    alignItems: "center",
    textAlign: "center",
    color: Colors.white,
    fontSize: FontSizes.button,
  },
});

export default FindBreederFilter;
