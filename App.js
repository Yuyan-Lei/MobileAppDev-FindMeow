import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  LogBox,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  Platform,
} from "react-native";
import { navigationRef } from "./components/RootNavigation";
import HomePage from "./components/screens/HomePage";
import LoginOrSignUpPage from "./components/screens/LoginOrSignUpPage";
import UpdateCatteryPage from "./components/screens/UpdateCatteryPage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(["Remote debugger"]);
LogBox.ignoreAllLogs();
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release",
]);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { height, weight } = useWindowDimensions();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
          <Stack.Screen name="Home" component={HomePage} />
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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
