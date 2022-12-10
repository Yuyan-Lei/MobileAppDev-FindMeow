import { Button, Icon } from "@rneui/themed";
import React, { useState } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { ALL_BREEDS } from "../listContents/allBreeds";
import { ALL_STATES } from "../listContents/allStates";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";
import { OrangeText } from "../texts/OrangeText";
import { OrangeTitleText } from "../texts/OrangeTitleText";
import { ResetButton } from "../pressable/ResetButton";
import { ApplyButton } from "../pressable/ApplyButton";

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

    tags: {
      setSelectedTags,
      vaccinated,
      setVaccinated,
      vetChecked,
      setVetChecked,
      dewormed,
      setDewormed,
      ready,
      setReady,
      neutered,
      setNeutered,
    },

    resetAllFilters,
    refRBSheet,
    flipFilterTrigger,
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

  const [vaccinatedLocal, setVaccinatedLocal] = useState(vaccinated);
  const [vetCheckedLocal, setVetCheckedLocal] = useState(vetChecked);
  const [dewormedLocal, setDewormedLocal] = useState(dewormed);
  const [readyLocal, setReadyLocal] = useState(ready);
  const [neuteredLocal, setNeuteredLocal] = useState(neutered);

  const resetHandler = () => {
    resetAllFilters();
    setPriceLocal(selectedPrice);
    setBreedLocal(selectedBreed);
    setAgeLocal(selectedAge);
    setStateLocal(selectedState);
    setGenderLocal(selectedGender);
    setVaccinatedLocal(false);
    setVetCheckedLocal(false);
    setDewormedLocal(false);
    setReadyLocal(false);
    setNeuteredLocal(false);
    flipFilterTrigger();
  };

  const applyHandler = () => {
    setSelectedAge(ageLocal);
    setSelectedBreed(breedLocal);
    setSelectedGender(genderLocal);
    setSelectedState(stateLocal);
    setSelectedPrice(priceLocal);

    setVaccinated(vaccinatedLocal);
    setVetChecked(vetCheckedLocal);
    setDewormed(dewormedLocal);
    setReady(readyLocal);
    setNeutered(neuteredLocal);

    const tags = [];
    if (vaccinatedLocal) {
      tags.push("Vaccinated");
    }
    if (vetCheckedLocal) {
      tags.push("Vet Checked");
    }
    if (dewormedLocal) {
      tags.push("Dewormed");
    }
    if (readyLocal) {
      tags.push("Ready to go home");
    }
    if (neuteredLocal) {
      tags.push("Neutered");
    }

    setSelectedTags(tags);

    flipFilterTrigger();
    refRBSheet.current.close();
  };

  const [multiSliderValue, setMultiSliderValue] = React.useState([1, 10000]);
  const multiSliderValuesChange = (values) => setMultiSliderValue(values);
  const onPriceChange = (values) => setPriceLocal(values);
  const { height, width } = useWindowDimensions();

  return (
    <ScrollView
      style={styles.filterContainer}
      showsVerticalScrollIndicator={false}
    >
      <OrangeTitleText>Filter</OrangeTitleText>

      <Text style={styles.reminderText}>
        Arrange Based On The Following Choices
      </Text>

      {/* Price slider */}
      <OrangeText>
        From ${priceLocal[0]} to ${priceLocal[1]}
      </OrangeText>

      <MultiSlider
        values={[priceLocal[0], priceLocal[1]]}
        onValuesChange={onPriceChange}
        min={0}
        max={10000}
        step={100}
        sliderLength={width * 0.848}
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
          return (
            <Icon
              name="dollar"
              type="font-awesome"
              size={FontSizes.smallIcon}
              color={Colors.orangeText}
              reverse
            />
          );
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
            type={vaccinatedLocal ? "solid" : "outline"}
            containerStyle={styles.Button}
            color={Colors.orangeText}
            buttonStyle={{ borderColor: Colors.orangeText, borderRadius: 30 }}
            titleStyle={
              vaccinatedLocal
                ? {
                    color: Colors.white,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.bold,
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.regular,
                  }
            }
            onPress={() => setVaccinatedLocal(!vaccinatedLocal)}
          ></Button>
          <Button
            title="Vet Checked"
            type={vetCheckedLocal ? "solid" : "outline"}
            containerStyle={styles.Button}
            color={Colors.orangeText}
            buttonStyle={{ borderColor: Colors.orangeText, borderRadius: 30 }}
            titleStyle={
              vetCheckedLocal
                ? {
                    color: Colors.white,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.bold,
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.regular,
                  }
            }
            onPress={() => setVetCheckedLocal(!vetCheckedLocal)}
          ></Button>
          <Button
            title="Dewormed"
            type={dewormedLocal ? "solid" : "outline"}
            containerStyle={styles.Button}
            color={Colors.orangeText}
            buttonStyle={{ borderColor: Colors.orangeText, borderRadius: 30 }}
            titleStyle={
              dewormedLocal
                ? {
                    color: Colors.white,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.bold,
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.regular,
                  }
            }
            onPress={() => setDewormedLocal(!dewormedLocal)}
          ></Button>
          <Button
            title="Ready to go home"
            type={readyLocal ? "solid" : "outline"}
            containerStyle={styles.Button}
            color={Colors.orangeText}
            buttonStyle={{ borderColor: Colors.orangeText, borderRadius: 30 }}
            titleStyle={
              readyLocal
                ? {
                    color: Colors.white,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.bold,
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.regular,
                  }
            }
            onPress={() => setReadyLocal(!readyLocal)}
          ></Button>
          <Button
            title="Neutered / Spayed"
            type={neuteredLocal ? "solid" : "outline"}
            containerStyle={styles.Button}
            color={Colors.orangeText}
            buttonStyle={{ borderColor: Colors.orangeText, borderRadius: 30 }}
            titleStyle={
              neuteredLocal
                ? {
                    color: Colors.white,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.bold,
                  }
                : {
                    color: Colors.orangeText,
                    fontSize: FontSizes.text,
                    fontFamily: FontFamily.regular,
                  }
            }
            onPress={() => setNeuteredLocal(!neuteredLocal)}
          ></Button>
        </View>
      </View>

      {/* Submit buttons */}
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
    paddingTop: 30,
    paddingBottom: 35,
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
