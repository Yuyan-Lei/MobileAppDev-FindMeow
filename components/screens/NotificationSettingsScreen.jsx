import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import { Switch } from 'react-native-paper';
import { ButtonGroup } from "@rneui/themed";
import { updateUserNotificationSettings, getUserData } from "../../firebaseUtils/user";

export default function NotificationSettingsScreen() {
    const [enableNotification, setEnableNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    function updateNotification(enableNotification, selectedIndex) {
      let maxNotificationRange = 5;
      if (selectedIndex == 1) {
        maxNotificationRange = 10;
      } else if (selectedIndex == 2) {
        maxNotificationRange = 20;
      }

      updateUserNotificationSettings({enableNotification, maxNotificationRange});
    }

    useEffect(() => {
      getUserData().then((userData) => {
        const enableNotification = userData.enableNotification || false;
        const maxNotificationRange = userData.maxNotificationRange || 0;

        setEnableNotification(enableNotification);
        setSelectedIndex(Math.floor(maxNotificationRange / 10));
      });
    });

    return (
        <View style={styles.container}>
          {/* Screen Title */}
          <TitleText>Notification Settings</TitleText>
    
          <View style={{ 
            flexDirection: "row", 
            alignItems: "center",
            marginTop: 30,
            marginBottom: 15,
            borderRadius: 8,
            backgroundColor: "#FFFFFF",
            paddingVertical: 10,
            paddingHorizontal: 14}}>
            {/* Helper Text */}
            <Text style={styles.askText}>
                Allow Notifications
            </Text>
            <View style={{ flex: 1}}></View>
            <Switch 
                style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                color={Colors.orange}
                value={enableNotification}
                onValueChange={(value) => {
                  setEnableNotification(!enableNotification);
                  updateNotification(value, selectedIndex);
                }
                }/>
          </View>

          <Text style={styles.reminderText}>Turn on notifications to get instant updates when a new 
            cat is posted nearby.</Text>
            
          {enableNotification && <View style={{
            marginTop: 20
          }}>
            <Text style={styles.subTitle}>Range</Text>
            <ButtonGroup
                containerStyle={{ 
                    width: "100%",
                    alignSelf: "center",
                    borderColor: "transparent",
                    borderRadius: 10,
                }}
                textStyle={{
                    fontSize: 15,
                    fontFamily: "Poppins",
                }}
                buttonStyle={{
                    paddingHorizontal: 14
                }}
                selectedButtonStyle={{
                    backgroundColor: "#FFB801",
                }}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);

                    updateNotification(enableNotification, value);
                }}
                buttons={["5 mi", "10 mi", "20 mi"]}
            ></ButtonGroup>
          </View>}
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 65,
      flex: 1,
      backgroundColor: "rgb(250, 250, 250)"
    },
    inputsContainer: {
      backgroundColor: "white",
      borderRadius: 20,
      marginTop: 30,
      marginBottom: 10,
    },
    askText: {
        fontFamily: "Poppins",
        fontSize: 15,
    },
    reminderText: {
      fontFamily: "Poppins",
      fontSize: 14,
      paddingHorizontal: 14,
      color: "rgb(154, 153, 153)",
    },
    subTitle: {
      color: Colors.black,
      fontSize: 14,
      paddingHorizontal: 14,
      fontFamily: "Poppins",
    }
  });
  