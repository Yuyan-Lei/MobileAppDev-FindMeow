import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { rootStackNavigate } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";
// import DropShadow from "react-native-drop-shadow";
import { Shadow } from "react-native-shadow-2";

export function BreederCard({ breeder }) {
  return (
    <View>
      <Shadow
        distance={5}
        startColor={"#00000010"}
        containerViewStyle={{ marginVertical: 20 }}
        radius={8}
      ></Shadow>
      <Pressable onPress={() => rootStackNavigate("CatteryProfile")}>
        <View style={styles.cardView}>
          <View style={styles.imageView}></View>

          <View style={{ width: 360 }}>
            <Text style={{ fontWeight: "bold", color: Colors.black }}>
              {breeder.name}
            </Text>
            <Text style={{ color: Colors.black }}>{breeder.breed}</Text>
            <Text style={{ color: "orange", fontWeight: "500" }}>
              {breeder.availableCount > 0
                ? `${breeder.availableCount} Available Kittens`
                : ""}
            </Text>
            <LocationText>{breeder.location}</LocationText>
          </View>
        </View>
      </Pressable>

      <View style={{ position: "absolute", top: 8, right: 24 }}>
        <HeartButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    height: 80,
    width: 80,
    backgroundColor: "gray",
    marginHorizontal: 20,
    borderRadius: 16,
  },
  cardView: {
    flexDirection: "row",
    marginVertical: 16,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
