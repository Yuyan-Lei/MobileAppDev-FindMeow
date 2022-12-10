import { DEVELOPER_EMAIL } from "@env";
import { Avatar } from "@react-native-material/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { React, useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";
import { Divider } from "react-native-elements";
import { auth } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { getUserLocation } from "../../firebaseUtils/user";
import { WeatherCard } from "../cards/WeatherCard";
import { navigationRef, rootStackNavigate } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";
import NotificationSettingsScreen from "./NotificationSettingsScreen";
import PostNewCatScreen from "./PostNewCatScreen";
import ProfileCatteryPage from "./ProfileCatteryPage";
import UpdatePasswordScreen from "./UpdatePasswordScreen";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";
import { CommonActions } from "@react-navigation/native";

function MainScreen({ route, navigation }) {
  const user = route.params.user;

  function navigateToLoginPageSafely() {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "LoginOrSignUp" }],
      })
    );
  }

  // Confirm to log out
  const onLogout = () => {
    Alert.alert("Confirm to Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: () =>{
          navigateToLoginPageSafely();
          auth
            .signOut()
            .catch((error) =>{
              Alert.alert(
                "Error",
                "Log out failed. Please check your internet connection."
              )
            })
      },}
    ]);
  };

  // Get the current location to enable weather service
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      getUserLocation().then((location) =>
        fetch(
          `${process.env.REACT_APP_API_URL}/weather/?lat=${location.lat}&lon=${location.lng}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        )
          .then((res) => res.json())
          .then((result) => {
            setData(result);
          })
      );
    };
    fetchData();
  }, []);

  // Navigators
  const onViewCatteryPage = () =>
    navigation.navigate("ProfileCatteryPage", { user });
  const onUpdatePassword = () => navigation.navigate("UpdatePasswordPage");
  const onNotificationSettings = () =>
    navigation.navigate("NotificationSettingsScreen");
  const onSendFeedback = () =>
    Linking.openURL(
      "mailto:" +
        DEVELOPER_EMAIL +
        "?subject=FindMeow user feedback from " +
        getCurrentUserEmail()
    );

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={{ margin: 12 }}>
        <View>
          <TitleText>Profile</TitleText>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Avatar
          label={
            user && user.isCattery ? user.catteryName : getCurrentUserEmail()
          }
          color={Colors.orange}
          tintColor={Colors.white}
          size={90}
        />
        <Text style={styles.catteryNameText}>
          {user && user.isCattery ? user.catteryName : getCurrentUserEmail()}
        </Text>

        <View style={styles.buttonContainer}>
          {user && user.isCattery && (
            <View>
              <Pressable
                onPress={onViewCatteryPage}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? Colors.catInfoMainBackground
                      : Colors.white,
                  },
                  styles.button,
                ]}
              >
                <Text style={styles.buttonText}>View Cattery Page</Text>
              </Pressable>
              <Divider style={styles.divider} />
            </View>
          )}

          <Pressable
            onPress={onUpdatePassword}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors.catInfoMainBackground
                  : Colors.white,
              },
              styles.button,
            ]}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </Pressable>
          <Divider style={styles.divider} />

          <Pressable
            onPress={onNotificationSettings}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors.catInfoMainBackground
                  : Colors.white,
              },
              styles.button,
            ]}
          >
            <Text style={styles.buttonText}>Notification Settings</Text>
          </Pressable>
          <Divider style={styles.divider} />

          <Pressable
            onPress={onSendFeedback}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? Colors.catInfoMainBackground
                  : Colors.white,
              },
              styles.button,
            ]}
          >
            <Text style={styles.buttonText}>Send Feedback</Text>
          </Pressable>
        </View>

        {/* Log Out button */}
        <Pressable
          onPress={onLogout}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? Colors.orangeOnPressed : Colors.orange,
            },
            styles.logOutButton,
          ]}
        >
          <Text style={styles.logOutButtonText}>Log Out</Text>
        </Pressable>

        {/* Weather */}
        <View style={styles.weatherContainer}>
          {typeof data.main != "undefined" ? (
            <WeatherCard weatherData={data} />
          ) : (
            <Text> </Text>
          )}
        </View>
      </View>
      {/* weather  */}
      <View style={{ height: 130 }}/>
    </ScrollView>
  );
}

export default function UserProfile({ route }) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        initialParams={{ user: route.params.user }}
      />
      <Stack.Screen name="ProfileCatteryPage" component={ProfileCatteryPage} />
      <Stack.Screen
        name="UpdatePasswordPage"
        component={UpdatePasswordScreen}
      />
      <Stack.Screen name="CatInformation" component={CatInformation} />
      <Stack.Screen name="PostNewCatScreen" component={PostNewCatScreen} />
      <Stack.Screen name="CatteryProfile" component={CatteryProfileScreen} />
      <Stack.Screen
        name="NotificationSettingsScreen"
        component={NotificationSettingsScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 200,
    backgroundColor: Colors.catInfoMainBackground,
  },
  catteryNameText: {
    fontFamily: FontFamily.heavy,
    color: Colors.orangeText,
    fontWeight: "700",
    fontSize: FontSizes.catteryNameProfile,
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 40,
    width: "88%",
  },
  button: {
    height: 40,
    marginVertical: 8,
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: FontFamily.normal,
    textAlign: "left",
    color: Colors.black,
    fontSize: FontSizes.subSubTitle,
    marginLeft: 10,
  },
  divider: {
    borderBottomWidth: 1.3,
    marginHorizontal: 10,
  },
  logOutButton: {
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    width: "90%",
  },
  logOutButtonText: {
    textAlign: "center",
    fontSize: FontSizes.subSubTitle,
    color: Colors.white,
    fontWeight: "600",
    marginTop: 3,
    fontFamily: FontFamily.bold,
  },
  weatherContainer: {
    alignItems: "baseline",
  },
});
