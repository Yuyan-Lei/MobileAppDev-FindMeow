import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../styles/Colors";

export function LocationText({ textStyle, locationIconColor, viewPosition,children }) {
  return (
    <View style={[{ flexDirection: "row" }, viewPosition]}>
      <View style={{ position: "relative", top: 5 }}>
        <Ionicons
          name="location-sharp"
          color={locationIconColor || Colors.orangeText}
          size={12}
        />
      </View>
      <Text
        style={[
          {
            fontSize: 12,
            color: "gray",
            marginTop: 4,
            fontFamily: "Poppins",
          },
          textStyle,
        ]}
      >
        {" "}
        {children}
      </Text>
    </View>
  );
}
