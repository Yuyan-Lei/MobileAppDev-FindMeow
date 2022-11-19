import React, { useState } from "react";
import { ButtonGroup, Button, Icon } from "@rneui/themed";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { BaseButton } from "./BaseButton";
import { AntDesign } from "@expo/vector-icons";

// reference: https://reactnativeelements.com/docs/components/buttongroup
export function FilterButton({ onPress }) {
  return (
    <View style={{ width: 60, height: 40, top: 4 }}>
      {/* <Button title="↓↑" titleStyle={{ fontSize: 16 }} /> */}
      <Pressable onPress={onPress}>
        <AntDesign name="filter" size={24} color="black" />
      </Pressable>
    </View>
  );
}
