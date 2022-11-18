import React from "react";
import { Platform, Pressable } from "react-native";
import { colors } from "../styles/colors";

// TODO: change the color of android ripple
export function BaseButton({ children, style, ...props }) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor:
            pressed && Platform.OS !== "android"
              ? colors.darkSlateBlue2
              : colors.darkSlateBlue,
          borderRadius: 10,
        },
        style,
      ]}
      android_ripple={{ color: colors.darkBlueGray, borderless: false }}
      {...props}
    >
      {children}
    </Pressable>
  );
}
