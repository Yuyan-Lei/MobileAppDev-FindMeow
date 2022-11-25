import { Avatar } from "@react-native-material/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  Alert, Pressable, StyleSheet,
  Text, useWindowDimensions, View
} from "react-native";
import { Divider } from 'react-native-elements';
import { auth } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { rootStackNavigate } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import ProfileCatteryPage from "./ProfileCatteryPage";

export default function UserProfile({ route, navigation }) {
  const user = route.params.user;

  const buttonHandler = () => {
    Alert.alert("Feature for this button is coming soon~", "See you next time!", [
      { text: "Sad" },
      { text: "Wait for you" },
    ])
  };

  const onLogout = () => {
    Alert.alert("Confirm to Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: () => auth.signOut().then(() => rootStackNavigate('LoginOrSignUp')),
      }
    ]);
  }


  function MainScreen({ route, navigation }) {
    const onViewCatteryPage = () => navigation.navigate('ProfileCatteryPage', { user });
    return (<View style={styles.container}>
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
        <Text style={styles.catteryNameText}>
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
    )
  };

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="ProfileCatteryPage" component={ProfileCatteryPage} />
    </Stack.Navigator>
  )

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 200,
  },
  catteryNameText: {
    fontFamily: "PoppinsBold",
    color: "#F59156",
    fontWeight: "700",
    fontSize: 21,
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 40,
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
    fontFamily: "Poppins",
    textAlign: "left",
    color: "black",
    fontSize: 16,
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
    fontFamily: "PoppinsSemiBold",
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
});
