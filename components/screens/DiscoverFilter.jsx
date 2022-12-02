import { Button, Icon, Slider } from "@rneui/themed";
import React, { useState } from "react";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { ALL_BREEDS } from "../listContents/allBreeds";
import { ALL_STATES } from "../listContents/allStates";
import { Colors } from "../styles/Colors";
import { OrangeText } from "../texts/OrangeText";

const DiscoverFilter = ({
  states: {
    selectedBreed,
    setSelectedBreed,
    selectedAge,
    setSelectedAge,
    selectedState,
    setSelectedState,
    selectedGender,
    setSelectedGender,
    selectedPrice,
    setSelectedPrice,

    resetAllFilters,
    refRBSheet,
  },
}) => {
  const [breedLocal, setBreedLocal] = useState(selectedBreed);
  const [ageLocal, setAgeLocal] = useState(selectedAge);
  const [stateLocal, setStateLocal] = useState(selectedState);
  const [genderLocal, setGenderLocal] = useState(selectedGender);
  const [priceLocal, setPriceLocal] = useState(selectedPrice);

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

  const [vaccinated, setVaccinated] = useState(false);
  const [vetChecked, setVetChecked] = useState(false);
  const [dewormed, setDewormed] = useState(false);
  const [ready, setReady] = useState(false);
  const [neutered, setNeutered] = useState(false);

  const resetHandler = () => {
    setPriceLocal(selectedPrice);
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
    setPriceLocal(priceLocal);

    Alert.alert(
      "Feature for this button is coming soon~",
      "See you next time!",
      [{ text: "Sad" }, { text: "Wait for you" }]
    );
    refRBSheet.current.close();
  };

  const onPriceChange = values => setPriceLocal(values);

  return (
    <ScrollView style={styles.filterContainer}>
      <Text style={styles.filterText}>Filter</Text>

      <Text style={styles.reminderText}>
        Arrange Based On The Following Choices
      </Text>

      {/* Price slider */}
      <OrangeText>From ${priceLocal[0]} to ${priceLocal[1]}</OrangeText>

      <MultiSlider
        values={[priceLocal[0], priceLocal[1]]}
        onValuesChange={onPriceChange}
        min={0}
        max={10000}
        step={100}

        sliderLength={330}
        containerStyle={{
          marginLeft: 15,
          marginRight: 15,
        }}
        selectedStyle={{
          backgroundColor: Colors.orangeText,
        }}
        trackStyle={{ height: 3 }}

        snapped

        customMarker={() => {
          return <Icon
            name="dollar"
            type="font-awesome"
            size={10}
            color={Colors.orangeText}
            reverse
            // containerStyle={styles.sliderThumbContainerStyle}
          />
        }}
      />


      {/* Breed */}
      <OrangeText>Breed</OrangeText>
      <SelectList
        setSelected={(val) => setBreedLocal(val)}
        data={breed}
        save="value"
        defaultOption={{ key: selectedBreed, value: selectedBreed }}
      />


      {/* Age */}
      <OrangeText>Age</OrangeText>
      <SelectList
        setSelected={(val) => setAgeLocal(val)}
        data={age}
        save="value"
        defaultOption={{ key: selectedAge, value: selectedAge }}
        search={false}
      />


      {/* Gender */}
      <OrangeText>Gender</OrangeText>
      <SelectList
        setSelected={(val) => setGenderLocal(val)}
        data={gender}
        save="value"
        defaultOption={{ key: selectedGender, value: selectedGender }}
        search={false}
      />


      {/* Location */}
      <OrangeText>Location</OrangeText>
      <SelectList
        setSelected={(val) => setStateLocal(val)}
        data={state}
        save="value"
        defaultOption={{ key: selectedState, value: selectedState }}
      />


      {/* Chips */}
      <View>
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
                    color: "white",
                    fontSize: 14,
                    fontFamily: "PoppinsSemiBold",
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: 14,
                    fontFamily: "Poppins",
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
                    color: "white",
                    fontSize: 14,
                    fontFamily: "PoppinsSemiBold",
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: 14,
                    fontFamily: "Poppins",
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
                    color: "white",
                    fontSize: 14,
                    fontFamily: "PoppinsSemiBold",
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: 14,
                    fontFamily: "Poppins",
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
                    color: "white",
                    fontSize: 14,
                    fontFamily: "PoppinsSemiBold",
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: 14,
                    fontFamily: "Poppins",
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
                    color: "white",
                    fontSize: 14,
                    fontFamily: "PoppinsSemiBold",
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: 14,
                    fontFamily: "Poppins",
                  }
            }
            onPress={() => setNeutered(!neutered)}
          ></Button>
        </View>
      </View>


      {/* Submit buttons */}
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
    color: Colors.orangeText,
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
  ButtonContainer: {
    marginTop: 25,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  Button: {
    margin: 5,
    borderColor: Colors.orangeText,
  },
});

export default DiscoverFilter;
