import React, { useState } from "react";
import { Button, Overlay, Icon, CheckBox, Slider } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

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
        <Text style={styles.textPrimary}>Filter</Text>
        <Text style={styles.textSecondary}>From $0 to $200000000</Text>

        <Slider
          value={value}
          onValueChange={setValue}
          maximumValue={10000}
          minimumValue={0}
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="dollar"
                type="font-awesome"
                size={10}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
              />
            ),
          }}
        />

        <Text style={styles.text}>Breed</Text>
        <SelectList
          setSelected={(val) => setSelectedBreed(val)}
          data={breed}
          save="value"
          defaultOption={{ key: selectedBreed, value: selectedBreed }}
        />

        <Text style={styles.text}>Age</Text>
        <SelectList
          setSelected={(val) => setSelectedAge(val)}
          data={age}
          save="value"
          defaultOption={{ key: selectedAge, value: selectedAge }}
        />

        <View style={styles.checkbox}>
          <CheckBox
            center
            title="Female"
            checked={check1}
            onPress={() => setCheck1(!check1)}
          />
          <CheckBox
            center
            title="Male"
            checked={check2}
            onPress={() => setCheck2(!check2)}
          />
        </View>
        <View style={styles.checkbox}>
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
  },
  checkbox: {
    flexDirection: "row",
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default DiscoverFilter;
