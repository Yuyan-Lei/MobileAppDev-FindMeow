import { AntDesign } from "@expo/vector-icons";
import { Input } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export function SearchBar({ text, setText }) {
  return (
    <View style={styles.container}>
      <Input
        value={text}
        onChangeText={(value) => setText(value)}
        leftIcon={<AntDesign name="search1" color={Colors.black} size={16} />}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        placeholder="Search"
        style={styles.inputBarStyle}
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 0,
    height: "100%",
  },
  container: {
    flexDirection: "row",
    flex: 1,
  },
  leftIconContainerStyle: {
    paddingRight: 8,
  },
  inputBarStyle: {},
  inputStyle: {
    fontSize: FontSizes.subSubTitle,
    fontFamily: FontFamily.normal,
    color: Colors.grayText,
  },
});
