import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import DiscoverMainScreen from "./DiscoverMainScreen";
import FindBreederMainScreen from "./FindBreederMainScreen";
import PostNewCatScreen from "./PostNewCatScreen";
import StarListScreen from "./StarListScreen";
import UserProfile from "./UserProfile";

export default function HomePage({ route, navigation }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#F6A939",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Post") {
            return (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            );
          } else if (route.name === "Cats") {
            return <FontAwesome5 name="cat" size={size} color={color} />;
          } else if (route.name === "Catteries") {
            return (
              <MaterialIcons name="storefront" size={size} color={color} />
            );
          } else if (route.name === "Like") {
            return <Ionicons name="heart-outline" size={size} color={color} />;
          } else {
            return <AntDesign name="user" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Cats" component={DiscoverMainScreen} />
      <Tab.Screen name="Catteries" component={FindBreederMainScreen} />
      <Tab.Screen
        name="Post"
        component={PostNewCatScreen}
        screenOptions={{ tabBarLabel: "Add" }}
      />
      <Tab.Screen name="Like" component={StarListScreen} />
      <Tab.Screen name="Profile" component={UserProfile} />
    </Tab.Navigator>
  );
}
