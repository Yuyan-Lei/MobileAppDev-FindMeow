import { Feather, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  collection,
  doc,
  documentId,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { getCats } from "../../firebaseUtils/cat";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { CatCard } from "../cards/CatCard";
import { rootStackNavigateBack } from "../RootNavigation";
import { LocationText } from "../texts/LocationText";
import CatteryProfileScreen from "./CatteryProfileScreen";
import { Colors } from "../styles/Colors";
import CatInformation from "./CatInformation";
import { MessageButton } from "../pressable/MessageButton";
import { PhoneButton } from "../pressable/PhoneButton";

function MainScreen({ route, navigation }) {
  const { height, width } = useWindowDimensions();
  const [cats, setCats] = useState([]);
  const [cattery, setCattery] = useState(null);
  const [catteryShortAddress, setCatteryShortAddress] = useState("");
  const [catteryFullAddress, setCatteryFullAddress] = useState("");
  useEffect(() => {
    const docRef = doc(db, "Users", getCurrentUserEmail());
    const unSubscribe = onSnapshot(docRef, (snapshot) => {
      setCattery(snapshot.data());
      setCatteryShortAddress(
        snapshot.data().address.split(", ")[1] +
          ", " +
          snapshot.data().address.split(", ")[2]
      );
      setCatteryFullAddress(
        snapshot.data().address.split(", ")[0] +
          ", " +
          snapshot.data().address.split(", ")[1] +
          ", " +
          snapshot.data().address.split(", ")[2]
      );
      getCats(snapshot.data().cats).then((cats) => setCats(cats));
    });

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if (!cattery || cattery.cats.length === 0) {
      return;
    }
    const q = query(
      collection(db, "Cats"),
      where(documentId(), "in", cattery.cats)
    );
    const unSubscribe = onSnapshot(q, (snapshot) => {
      setCats(
        snapshot.docs.map((entry) => {
          return { id: entry.id, ...entry.data() };
        })
      );
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
      breed: cat.breed,
    };
  };

  const onUpdateCattery = () => {
    navigation.navigate("UpdateCatteryPage", { cattery });
  };

  return cattery ? (
    <View style={styles.container}>
      <View>
        <View>
          <View style={{ height: width * 0.7, backgroundColor: "gray" }}>
            {cattery.picture && (
              <Image
                source={{ uri: cattery.picture }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
        </View>

        {/* Top left - back button */}
        <View style={styles.backButtonView}>
          <View>
            <Pressable onPress={rootStackNavigateBack}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </Pressable>
          </View>
        </View>

        {/* Top right - update cattery button */}
        <View style={styles.updateButtonView}>
          <View>
            <Pressable onPress={onUpdateCattery}>
              <Feather name="edit" size={18} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={styles.catterDetailView}>
          {/* cattery name & address */}
          <View style={styles.nameAndAddressView}>
            <Text style={styles.catteryName}>{cattery.catteryName}</Text>

            <View style={{ padding: 4 }}>
              <LocationText>{catteryShortAddress}</LocationText>
            </View>
          </View>

          <View style={{ height: 24 }} />

          {/* cattery info: phone number, website, address */}
          <View
            style={{ padding: 24, backgroundColor: "white", borderRadius: 12 }}
          >
            <Text style={styles.infoTitle}>About</Text>
            {/* <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                position: "absolute",
                marginTop: 20,
              }}
            >
              <PhoneButton />
              <MessageButton />
            </View> */}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoSubTitle}>Phone : </Text>
              <Text style={{ fontFamily: "Poppins" }}>
                {cattery.phoneNumber}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoSubTitle}>Website : </Text>
              <Text style={{ fontFamily: "Poppins" }}>{cattery.website}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoSubTitle}>Address : </Text>
              <Text style={{ fontFamily: "Poppins" }}>
                {catteryFullAddress}
              </Text>
            </View>
          </View>

          <View style={{ height: 24 }} />

          {/* available kittens */}
          <View style={styles.kittensView}>
            <View style={{ margin: 8 }}>
              <Text style={styles.infoTitle}>Available Kittens</Text>
            </View>
            <FlatList
              data={cats}
              renderItem={({ item, index }) => (
                <CatCard
                  cat={buildCatItem(item)}
                  navigation={navigation}
                  hideLocation
                  showBreed
                />
              )}
              numColumns={2}
              ListFooterComponent={<View style={{ height: 2250 }} />}
            />
          </View>
        </View>
      </View>
    </View>
  ) : (
    <Text>Loading</Text>
  );
}

export default function ProfileCatteryPage({ route, navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="CatInformation" component={CatInformation} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  kittensView: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  nameAndAddressView: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
  },
  catterDetailView: {
    margin: 32,
    top: -80,
    marginBottom: 32 - 80,
  },
  updateButtonView: {
    position: "absolute",
    top: 50,
    right: 22,
    width: 35,
    height: 35,
    backgroundColor: Colors.arrowBackground,
    alignItems: "center",
    borderRadius: 13,
    paddingTop: 8,
  },
  backButtonView: {
    position: "absolute",
    top: 50,
    left: 22,
    padding: 5,
    height: 35,
    width: 35,
    backgroundColor: Colors.arrowBackground,
    borderRadius: 13,
  },
  container: {
    backgroundColor: "rgb(250,250,250)",
  },
  catteryName: {
    color: Colors.orangeText,
    fontWeight: "800",
    fontSize: 24,
    fontFamily: "PoppinsBold",
  },
  infoTitle: {
    color: Colors.orangeText,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: "PoppinsSemiBold",
  },
  infoSubTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "PoppinsSemiBold",
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Poppins",
  },
});
