import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Alert,
} from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import { rootStackNavigate } from "../RootNavigation";
import DiscoverFilter from "./DiscoverFilter";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseUtils/firebase-setup";
import { Colors } from "../styles/Colors";
import { Avatar } from "@react-native-material/core";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { auth } from "../../firebaseUtils/firebase-setup";
import { getUserData } from "../../firebaseUtils/user";

export default function UserProfile({ route, navigation }) {
  const { height, width } = useWindowDimensions();
  const [user, setUser] = useState(null);
  getUserData().then(user => setUser(user));
  const buttonHandler = () => {
    Alert.alert("The button function is coming soon~", "See you next time!", [
      {
        text: "Sad",
        onPress: () => console.log("Feel Sad about no button function now"),
      },
      {
        text: "Wait for you",
        onPress: () => console.log("Wait for coming button function"),
      },
    ]);
  };
  const onLogout = () => {
    Alert.alert("Confirm to Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: () => auth.signOut().then(() => navigation.navigate('LoginOrSignUp')),
      }
    ]);
  }
  const onViewCatteryPage = () => navigation.navigate('ProfileCatteryPage');
  return (
    <View
      style={{
        // marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingTop: 55,
        paddingBottom: 200,
      }}
    >
      <View style={{ margin: 12 }}>
        <View>
          <TitleText>Profile</TitleText>
        </View>
      </View>

      <View style={{ alignItems: "center", marginTop: 20 }}>
        {/* add a profile photo here */}
        {/* <Text
          style={{
            color: "orange",
            fontWeight: "700",
            fontSize: 24,
            textAlign: "center",
            paddingBottom: 20,
          }}
        >
          Corrine
        </Text> */}
        <Avatar
          label={user && user.isCattery ? user.catteryName : getCurrentUserEmail()}
          color="#FFB801"
          tintColor="#FFFFFF"
          size={100} />
        <Text style={{
          color: "orange",
          fontWeight: "700",
          fontSize: 22,
          textAlign: "center",
          marginTop: 20,
          marginBottom: 20
        }}>{user && user.isCattery ? user.catteryName : getCurrentUserEmail()}</Text>

        {/* Buttons  */}
        {
          user && user.isCattery && <Pressable onPress={onViewCatteryPage} style={styles.button}>
            <Text style={styles.text}>View Cattery Page</Text>
          </Pressable>
        }
        <Pressable onPress={buttonHandler} style={styles.button}>
          <Text style={styles.text}>Change Profile Photo</Text>
        </Pressable>

        <Pressable onPress={buttonHandler} style={styles.button}>
          <Text style={styles.text}>Change Password</Text>
        </Pressable>

        <Pressable onPress={buttonHandler} style={styles.button}>
          <Text style={styles.text}>Enable Notifications</Text>
        </Pressable>

        {/* Log Out button */}
        <Pressable
          onPress={onLogout}
          style={{
            backgroundColor: Colors.messageButton,
            padding: 8,
            borderRadius: 25,
            height: 40,
            width: 120,
            marginHorizontal: 130,
            marginTop: 40,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              marginLeft: 20,
            }}
          >
            Log Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",

    height: 40,
    width: 300,
    marginVertical: 20,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 12,
  },
  text: {
    textAlign: "left",
    color: "black",
    fontSize: 18,
    marginLeft: 5,
  },
});
