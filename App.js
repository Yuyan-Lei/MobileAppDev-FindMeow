import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import {
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View
} from "react-native";
import { navigationRef } from "./components/RootNavigation";
import HomePage from "./components/screens/HomePage";
import LoginOrSignUpPage from "./components/screens/LoginOrSignUpPage";
import UpdateCatteryPage from "./components/screens/UpdateCatteryPage";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(["Remote debugger"]);
LogBox.ignoreAllLogs();
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { height, weight } = useWindowDimensions();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Montserrat: require("./resources/fonts/Montserrat-Regular.ttf"),
          Poppins: require("./resources/fonts/Poppins-Regular.ttf"),
          PoppinsBold: require("./resources/fonts/Poppins-Bold.ttf"),
          PoppinsSemiBold: require("./resources/fonts/Poppins-SemiBold.ttf"),
          PoppinsMedium: require("./resources/fonts/Poppins-Medium.ttf"),
          PoppinsLight: require("./resources/fonts/Poppins-Light.ttf"),
          PoppinsRegular: require("./resources/fonts/Poppins-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <View
      style={[styles.container, { maxHeight: height }]}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginOrSignUp" component={LoginOrSignUpPage} />
          <Stack.Screen
            name="Home"
            component={HomePage}
          />
          <Stack.Screen
            name="UpdateCatteryPage"
            component={UpdateCatteryPage}
          />
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
