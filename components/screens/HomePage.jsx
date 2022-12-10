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

export default function HomePage() {
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
          tabBarActiveTintColor: Colors.activeTabNav,
          tabBarIcon: ({ color, size }) => {
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
            } else if (route.name === "Liked") {
              return (
                <Ionicons name="heart-outline" size={size} color={color} />
              );
            } else {
              return <AntDesign name="user" size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Cats" component={DiscoverMainScreen} />
        <Tab.Screen name="Catteries" component={FindBreederMainScreen} />
        {user && user.isCattery && (
          <Tab.Screen
            name="Post"
            component={PostNewCatScreen}
            screenOptions={{ tabBarLabel: "Add" }}
            initialParams={{ user }}
          />
        )}
        <Tab.Screen name="Liked" component={StarListScreen} />
        <Tab.Screen
          name="Profile"
          component={UserProfile}
          initialParams={{ user }}
        />
      </Tab.Navigator>
    )
  );
}
