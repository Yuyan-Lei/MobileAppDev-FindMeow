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
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function HomePage({ route, navigation }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({ 
        headerShown: false,
        tabBarActiveTintColor: '#F6A939',
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Post') {
            return <Ionicons name='add-circle-outline' size={size} color={color} />;
          } else if (route.name === 'Cats') {
            return <FontAwesome5 name='cat' size={size} color={color} />;
          } else if (route.name === 'Catteries') {
            return <MaterialIcons name='storefront' size={size} color={color} />;
          } else if (route.name === 'Like') {
            return <Ionicons name='heart-outline' size={size} color={color} />;
          } else {
            return <AntDesign name="user" size={size} color={color} />;
          }
        },
       })}
    >
      <Tab.Screen
        name="Cats"
        component={DiscoverMainScreen}
        initialParams={{ symbol: "1" }}
      />
      <Tab.Screen
        name="Catteries"
        component={FindBreederMainScreen}
        initialParams={{ symbol: "2" }}
      />
      <Tab.Screen
        name="Post"
        component={PostNewCatScreen}
        initialParams={{ symbol: "3" }}
        screenOptions={{ tabBarLabel: "Add"}}
      />
      <Tab.Screen
        name="Like"
        component={PostNewCatScreen}
        initialParams={{ symbol: "4" }}
      />
      <Tab.Screen
        name="Profile"
        component={PostNewCatScreen}
        initialParams={{ symbol: "5" }}
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
