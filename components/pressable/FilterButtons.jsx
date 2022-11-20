import { ButtonGroup } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";

// reference: https://reactnativeelements.com/docs/components/buttongroup
export function FilterButtons({ selectedIndex, setSelectedIndex, buttons }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ButtonGroup
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={styles.buttonContainerStyle}
          selectedButtonStyle={styles.selectedButtonStyle}
          selectedTextStyle={styles.selectedTextStyle}
          textStyle={styles.buttonTextStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
  },
  buttonContainerStyle: { height: 40, shadowRadius: 10, borderRadius: 10 },
  selectedButtonStyle: {
    backgroundColor: "#FFB801",
  },
  buttonTextStyle: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "rgba(46, 37, 37, 0.43)",
    fontWeight: "500",
  },
  selectedTextStyle: { color: "white" },
});
