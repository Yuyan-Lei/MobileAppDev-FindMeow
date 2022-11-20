import { EvilIcons, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export function LocationText({ textStyle, locationIconColor, children }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ position: "relative", top: 3 }}>
        <Ionicons
          name="location-outline"
          color={locationIconColor || "#F59156"}
          size={8}
        />
      </View>
      <Text style={[{ fontSize: 12, color: "gray" }, textStyle]}>
        {" "}
        {children}
      </Text>
    </View>
  );
}
