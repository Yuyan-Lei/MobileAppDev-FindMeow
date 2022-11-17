import { Image } from "@rneui/themed";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { HeartButton } from "../pressable/HeartButton";

export function BreederCard({ breeder }) {
  return (
    <View
      style={{
        flexDirection: "row",
        margin: 12,
        padding: 12,
        alignItems: "center",
        marginHorizontal: 28,
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
      >
        {"image" in breeder ? (
          <Image
            //TODO: why not working?
            source={require("resources/cats/Angel Girls.png")}
            containerStyle={{ aspectRatio: 1, flex: 1, width: "100%" }}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <></>
        )}
      </View>
      <View>
        <Text style={{ fontWeight: "bold" }}>{breeder.name}</Text>
        <Text>{breeder.breed}</Text>
        <Text style={{ color: "orange", fontWeight: "500" }}>
          {breeder.availableCount > 0
            ? `${breeder.availableCount} Available Kittens`
            : ""}
        </Text>
        <Text style={{ color: "gray" }}>{breeder.location}</Text>
      </View>
      <View style={{ position: "absolute", top: 8, right: 8 }}>
        <HeartButton />
      </View>
    </View>
  );
}
