import React from "react";
import { Text } from "react-native";

export function TitleText({ children }) {
  return <Text style={{ textAlign: "center", fontSize: 20 }}>{children}</Text>;
}
