import { Avatar } from "@react-native-material/core";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState, React} from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking
} from "react-native";
import { Divider } from "react-native-elements";
import { auth } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { rootStackNavigate } from "../RootNavigation";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";
import PostNewCatScreen from "./PostNewCatScreen";
import NotificationSettingsScreen from "./NotificationSettingsScreen";
import ProfileCatteryPage from "./ProfileCatteryPage";
import UpdatePasswordScreen from "./UpdatePasswordScreen";
import { DEVELOPER_EMAIL } from "@env";
import { WeatherCard} from "../cards/WeatherCard"
import { getUserLocation } from "../../firebaseUtils/user";


function MainScreen({ route, navigation }) {
  const user = route.params.user;

  // Confirm to log out
  const onLogout = () => {
    Alert.alert("Confirm to Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
      },
      {
        text: "Confirm",
        onPress: () =>
          auth.signOut().then(() => rootStackNavigate("LoginOrSignUp")),
      },
    ]);
  };


  // Get the current location to enable weather service
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      getUserLocation().then( (location) => 
      fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${location.lat}&lon=${location.lng}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result);
      }));
    }
    fetchData();
  }, [])


  // Navigators
  const onViewCatteryPage = () =>
    navigation.navigate("ProfileCatteryPage", { user });
  const onUpdatePassword = () => navigation.navigate("UpdatePasswordPage");
  const onNotificationSettings = () =>
    navigation.navigate("NotificationSettingsScreen");
  const onSendFeedback = () => Linking.openURL('mailto:' + DEVELOPER_EMAIL 
  + '?subject=FindMeow user feedback from ' + getCurrentUserEmail());

  
  return (
    <View style={styles.container}>
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
          color="#FFB801"
          tintColor="#FFFFFF"
          size={90}
        />
        <Text style={styles.catteryNameText}>
          {user && user.isCattery ? user.catteryName : getCurrentUserEmail()}
        </Text>

        <View style={styles.buttonContainer}>
          {user && user.isCattery && (
            <View>
              <Pressable onPress={onViewCatteryPage} style={styles.button}>
                <Text style={styles.buttonText}>View Cattery Page</Text>
              </Pressable>
              <Divider style={styles.divider} />
            </View>
          )}

          <Pressable onPress={onUpdatePassword} style={styles.button}>
            <Text style={styles.buttonText}>Change Password</Text>
          </Pressable>
          <Divider style={styles.divider} />

          <Pressable onPress={onNotificationSettings} style={styles.button}>
            <Text style={styles.buttonText}>Notification Settings</Text>
          </Pressable>
          <Divider style={styles.divider} />

          <Pressable onPress={onSendFeedback} style={styles.button}>
            <Text style={styles.buttonText}>Send Feedback</Text>
          </Pressable>
        </View>

        {/* Log Out button */}
        <Pressable onPress={onLogout} style={styles.logOutButton}>
          <Text style={styles.logOutButtonText}>Log Out</Text>
        </Pressable>

        {/* Weather */}
        <View style={styles.weatherContainer}>
          {(typeof data.main != 'undefined') ? (
           <WeatherCard weatherData={data}/>
          ): (
            <Text> Loading...</Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default function UserProfile({ route, navigation }) {
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
    backgroundColor: "rgb(250, 250, 250)",
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
    width: "88%",
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
    backgroundColor: "#FFB801",
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    padding: 16,
    width: "90%",
  },
  logOutButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    marginTop: 3,
    fontFamily: "PoppinsSemiBold",
  },
  weatherContainer: {
    alignItems: "baseline",
  }
});
