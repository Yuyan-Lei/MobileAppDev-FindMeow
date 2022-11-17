import React, { useState } from "react";
import { ButtonGroup, Button } from "@rneui/themed";
import { Text, StyleSheet, View } from "react-native";

// reference: https://reactnativeelements.com/docs/components/buttongroup
export function FilterButton() {
  return (
    <View style={{ width: 40, height: 32 }}>
      <Button title="↓↑" titleStyle={{ fontSize: 16 }} />
    </View>
  );
}
