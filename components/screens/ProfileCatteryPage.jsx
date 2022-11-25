import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, doc, documentId, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { getCats } from "../../firebaseUtils/cat";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { CatCard } from "../cards/CatCard";
import { rootStackNavigateBack } from "../RootNavigation";
import { LocationText } from "../texts/LocationText";
import CatteryProfileScreen from "./CatteryProfileScreen";


export default function ProfileCatteryPage({ route, navigation }) {
  const { height, width } = useWindowDimensions();
  const [cats, setCats] = useState([]);
  const [cattery, setCattery] = useState(null);
  const [catteryShortAddress, setCatteryShortAddress] = useState("");
  const [catteryFullAddress, setCatteryFullAddress] = useState("");
  useEffect(() => {
    const docRef = doc(db, "Users", getCurrentUserEmail());
    const unSubscribe = onSnapshot(docRef, (snapshot) => {
      setCattery(snapshot.data());
      setCatteryShortAddress(snapshot.data().address.split(", ")[1] + ", " + snapshot.data().address.split(", ")[2]);
      setCatteryFullAddress(snapshot.data().address.split(", ")[0] + ", " + snapshot.data().address.split(", ")[1] + ", " + snapshot.data().address.split(", ")[2]);
      getCats(snapshot.data().cats).then((cats) => setCats(cats));
    });

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if (!cattery || cattery.cats.length === 0) {
      return;
    }
    const q = query(collection(db, "Cats"), where(documentId(), "in", cattery.cats));
    const unSubscribe = onSnapshot(q, (snapshot) => {
      setCats(snapshot.docs.map((entry) => { return { id: entry.id, ...entry.data() } }));
    });

    return () => unSubscribe();
  }, []);


  const buildCatItem = (cat) => {
    const birthday = new Date(cat.Birthday);
    const now = new Date();
    const age =
      now.getMonth() -
      birthday.getMonth() +
      12 * (now.getFullYear() - birthday.getFullYear());
    return {
      id: cat.id,
      name: cat.Name,
      month: age,
      sex: cat.Gender,
      price: cat.Price,
      cattery: cat.Cattery,
      photo: cat.Picture,
    }
  };

  const onUpdateCattery = () => {
    navigation.navigate("UpdateCatteryPage", { cattery });
  };

  function MainScreen({ route, navigation }) {
    return (cattery ? (
      <View style={{ backgroundColor: "rgb(250,250,250)" }}>
        <View>
          <View style={{ height: width * 0.7, backgroundColor: "gray" }}>
            {cattery.picture &&
              <Image source={{ uri: cattery.picture }} style={{ width: "100%", height: "100%" }} />}
          </View>
        </View>

        {/* Top left - back button */}
        <View style={{ position: "absolute", top: 48, left: 12 }}>
          <View>
            <Pressable onPress={rootStackNavigateBack}>
              <Feather name="arrow-left-circle" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        {/* Top right - update cattery button */}
        <View style={{ position: "absolute", top: 48, right: 12 }}>
          <View>
            <Pressable onPress={onUpdateCattery}>
              <Feather name="edit" size={24} color="black" />
            </Pressable>
          </View>
        </View>


        <View style={{ margin: 32, top: -80, marginBottom: 32 - 80 }}>
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
              renderItem={({ item, index }) =>
                <CatCard
                  cat={buildCatItem(item)}
                  navigation={navigation} />}
              numColumns={2}
            // ListFooterComponent={<View style={{ height: 60 }} />}
            />
          </View>

        </View>
      </View>)
      : <Text>Loading</Text>)
  };

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="CatteryProfile" component={CatteryProfileScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  catteryName: {
    color: "#F59156",
    fontWeight: "800",
    fontSize: 24,
  },
  infoTitle: {
    color: "#F59156",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  infoSubTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
  }
});