import React from "react";
import { Pressable, Text, View } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { rootStackNavigate } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";

export function BreederCard({ breeder }) {
  return (
    <View>
      <Pressable onPress={() => rootStackNavigate("CatteryProfile")}>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 16,
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: "gray",
              marginHorizontal: 20,
              borderRadius: 16,
            }}
          ></View>

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
