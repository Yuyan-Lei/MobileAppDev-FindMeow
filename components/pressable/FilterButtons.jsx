import { ButtonGroup } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

// reference: https://reactnativeelements.com/docs/components/buttongroup
export function FilterButtons({ selectedIndex, setSelectedIndex, buttons }) {
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
          buttons={buttons}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            setSelectedIndex(value);
          }}
          containerStyle={{ height: 40, shadowRadius: 10, borderRadius: 10 }}
          selectedButtonStyle={{
            backgroundColor: "#FFB801",
          }}
          textStyle={{ fontSize: 14, fontFamily: "Poppins" }}
        />
      </View>
      {/* <View style={{ width: 32, height: 32 }}>
        <Button title="↓↑" titleStyle={{ fontSize: 16 }} />
      </View> */}
    </View>
  );
}
