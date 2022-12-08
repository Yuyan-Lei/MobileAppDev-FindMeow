import { ButtonGroup } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";

// reference: https://reactnativeelements.com/docs/components/buttongroup
export function FilterButtons({ selectedIndex, setSelectedIndex, buttons }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ButtonGroup
          containerStyle={styles.buttonContainerStyle}
          innerBorderStyle={{
            color: "transparent",
          }}
          buttonStyle={styles.unselectedButtonStyle}
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
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
    alignSelf: "center",
    margin: 12,
  },
  buttonContainerStyle: {
    height: 40,
    color: Colors.white,
    borderColor: "transparent",
  },

  unselectedButtonStyle: {
    backgroundColor: Colors.unselectedButton,
    borderRadius: 10,
    marginHorizontal: 3,
  },
  selectedButtonStyle: {
    backgroundColor: Colors.orange,
    borderRadius: 10,
    marginHorizontal: 5,
  },

  buttonTextStyle: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: Colors.unselectedText,
    fontWeight: "500",
  },
  selectedTextStyle: {
    color: Colors.white,
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
  },
});
