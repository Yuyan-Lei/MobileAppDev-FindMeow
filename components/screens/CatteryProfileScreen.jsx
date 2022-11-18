import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import { useWindowDimensions } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { LocationText } from "../texts/LocationText";

const cats = [
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

const cattery = {
  cats,
  name: "Angel Girls",
  location: "Sunnyvale, CA",
};

export default function CatteryProfileScreen() {
  const { height, width } = useWindowDimensions();
  return (
    <View style={{ backgroundColor: "rgb(250,250,250)" }}>
      <View>
        <View style={{ height: width / 2, backgroundColor: "gray" }}></View>
      </View>

      <View style={{ margin: 32, top: -80 }}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "white",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "orange", fontWeight: "700", fontSize: 24 }}>
            {cattery.name}
          </Text>
          <View style={{ padding: 4 }}>
            <LocationText>{cattery.location}</LocationText>
          </View>
        </View>

        <View style={{ margin: 12 }} />

        <View
          style={{ padding: 24, backgroundColor: "white", borderRadius: 12 }}
        >
          <Text style={{ color: "orange", fontWeight: "500" }}>About</Text>
          <Text></Text>
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

        <View
          style={{ padding: 16, backgroundColor: "white", borderRadius: 12 }}
        >
          <View style={{ margin: 8 }}>
            <Text style={{ color: "orange", fontWeight: "500" }}>
              Available Kittens
            </Text>
          </View>
          <FlatList
            data={cattery.cats}
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
