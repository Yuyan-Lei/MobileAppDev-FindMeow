import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { FilterButtons } from "./components/pressable/FilterButtons";
import { useState } from "react";
import DiscoverMainScreen from "./components/screens/DiscoverMainScreen";
import DiscoverFilter from "./components/screens/DiscoverFilter";
import CatInformation from "./components/screens/CatInformation";

// only use for test before adding a real navigation bar
export default function App() {
  return (
    <View>
      {/* <DiscoverMainScreen /> */}
      {/* <DiscoverFilter></DiscoverFilter> */}
      <CatInformation />
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
