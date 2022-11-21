import React from "react";
import { Pressable, Text, View } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { rootStackNavigate } from "../RootNavigation";
import { LocationText } from "../texts/LocationText";

export function BreederCard({ breeder }) {
  return (
    <View>
      <Pressable onPress={() => rootStackNavigate("CatteryProfile")}>
        <View
          style={{
            flexDirection: "row",
            padding: 16,
          }}
        >
          <View
            style={{
              height: 80,
              width: 80,
              backgroundColor: "gray",
              marginRight: 24,
              borderRadius: 16,
            }}
          ></View>

          {/* I tried to use "flexGlow:1" but it doesn't work */}
          <View style={{ width: 360 }}>
            <Text style={{ fontWeight: "bold" }}>{breeder.name}</Text>
            <Text>{breeder.breed}</Text>
            <Text style={{ color: "orange", fontWeight: "500" }}>
              {breeder.availableCount > 0
                ? `${breeder.availableCount} Available Kittens`
                : ""}
            </Text>
            <LocationText>{breeder.location}</LocationText>
          </View>
        </View>
      </Pressable>

      <View style={{ position: "absolute", top: 8, right: 8 }}>
        <HeartButton />
      </View>
    </View>
  );
}
