import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CatteryProfileScreen from "./CatteryProfileScreen";
import { TabBar } from "../TabBar";
import DiscoverMainScreen from "./DiscoverMainScreen";
import FindBreederMainScreen from "./FindBreederMainScreen";
import { Dimensions } from "react-native";
import DiscoverFilter from "./DiscoverFilter";
import CatInformation from "./CatInformation";
import PostNewCatScreen from "./PostNewCatScreen";

export default function HomePage({ route, navigation }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="DiscoverMain"
        component={DiscoverMainScreen}
        initialParams={{ symbol: "1" }}
      />
      <Tab.Screen
        name="FindBreederMain"
        component={FindBreederMainScreen}
        initialParams={{ symbol: "2" }}
      />
      <Tab.Screen
        name="PostNewCat"
        component={PostNewCatScreen}
        initialParams={{ symbol: "3"}}
      />
      {/* <Tab.Screen
        name="CatteryProfile"
        component={CatteryProfileScreen}
        initialParams={{ symbol: "3" }}
      />
      <Tab.Screen
        name="DiscoverFilter"
        component={DiscoverFilter}
        initialParams={{ symbol: "4" }}
      />
      <Tab.Screen
        name="CatInformation"
        component={CatInformation}
        initialParams={{ symbol: "5" }}
      /> */}
    </Tab.Navigator>
  );
}
