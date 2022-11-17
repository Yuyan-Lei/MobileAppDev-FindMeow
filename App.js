import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FilterButtons } from "./components/pressable/FilterButtons";
import { useState } from "react";
import DiscoverMainScreen from "./components/screens/DiscoverMainScreen";
import FindBreederMainScreen from "./components/screens/FindBreederMainScreen";
import CatteryProfileScreen from "./components/screens/CatteryProfileScreen";

// only use for test before adding a real navigation bar
export default function App() {
  return (
    <View>
      <CatteryProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
