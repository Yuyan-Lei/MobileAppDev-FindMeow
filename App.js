import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LogBox, StyleSheet, useWindowDimensions, View } from "react-native";
import HomePage from "./components/screens/HomePage";
import CatteryProfileScreen from "./components/screens/CatteryProfileScreen";
import DiscoverMainScreen from "./components/screens/DiscoverMainScreen";
import { navigationRef } from "./components/RootNavigation";
import CatInformation from "./components/screens/CatInformation";

LogBox.ignoreLogs(["Remote debugger"]);

export default function App() {
  const { height, weight } = useWindowDimensions();
  const Stack = createNativeStackNavigator();

  return (
    <View style={[styles.container, { maxHeight: height }]}>
      {/* <CatteryProfileScreen /> */}
      {/* <DiscoverFilter /> */}
      {/* <DiscoverMainScreen /> */}
      {/* <FindBreederMainScreen /> */}

      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="CatInformation" component={CatInformation} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
