import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { LogBox, StyleSheet, useWindowDimensions, View, Text, TextInput } from "react-native";
import { navigationRef } from "./components/RootNavigation";
import CatInformation from "./components/screens/CatInformation";
import CatteryProfileScreen from "./components/screens/CatteryProfileScreen";
import DiscoverFilter from "./components/screens/DiscoverFilter";
import HomePage from "./components/screens/HomePage";
import LoginOrSignUpPage from "./components/screens/LoginOrSignUpPage";
import ProfileCatteryPage from "./components/screens/ProfileCatteryPage";
import StarListScreen from "./components/screens/StarListScreen";
import UpdateCatteryPage from "./components/screens/UpdateCatteryPage";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(["Remote debugger"]);
LogBox.ignoreAllLogs();
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./resources/fonts/Montserrat-Regular.ttf"),
    Poppins: require("./resources/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./resources/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("./resources/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("./resources/fonts/Poppins-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const { height, weight } = useWindowDimensions();
  const Stack = createNativeStackNavigator();

  return (
    <View
      style={[styles.container, { maxHeight: height }]}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginOrSignUp" component={LoginOrSignUpPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="CatInformation" component={CatInformation} />
          <Stack.Screen
            name="CatteryProfile"
            component={CatteryProfileScreen}
          />
          <Stack.Screen name="DiscoverFilter" component={DiscoverFilter} />
          <Stack.Screen name="ProfileCatteryPage" component={ProfileCatteryPage} />
          <Stack.Screen name="UpdateCatteryPage" component={UpdateCatteryPage} />
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
