import React from "react";
import { Platform, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { rootStackNavigate } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";
// import DropShadow from "react-native-drop-shadow";
// import { Shadow } from "react-native-shadow-2";

export function BreederCard({ cattery }) {
  return (
    <View>
      <Pressable onPress={() => rootStackNavigate("CatteryProfile", {cattery})}>
        <View style={[styles.cardView, styles.shadowView]}>
          <View style={styles.imageView}>
            {/* Cattery photo */}
            <Image source={{ uri: cattery.catteryData.picture }} style={styles.image} />
          </View>

          <View style={styles.detailView}>
            <Text style={styles.breederNameText}>{cattery.catteryData.catteryName}</Text>
            <Text style={styles.breedText}>{cattery.catteryData.breeds[0]}</Text>
            <Text style={styles.availableKittenText}>
              {cattery.catteryData.cats.length > 0
                ? `${cattery.catteryData.cats.length} Available Kittens`
                : ""}
            </Text>
            <LocationText>{cattery.catteryData.address.split(", ")[1] 
              + ", " + cattery.catteryData.address.split(", ")[2]}</LocationText>
          </View>
        </View>
      </Pressable>

      <View style={styles.heartButtonView}>
        <HeartButton />
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
    height: 65,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
