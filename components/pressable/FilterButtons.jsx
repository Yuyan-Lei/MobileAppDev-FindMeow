import React, { useState } from "react";
import { ButtonGroup, Button } from "@rneui/themed";
import { Text, StyleSheet, View } from "react-native";

// reference: https://reactnativeelements.com/docs/components/buttongroup
export function FilterButtons({ selectedIndex, setSelectedIndex }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 12,
      }}
    >
      <View style={{ flex: 1 }}>
        <ButtonGroup
          buttons={["Latest Post", "Nearby", "Lowest Price"]}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={{ height: 40 }}
        />
      </View>
      <View style={{ width: 32, height: 32 }}>
        <Button title="↓↑" titleStyle={{ fontSize: 16 }} />
      </View>
    </View>
  );
}
