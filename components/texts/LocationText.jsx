import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export function LocationText({
  textStyle,
  locationIconColor,
  viewPosition,
  children,
}) {
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
            fontSize: FontSizes.smallTag,
            color: Colors.gray,
            marginTop: 4,
            fontFamily: FontFamily.normal,
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
