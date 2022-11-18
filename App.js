import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import HomePage from "./components/screens/HomePage";

export default function App() {
  const { height, weight } = useWindowDimensions();
  const Stack = createNativeStackNavigator();

  return (
    <View style={[styles.container, { maxHeight: height }]}>
      {/* <CatteryProfileScreen /> */}
      {/* <DiscoverFilter /> */}
      {/* <DiscoverMainScreen /> */}
      {/* <FindBreederMainScreen /> */}

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
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
