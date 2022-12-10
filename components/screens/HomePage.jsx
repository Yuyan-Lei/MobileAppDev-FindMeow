import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import DiscoverMainScreen from "./DiscoverMainScreen";
import FindBreederMainScreen from "./FindBreederMainScreen";
import PostNewCatScreen from "./PostNewCatScreen";
import StarListScreen from "./StarListScreen";
import UserProfile from "./UserProfile";
import { Colors } from "../styles/Colors";
import { Pressable, View, Platform } from "react-native";

const CustomTabBarButton = ({children, onPress}) => (
  <Pressable 
    style={{ 
      // top: Platform.OS === "ios" ? 11 : -2,
      // alignSelf: "center"
      flex: 1,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 60,
        height: 50,
        marginVertical: 5
      }}
    >{children}</View>
  </Pressable>
);
export default function HomePage({ route, navigation }) {
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const docRef = doc(db, "Users", getCurrentUserEmail());
    const unSubscribe = onSnapshot(docRef, (snapshot) => {
      setUser(snapshot.data());
    });

    return () => unSubscribe();
  }, []);

  return (
    user && (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            position: "absolute",
            marginBottom: 20,
            marginHorizontal: user.isCattery ? "5%" : "12.5%",
            elevation: 0,
            borderRadius: 36,
            height: 70,
            width: user.isCattery ? "90%" : "75%",
            backgroundColor: "white",
            shadowColor: Colors.black,
            shadowRadius: 8,
            shadowOpacity: 0.5,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            elevation: 17,
            alignItems: "center",
            paddingHorizontal: "5%"
          },
          tabBarButton: (props) => (<CustomTabBarButton {...props} />),
          tabBarActiveTintColor: Colors.activeTabNav,
        })}
      >
        <Tab.Screen 
          name="Cats" 
          component={DiscoverMainScreen}
          options={{
            tabBarIcon: ({color, size}) => <FontAwesome5 name="cat" size={size} color={color} />
          }} />
        <Tab.Screen 
          name="Catteries" 
          component={FindBreederMainScreen}
          options={{
            tabBarIcon: ({color, size}) => <MaterialIcons name="storefront" size={size} color={color} />
          }} />
        {user && user.isCattery && (
          <Tab.Screen
            name="Post"
            component={PostNewCatScreen}
            options={{ 
              tabBarIcon: ({color, size}) => <Ionicons name="add-circle-outline" size={size} color={color} />
              }}
            initialParams={{ user }}
          />
        )}
        <Tab.Screen 
          name="Liked" 
          component={StarListScreen}
          options={{ 
              tabBarIcon: ({color, size}) => <Ionicons name="heart-outline" size={size} color={color} />
              }} />
        <Tab.Screen
          name="Profile"
          component={UserProfile}
          initialParams={{ user }}
          options={{ 
              tabBarIcon: ({color, size}) => <AntDesign name="user" size={size} color={color} />
              }}
        />
      </Tab.Navigator>
    )
  );
}
