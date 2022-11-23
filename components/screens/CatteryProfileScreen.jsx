import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View, Image, StyleSheet } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import { useWindowDimensions } from "react-native";
import { HeartButton } from "../pressable/HeartButton";
import { LocationText } from "../texts/LocationText";
import { rootStackNavigateBack } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { getCats } from "../../firebaseUtils/cat";

const mockCats = [
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

// const cattery = {
//   cats,
//   name: "Angel Girls",
//   location: "Sunnyvale, CA",
// };

export default function CatteryProfileScreen({ route }) {
  const { height, width } = useWindowDimensions();
  const [ cats, setCats ] = useState([]);
  const cattery = route.params.cattery.catteryData;
  const catteryShortAddress = cattery.address.split(", ")[1] + ", " + cattery.address.split(", ")[2];
  const catteryFullAddress = cattery.address.split(", ")[0] + ", " + cattery.address.split(", ")[1] + ", " + cattery.address.split(", ")[2];
  if (cattery.cats.length > 0) {
    getCats(cattery.cats).then(cats => setCats(cats));
  }

  const buildCatItem = (cat) => {
    const birthday = new Date(cat.Birthday);
    const now = new Date();
    const age =
      now.getMonth() -
      birthday.getMonth() +
      12 * (now.getFullYear() - birthday.getFullYear());
    return {
      name: cat.Name,
      month: age, 
      sex: cat.Gender,
      price: cat.Price,
      photo: cat.Picture,
    }};
  return (
    <View style={{ backgroundColor: "rgb(250,250,250)" }}>
      <View>
    <View>
      <View style={{ height: width * 0.7, backgroundColor: "gray" }}>
        {cattery.picture &&
          <Image source={{ uri: cattery.picture }} style={{ width: "100%", height: "100%" }} />}
      </View>
    </View>

    <View style={{ position: "absolute", top: 48, left: 12 }}>
      <View>
        <Pressable onPress={rootStackNavigateBack}>
          <Feather name="arrow-left-circle" size={24} color="black" />
        </Pressable>
      </View>
    </View>

    <View style={{ margin: 32, top: -80 }}>
      
      {/* cattery name & address */}
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text style={styles.catteryName}>
          {cattery.catteryName}
        </Text>

        <View style={{ padding: 4 }}>
          <LocationText>{catteryShortAddress}</LocationText>
        </View>
      </View>

      <View style={{ height: 24 }} />
      

      {/* cattery info: phone number, website, address */}
      <View
        style={{ padding: 24, backgroundColor: "white", borderRadius: 12 }}
      >
        <Text style={styles.infoTitle}>
          About
        </Text>
        
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.infoSubTitle}>
            Phone:{" "}
          </Text>
          <Text>{cattery.phoneNumber}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.infoSubTitle}>
            Website:{" "}
          </Text>
          <Text>{cattery.website}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.infoSubTitle}>
            Address:{" "}
          </Text>
          <Text>{catteryFullAddress}</Text>
        </View>
      </View>

      <View style={{ height: 24 }} />


      {/* available kittens */}
      <View
        style={{ padding: 16, backgroundColor: "white", borderRadius: 12 }}
      >
        <View style={{ margin: 8 }}>
          <Text style={styles.infoTitle}>
            Available Kittens
          </Text>
        </View>
        <FlatList
          data={cats}
          renderItem={({ item, index }) => <CatCard cat={buildCatItem(item)} />}
          numColumns={2}
          ListFooterComponent={<View style={{ height: 60 }} />}
        />
      </View>

    </View>
  </View>

      {/* floating components */}
      <View style={{ position: "absolute", top: 40, right: 32 }}>
        <HeartButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  catteryName:{
    color: "#F59156", 
    fontWeight: "800", 
    fontSize: 24,
  },
  infoTitle:{
    color: "#F59156", 
    fontSize:18,
    fontWeight: "600",
    marginBottom: 10,
  },
  infoSubTitle:{
    fontWeight: "600", 
    fontSize: 14,
    marginBottom: 8,
  },
  infoText :{
    fontSize: 14,
  }
});
