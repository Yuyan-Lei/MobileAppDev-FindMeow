import React from "react";
import { View } from "react-native";
import { TabButton } from "./pressable/TabButton";

export function TabBar({ state, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        function onPress() {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        }

        return (
          <View key={Math.random()} style={{ flex: 1 }}>
            <TabButton
              symbol={route.params.symbol}
              // title={route.name}
              isFocused={isFocused}
              onPress={onPress}
            />
          </View>
        );
      })}
    </View>
  );
}
