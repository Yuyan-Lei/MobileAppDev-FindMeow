import React, { useState } from "react";
import { Button, Overlay, Icon, CheckBox, Slider } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { OrangeTitleText } from "../texts/OrangeTitleText";
import { OrangeText } from "../texts/OrangeText";
import { Colors } from "../styles/colors";

// type OverlayComponentProps = {};

// const DiscoverFilter: React.FunctionComponent<OverlayComponentProps> = () => {
const FindBreederFilter = ({
  states: {
    visible,
    setVisible,
    selectedBreed,
    setSelectedBreed,
    selectedState,
    setSelectedState,
    selectedCatNum,
    setSelectedCatNum,
    resetAllFilters,
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
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
    { key: "4+", value: "4+" },
  ];

  const resetHandler = () => {
    resetAllFilters();
  };

  const goBackHandler = () => {
    setVisible(!visible);
  };

  return (
    <View>
      {/* <Button
        title="Filter button"
        onPress={resetHandler}
        buttonStyle={styles.button}
      /> */}
      <Overlay isVisible={visible} onBackdropPress={goBackHandler}>
        <OrangeTitleText>Filter</OrangeTitleText>
        <Text
          style={{ textAlign: "left", color: Colors.gray, paddingRight: 150 }}
        >
          Arrange Based On The Following Types
        </Text>

        <OrangeText>Breed</OrangeText>

        <SelectList
          setSelected={(val) => setSelectedBreed(val)}
          data={breed}
          save="value"
          defaultOption={{ key: selectedBreed, value: selectedBreed }}
        />

        <OrangeText>State</OrangeText>
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
        />

        <View style={styles.buttonView}>
          <Button title="Reset" onPress={resetHandler} />
          <Button title="Apply" onPress={goBackHandler} />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 50,
  },
  checkbox: {
    flexDirection: "row",
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default FindBreederFilter;
