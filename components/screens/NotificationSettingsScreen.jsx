import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
import { useState } from "react";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import { Switch } from 'react-native-paper';
import { ButtonGroup } from "@rneui/themed";

export default function NotificationSettingsScreen() {
    const [enableNotification, setEnableNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
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
                onValueChange={() => setEnableNotification(!enableNotification)}/>
          </View>

          <Text style={styles.reminderText}>When enabled, you will receive notifications when a new 
            cat is posted within the distance that you set.</Text>
            
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
                }}
                buttons={["5 km", "10 km", "20 km"]}
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
      color: "rgb(154, 153, 153)",
      fontSize: 14,
      paddingHorizontal: 14,
      fontFamily: "Poppins",
    }
  });
  