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
import { Divider } from 'react-native-elements';

export default function UserProfile({ route, navigation }) {
  const { height, width } = useWindowDimensions();
  const [user, setUser] = useState(null);

  getUserData().then(user => setUser(user));

  const buttonHandler = () => {
    Alert.alert("The button function is coming soon~", "See you next time!", [
      {text: "Sad"},
      {text: "Wait for you"},
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
    <View style={styles.container}>
      <View style={{ margin: 12 }}>
        <View>
          <TitleText>Profile</TitleText>
        </View>
      </View>

      <View style={{ 
        alignItems: "center", 
        marginTop: 20 
      }}>
        <Avatar
          label={user && user.isCattery ? user.catteryName : getCurrentUserEmail()}
          color="#FFB801"
          tintColor="#FFFFFF"
          size={90} />
        <Text style={{
          color: "orange",
          fontWeight: "700",
          fontSize: 21,
          textAlign: "center",
          marginTop: 20,
        }}>
          {user && user.isCattery ? user.catteryName : getCurrentUserEmail()}
        </Text>


        <View style={styles.buttonContainer}>
          {
            user && user.isCattery &&
            <View>
              <Pressable onPress={onViewCatteryPage} style={styles.button}>
                <Text style={styles.buttonText}>View Cattery Page</Text>
              </Pressable>
              <Divider style={styles.divider} />
            </View>
          }
          <Pressable onPress={buttonHandler} style={styles.button}>
            <Text style={styles.buttonText}>Change Profile Photo</Text>
          </Pressable>
          <Divider style={styles.divider} />

          <Pressable onPress={buttonHandler} style={styles.button}>
            <Text style={styles.buttonText}>Change Password</Text>
          </Pressable>
          <Divider style={styles.divider} />

          <Pressable onPress={buttonHandler} style={styles.button}>
            <Text style={styles.buttonText}>Enable Notifications</Text>
          </Pressable>
        </View>

        {/* Log Out button */}
        <Pressable
          onPress={onLogout}
          style={styles.logOutButton}
        >
          <Text style={styles.logOutButtonText}>
            Log Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 200,
  },
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 40,
    height: 230,
    width: '88%'
  },
  button: {
    backgroundColor: "white",
    height: 40,
    width: 300,
    marginVertical: 8,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "left",
    color: "black",
    fontSize: 18,
    marginLeft: 10,
  },
  divider: {
    borderBottomWidth: 1.3,
    marginHorizontal: 10,
  },
  logOutButton: {
    backgroundColor: Colors.messageButton,
    borderRadius: 25,
    height: 43,
    width: 182,
    alignItems: "center",
  },
  logOutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
});
