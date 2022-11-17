import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { FilterButtons } from "./components/pressable/FilterButtons";
import { useState } from "react";
import DiscoverMainScreen from "./components/screens/DiscoverMainScreen";
import FindBreederMainScreen from "./components/screens/FindBreederMainScreen";
import CatteryProfileScreen from "./components/screens/CatteryProfileScreen";

// only use for test before adding a real navigation bar
export default function App() {
  const { height, weight } = useWindowDimensions();
  return (
    <View style={[styles.container, { maxHeight: height }]}>
      <CatteryProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
