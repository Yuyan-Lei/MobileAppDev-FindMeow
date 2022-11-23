import { EvilIcons, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export function LocationText({ textStyle, locationIconColor, children }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ position: "relative", top: 5 }}>
        <Ionicons
          name="location-sharp"
          color={locationIconColor || "#F59156"}
          size={12}
        />
      </View>
      <Text style={[{ 
        fontSize: 12, 
        color: "gray",
        marginTop: 6,
        }, textStyle]}>
        {" "}
        {children}
      </Text>
    </View>
  );
}
