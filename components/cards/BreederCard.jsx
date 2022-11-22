import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { rootStackNavigate } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";
// import DropShadow from "react-native-drop-shadow";
// import { Shadow } from "react-native-shadow-2";

export function BreederCard({ breeder }) {
  return (
    <View>
      <Pressable onPress={() => rootStackNavigate("CatteryProfile")}>
        <View style={[styles.cardView, styles.shadowView]}>
          <View style={styles.imageView}></View>

          <View style={styles.detailView}>
            <Text style={styles.breederNameText}>{breeder.name}</Text>
            <Text style={styles.breedText}>{breeder.breed}</Text>
            <Text style={styles.availableKittenText}>
              {breeder.availableCount > 0
                ? `${breeder.availableCount} Available Kittens`
                : ""}
            </Text>
            <LocationText>{breeder.location}</LocationText>
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
    shadowOpacity: 0.468,
    shadowRadius: 20,
    elevation: 17,
  }
});
