import React, { useState } from "react";
import { Button, Overlay, Chip } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Colors from "../Colors";

const CatInformation = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);

  const phoneHandler = () => {
    Alert.alert("Phone number", "123-456-7890", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };
  const messageHandler = () => {
    Alert.alert("Message number", "123-456-7890", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../pictures/kaka.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <Button
          title="Cat info"
          onPress={phoneHandler}
          buttonStyle={styles.button}
        />
        <Overlay style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 20,
            }}
          >
            <View style={styles.label}>
              <View
                style={{
                  backgroundColor: Colors.labelBackground,
                  marginHorizontal: 20,
                }}
              >
                <Text style={{ color: Colors.gray }}>Gender</Text>
                <Text>Female</Text>
              </View>
              <View
                style={{
                  backgroundColor: Colors.labelBackground,
                  marginHorizontal: 20,
                }}
              >
                <Text style={{ color: Colors.gray }}>Age</Text>
                <Text>1 year</Text>
              </View>
              <View
                style={{
                  backgroundColor: Colors.labelBackground,
                  marginHorizontal: 20,
                }}
              >
                <Text style={{ color: Colors.gray }}>Breed</Text>
                <Text>Unknown</Text>
              </View>

              {/* <Chip title="Female" containerStyle={styles.chip} />
              <Chip title="1 year" containerStyle={styles.chip} />
              <Chip title="Unknown" containerStyle={styles.chip} /> */}
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textPrimary}>Kaka</Text>
            <Text
              style={{
                textAlign: "right",
                fontSize: 20,
                fontWeight: "bold",
                color: Colors.darkOrange,
                marginLeft: "auto",
              }}
            >
              200$
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="location-sharp"
              size={24}
              color={Colors.darkOrange}
            />
            <Text style={styles.textSecondary}>Santa Clara (0.8km)</Text>
          </View>

          <Text style={styles.date}>Nov 17, 2022</Text>
          <View style={styles.chipBox}>
            <Chip title="Vaccinated" containerStyle={styles.chip} />
            <Chip title="Vet Checked" containerStyle={styles.chip} />
            <Chip title="Dewormed" containerStyle={styles.chip} />
          </View>

          <Text style={styles.contact}>Contact Info</Text>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text>Angel Girls</Text>
              <Text style={styles.date}>Cattery</Text>
            </View>
            <View style={styles.buttonView}>
              <Button onPress={phoneHandler} style={{ marginHorizontal: 10 }}>
                <Feather name="phone-call" size={24} color="black" />
              </Button>
              {/* <TouchableOpacity
              onPress={phoneHandler}
              styles={styles.roundButton}
            >
              <Text>Call</Text>
            </TouchableOpacity> */}
              <Button onPress={messageHandler} style={{ marginHorizontal: 10 }}>
                <AntDesign name="message1" size={24} color="black" />
              </Button>
            </View>
          </View>
        </Overlay>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    marginTop: 1000,
    width: 100,
    alignSelf: "flex-end",
  },
  card: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  label: {
    alignItems: "center",
    flexDirection: "row",
  },
  textPrimary: {
    textAlign: "left",
    fontSize: 28,
    fontWeight: "bold",
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "left",
    fontSize: 14,
  },
  chip: {
    marginVertical: 15,
    marginHorizontal: 10,
    height: 30,
  },
  contact: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonView: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  roundButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  chipBox: {
    flexDirection: "row",
  },
  date: {
    color: Colors.gray,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default CatInformation;
