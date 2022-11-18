import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BaseButton } from "./BaseButton";
import { colors } from "../styles/colors";

export function TabButton({
  style,
  symbol,
  title,
  isFocused,
  onPress,
  ...props
}) {
  return (
    <BaseButton style={[{ borderRadius: 0 }, style]} onPress={onPress}>
      <View>
        <Text
          style={[
            {
              fontSize: 28,
            },
            isFocused ? styles.tabTextFocused : styles.tabTextUnfocused,
          ]}
        >
          {symbol}
        </Text>
        <Text
          style={isFocused ? styles.tabTextFocused : styles.tabTextUnfocused}
        >
          {title}
        </Text>
      </View>
    </BaseButton>
  );
}

const styles = StyleSheet.create({
  tabTextFocused: {
    color: colors.spanishYellow,
    textAlign: "center",
  },
  tabTextUnfocused: {
    color: colors.philippineGray,
    textAlign: "center",
  },
});
