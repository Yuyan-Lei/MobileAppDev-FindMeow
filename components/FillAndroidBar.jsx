import React from "react";
import { Dimensions, StatusBar, View } from "react-native";

const screenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;
const statusBarHeight = StatusBar.currentHeight;
const navbarHeight = screenHeight - windowHeight + statusBarHeight;

export function FillAndroidTopBar() {
  return (
    <View style={{ height: statusBarHeight, width: "100%", opacity: 1 }} />
  );
}

export function FillAndroidButtomBar() {
  return <View style={{ height: navbarHeight, width: "100%", opacity: 1 }} />;
}
