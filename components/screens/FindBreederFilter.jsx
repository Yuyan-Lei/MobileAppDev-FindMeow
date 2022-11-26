import React from "react";
import {
  Alert, Pressable, ScrollView, StyleSheet, Text, View
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Colors } from "../styles/Colors";
import { OrangeText } from "../texts/OrangeText";

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
  const breed = [
    { key: "All", value: "All" },
    { key: "Siamese", value: "Siamese" },
    { key: "Maine-Coon", value: "Maine-Coon" },
    { key: "British-Shorthair", value: "British-Shorthair" },
    { key: "Persian", value: "Persian" },
    { key: "Ragdoll", value: "Ragdoll" },
    { key: "Sphynx", value: "Sphynx" },
    { key: "Birman", value: "Birman" },
    { key: "American-Shorthair", value: "American-Shorthair" },
  ];

  const state = [
    { key: "All", value: "All" },
    { key: "Alabama", value: "Alabama" },
    { key: "Alaska", value: "Alaska" },
    { key: "Arizona", value: "Arizona" },
    { key: "Arkansas", value: "Arkansas" },
    { key: "California", value: "California" },
    { key: "Colorado", value: "Colorado" },
    { key: "Connecticut", value: "Connecticut" },
    { key: "Delaware", value: "Delaware" },
    { key: "Florida", value: "Florida" },
    { key: "Georgia", value: "Georgia" },
  ];

  const catNum = [
    { key: "All", value: "All" },
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" },
  ];

  const resetHandler = () => {
    resetAllFilters();
  };

  const applyHandler = () => {
    setSelectedBreed(selectedBreed);
    setSelectedCatNum(selectedCatNum);
    setSelectedState(selectedState);

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

      <OrangeText>Breed</OrangeText>
      <SelectList
        setSelected={(val) => setSelectedBreed(val)}
        data={breed}
        save="value"
        defaultOption={{ key: selectedBreed, value: selectedBreed }}
      />

      <OrangeText>Location</OrangeText>
      <SelectList
        setSelected={(val) => setSelectedState(val)}
        data={state}
        save="value"
        defaultOption={{ key: selectedState, value: selectedState }}
      />

      <OrangeText>Has Avaliable Kitten</OrangeText>
      <SelectList
        setSelected={(val) => setSelectedCatNum(val)}
        data={catNum}
        save="value"
        defaultOption={{ key: selectedCatNum, value: selectedCatNum }}
        search={false}
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
  checkbox: {
    flexDirection: "row",
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
  reminderText: {
    fontFamily: "PoppinsLight",
    fontSize: 14,
    textAlign: "left",
    color: Colors.gray,
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

export default FindBreederFilter;
