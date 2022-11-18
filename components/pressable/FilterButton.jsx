import React, { useState } from "react";
import { ButtonGroup, Button, Icon } from "@rneui/themed";
import { Text, StyleSheet, View } from "react-native";

// reference: https://reactnativeelements.com/docs/components/buttongroup
export function FilterButton() {
  return (
    <View style={{ width: 60, height: 40, top: 4 }}>
      {/* <Button title="↓↑" titleStyle={{ fontSize: 16 }} /> */}
      <Icon name="setting" type="antdesign" color="blue" />
    </View>
  );
}
