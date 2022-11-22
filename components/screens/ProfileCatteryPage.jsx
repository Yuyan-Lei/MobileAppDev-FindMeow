import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import { useWindowDimensions } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { LocationText } from "../texts/LocationText";
import { rootStackNavigateBack } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { getUserData } from "../../firebaseUtils/user";

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

export default function ProfileCatteryPage() {
  const { height, width } = useWindowDimensions();
  const [user, setUser] = useState(null);
  getUserData().then(user => setUser(user));
  const majorPage = user ? (<View>
    <View>
        <View style={{ height: width / 2, backgroundColor: "gray" }}></View>
      </View>

      <View style={{ position: "absolute", top: 48, left: 12 }}>
        <View style={{ backgroundColor: "gray", opacity: 0.5 }}>
          <Pressable onPress={rootStackNavigateBack}>
            <Feather name="arrow-left-circle" size={24} color="black" />
          </Pressable>
        </View>
      </View>

      <View style={{ margin: 32, top: -80 }}>
        {/* buggy codes start */}
        <View
          style={{
            alignItems: "center",
            backgroundColor: "white",
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "orange", fontWeight: "700", fontSize: 24 }}>
            {user.catteryName}
          </Text>
          <View style={{ padding: 4 }}>
            <LocationText>{cattery.location}</LocationText>
          </View>
        </View>

        <View style={{ height: 24 }} />

        <View
          style={{ padding: 24, backgroundColor: "white", borderRadius: 12 }}
        >
          <Text style={{ color: "orange", fontWeight: "500" }}>About</Text>
          <Text></Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "500", color: Colors.black }}>
              Phone:{" "}
            </Text>
            <Text>{user.phoneNumber}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "500", color: Colors.black }}>
              Website:{" "}
            </Text>
            <Text>{user.website}</Text>
          </View>
        </View>

        <View style={{ height: 24 }} />

        {/* buggy codes end */}

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
            ListFooterComponent={<View style={{ height: 60 }} />}
          />
        </View>
      </View>

      {/* floating components */}
      <View style={{ position: "absolute", top: 40, right: 32 }}>
        <HeartButton />
      </View>
  </View>) : <Text>Loading</Text>;
  return (
    <View style={{ backgroundColor: "rgb(250,250,250)" }}>
      {majorPage}
    </View>
  );
}
