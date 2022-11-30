import { Feather, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  collection,
  documentId,
  onSnapshot,
  query,
  where,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { db } from "../../firebaseUtils/firebase-setup";
import { userLikeACattery, userUnLikeACattery } from "../../firebaseUtils/user";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { CatCard } from "../cards/CatCard";
import { HeartButton } from "../pressable/HeartButton";
import { MessageButton } from "../pressable/MessageButton";
import { PhoneButton } from "../pressable/PhoneButton";
import { LocationText } from "../texts/LocationText";
import CatInformation from "./CatInformation";
import { Colors } from "../styles/Colors";
import { HeartButton_InfoPage } from "../pressable/HeartButton_InfoPage";
import call from "react-native-phone-call";

function MainScreen({ route, navigation }) {
  const { height, width } = useWindowDimensions();
  const [likeCatteries, setLikeCatteries] = useState([]);
  const [cats, setCats] = useState([]);
  const cattery = route.params.cattery;
  const catteryShortAddress =
    cattery.address.split(", ")[1] + ", " + cattery.address.split(", ")[2];
  const catteryFullAddress =
    cattery.address.split(", ")[0] +
    ", " +
    cattery.address.split(", ")[1] +
    ", " +
    cattery.address.split(", ")[2];

  useEffect(() => {
    if (cattery.cats.length === 0) {
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

  useEffect(() => {
    const unSubscribe = onSnapshot(
      doc(db, "Users", getCurrentUserEmail()),
      (snapshot) => {
        const likeCatteries = snapshot.data().likeCatteries || [];
        setLikeCatteries(likeCatteries);
      }
    );

    return () => unSubscribe();
  }, []);

  const onClickLikeButton = () => {
    if (!likeCatteries.includes(cattery.email)) {
      userLikeACattery(cattery.email);
    } else {
      userUnLikeACattery(cattery.email);
    }
  };

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
      breed: cat.Breed,
    };
  };

  const args = {
    number: "123-456-7890",
    prompt: false,
    skipCanOpen: true,
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View
            style={{
              height: width * 0.7,
              backgroundColor: "gray",
            }}
          >
            {cattery.picture && (
              <Image
                source={{ uri: cattery.picture }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
        </View>

        {/* Top left button - back */}
        <View style={styles.backButtonView}>
          <View>
            <Pressable onPress={navigation.goBack}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </Pressable>
          </View>
        </View>

        <View style={styles.catteryDetailView}>
          {/* cattery name & address */}
          <View style={styles.nameAndAddressView}>
            <Text style={styles.catteryName}>{cattery.catteryName}</Text>

            <View style={{ padding: 4 }}>
              <LocationText>{catteryShortAddress}</LocationText>
            </View>
          </View>

          <View style={{ height: 24 }} />

          {/* cattery info: phone number, website, address */}
          <View style={styles.infoView}>
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
              <Pressable onPress={() => call(args).catch(console.error)}>
                <Text style={{ fontFamily: "PoppinsRegular" }}>
                  {cattery.phoneNumber}
                </Text>
              </Pressable>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoSubTitle}>Website : </Text>
              <Text style={{ fontFamily: "PoppinsRegular" }}>
                {cattery.website}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoSubTitle}>Address : </Text>
              <Text style={{ fontFamily: "PoppinsRegular" }}>
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

      {/* floating components */}
      <View style={styles.floatingView}>
        <HeartButton_InfoPage
          isLiked={likeCatteries.includes(cattery.email)}
          onPress={onClickLikeButton}
        />
      </View>
    </View>
  );
}

export default function CatteryProfileScreen({ route, navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainScreen"
    >
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        initialParams={{ cattery: route.params.cattery }}
      />
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
  backButtonView: {
    position: "absolute",
    top: 50,
    left: 12,
    padding: 5,
    height: 35,
    width: 35,
    backgroundColor: Colors.arrowBackground,
    borderRadius: 13,
    marginLeft: 10,
  },
  floatingView: {
    position: "absolute",
    top: 50,
    right: 22,
  },
  infoView: {
    padding: 24,
    backgroundColor: "white",
    borderRadius: 12,
  },
  nameAndAddressView: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
  },
  catteryDetailView: {
    margin: 32,
    top: -80,
    marginBottom: 32 - 80,
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
  },
});
