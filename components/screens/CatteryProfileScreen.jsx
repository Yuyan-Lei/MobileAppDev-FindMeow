import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import { useWindowDimensions } from "react-native";
import { HeartButton } from "../pressable/HeartButton";

const mockData = [
  { name: "aaa", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "bbb", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
  { name: "aaa", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "bbb", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
  { name: "aaa", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "bbb", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
  { name: "aaa", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "bbb", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
  { name: "aaa", month: 3, sex: "Male", location: "San Jose", price: 1000 },
  { name: "bbb", month: 5, sex: "Female", location: "Palo Alto", price: 1500 },
];

export default function CatteryProfileScreen() {
  const { height, width } = useWindowDimensions();
  return (
    <View>
      <View>
        <View style={{ height: width / 2, backgroundColor: "gray" }}></View>
      </View>

      <View style={{ margin: 32 }}>
        <View style={{ margin: 16 }}>
          <Text style={{ color: "orange", fontWeight: "500" }}>About</Text>
          <br></br>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "500" }}>Phone: </Text>
            <Text>111</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "500" }}>Website: </Text>
            <Text>http://xxx</Text>
          </View>
        </View>

        <View style={{ margin: 12 }} />

        <View>
          <View style={{ margin: 16 }}>
            <Text style={{ color: "orange", fontWeight: "500" }}>
              Available Kittens
            </Text>
          </View>
          <FlatList
            data={mockData}
            renderItem={({ item, index }) => <CatCard cat={item} />}
            numColumns={2}
          />
        </View>
      </View>

      {/* floating components */}
      <View style={{ position: "absolute", top: 40, right: 32 }}>
        <HeartButton />
      </View>
    </View>
  );
}
