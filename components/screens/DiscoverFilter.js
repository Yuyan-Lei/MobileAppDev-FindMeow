import React, { useState } from "react";
import { Button, Overlay, Icon, CheckBox, Slider } from "@rneui/themed";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { OrangeTitleText } from "../texts/OrangeTitleText";
import { OrangeText } from "../texts/OrangeText";
import { Colors } from "../styles/Colors";

// type OverlayComponentProps = {};

// const DiscoverFilter: React.FunctionComponent<OverlayComponentProps> = () => {
const DiscoverFilter = ({
  states: {
    visible,
    setVisible,
    value,
    setValue,
    check1,
    setCheck1,
    check2,
    setCheck2,
    check3,
    setCheck3,
    check4,
    setCheck4,
    selectedBreed,
    setSelectedBreed,
    selectedAge,
    setSelectedAge,
    selectedState,
    setSelectedState,
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

  const age = [
    { key: "All", value: "All" },
    { key: ">1", value: ">1" },
    { key: "1~3", value: "1 ~ 3" },
    { key: "3~6", value: "3 ~ 6" },
    { key: "6~9", value: "6 ~ 9" },
    { key: "9~12", value: "9 ~ 12" },
    { key: "12+", value: "12+" },
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

  const resetHandler = () => {
    resetAllFilters();
  };

  const goBackHandler = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={goBackHandler}>
        <OrangeTitleText>Filter</OrangeTitleText>
        <Text
          style={{ textAlign: "left", color: Colors.gray, paddingRight: 150 }}
        >
          Arrange Based On The Following Types
        </Text>
        <OrangeText>From $0 to ${value}</OrangeText>

        <Slider
          value={value}
          onValueChange={setValue}
          maximumValue={100000}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: "transparent" }}
          thumbStyle={{ height: 1, width: 1, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="dollar"
                type="font-awesome"
                size={10}
                color={Colors.orangeText}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
              />
            ),
          }}
        />

        <OrangeText>Breed</OrangeText>
        <SelectList
          setSelected={(val) => setSelectedBreed(val)}
          data={breed}
          save="value"
          defaultOption={{ key: selectedBreed, value: selectedBreed }}
        />

        <OrangeText>Age (months)</OrangeText>
        <SelectList
          setSelected={(val) => setSelectedAge(val)}
          data={age}
          save="value"
          defaultOption={{ key: selectedAge, value: selectedAge }}
        />

        <OrangeText>State</OrangeText>
        <SelectList
          setSelected={(val) => setSelectedState(val)}
          data={state}
          save="value"
          defaultOption={{ key: selectedState, value: selectedState }}
        />

        <View style={{ flexDirection: "row" }}>
          <CheckBox
            center
            title="Female"
            checked={check1}
            onPress={() => setCheck1(!check1)}
          />
          <View style={{ marginLeft: 15 }}>
            <CheckBox
              center
              title="Male"
              checked={check2}
              onPress={() => setCheck2(!check2)}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            center
            title="Neutered"
            checked={check3}
            onPress={() => setCheck3(!check3)}
          />
          <CheckBox
            center
            title="Not Spayed"
            checked={check4}
            onPress={() => setCheck4(!check4)}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Pressable
            onPress={resetHandler}
            style={{
              backgroundColor: Colors.orangeText,
              padding: 8,
              borderRadius: 25,
              height: 40,
              width: 63,
            }}
          >
            <Text
              style={{ alignItems: "center", color: "white", fontSize: 18 }}
            >
              Reset
            </Text>
          </Pressable>

          <Pressable
            onPress={resetHandler}
            style={{
              backgroundColor: Colors.orangeText,
              padding: 8,
              borderRadius: 25,
              height: 40,
              width: 63,
            }}
          >
            <Text
              style={{ alignItems: "center", color: "white", fontSize: 18 }}
            >
              Apply
            </Text>
          </Pressable>
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
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default DiscoverFilter;
