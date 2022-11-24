import React from "react";
import { Platform, Pressable, StyleSheet, Text, View, Image, Alert } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { rootStackNavigate } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";
// import DropShadow from "react-native-drop-shadow";
// import { Shadow } from "react-native-shadow-2";

export function BreederCard({ cattery }) {
  return (
    <View style={{ marginHorizontal: 10}}>
      <Pressable onPress={() => rootStackNavigate("CatteryProfile", {cattery})}>
        <View style={[styles.cardView, styles.shadowView]}>

          {/* Cattery photo */}
          <View style={styles.imageView}>
            <Image source={{ uri: cattery.picture }} style={styles.image} />
          </View>

          <View style={styles.detailView}>
            {/* Cattery Avatar */}
            <Text style={styles.breederNameText}>{cattery.catteryName}</Text>

            {/* Cattery Breed */}
            <Text style={styles.breedText}>{cattery.breed}</Text>

            {/* Available Kitten Display */}
            <Text style={styles.availableKittenText}>
              {cattery.cats.length > 0 ? 
                cattery.cats.length === 1 ? `${cattery.cats.length} Available Kitten` : `${cattery.cats.length} Available Kittens`
                : ""}
            </Text>
            
            {/* Cattery Location */}
            <LocationText>
              {cattery.address.split(", ")[1] + ", " + cattery.address.split(", ")[2]}
            </LocationText>
          </View>
        </View>
      </Pressable>

      <View style={styles.heartButtonView}>
        <HeartButton 
            onPress={() =>{
                Alert.alert("Feature for this button is coming soon~", "See you next time!", [
                  {text: "Sad"},
                  {text: "Wait for you"},
                ])
            }}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heartButtonView: {
    position: "absolute",
    top: 20,
    right: 24,
  },
  availableKittenText: {
    color: "orange",
    fontWeight: "500",
  },
  breedText: {
    color: Colors.black,
  },
  breederNameText: {
    fontWeight: "bold",
    color: Colors.black,
  },
  detailView: {
    width: 360,
  },
  imageView: {
    height: 80,
    width: 80,
    backgroundColor: "gray",
    marginHorizontal: 20,
    borderRadius: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  cardView: {
    flexDirection: "row",
    padding: 16,
    paddingLeft: 8,
    margin: 16,
    backgroundColor: "white",
    borderRadius: 20,
  },
  shadowView: {
    shadowColor: Platform.OS === 'ios' ? Colors.purple : Colors.shadowWhiteAndroid,
    shadowOffset: {
      width: 40,
      height: 80,
    },
    shadowOpacity: 0.0468,
    shadowRadius: 20,
    elevation: 17,
  }
});
