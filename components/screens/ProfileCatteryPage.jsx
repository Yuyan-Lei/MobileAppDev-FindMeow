import { Feather, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  ScrollView,
  View,
} from "react-native";
import CachedImage from "react-native-expo-cached-image";
import { getCats } from "../../firebaseUtils/cat";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { CatCard } from "../cards/CatCard";
import { rootStackNavigateBack } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";
import CatInformation from "./CatInformation";
import PostNewCatScreen from "./PostNewCatScreen";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";
import UpdateCatteryPage from "./UpdateCatteryPage";

function MainScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [cats, setCats] = useState([]);
  const [cattery, setCattery] = useState(null);
  const [catteryShortAddress, setCatteryShortAddress] = useState("");
  const [catteryFullAddress, setCatteryFullAddress] = useState("");
  const [catsListComponent, setCatsListComponent] = useState([]);
  const [likeCats, setLikeCats] = useState([]);

  useEffect(() => {
    const docRef = doc(db, "Users", getCurrentUserEmail());
    const unSubscribe = onSnapshot(docRef, (snapshot) => {
      setCattery({
        id: snapshot.id,
        ...snapshot.data(),
      });
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
    const unSubscribe = onSnapshot(
      doc(db, "Users", getCurrentUserEmail()),
      (snapshot) => {
        const likeCats = snapshot.data().likeCats;
        setLikeCats(likeCats);
      }
    );

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    let catsList = [];
    for (let i = 0; i < cats.length; i += 2) {
      catsList.push(
        <View style={{ flexDirection: "row" }} key={i}>
          <CatCard
            cat={buildCatItem(cats[i])}
            navigation={navigation}
            hideLocation
            showBreed
            userLikedCats={likeCats}
            catteryDoc={cattery}
          />
          {i < cats.length - 1 && (
            <CatCard
              cat={buildCatItem(cats[i + 1])}
              navigation={navigation}
              hideLocation
              showBreed
              userLikedCats={likeCats}
              catteryDoc={cattery}
            />
          )}
        </View>
      );
    }
    setCatsListComponent(catsList);
  }, [cats]);

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

  const onUpdateCattery = () => {
    navigation.navigate("UpdateCatteryPage", { cattery });
  };

  return cattery ? (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <View style={{ height: width * 0.7, backgroundColor: Colors.gray }}>
            {cattery.picture && (
              <CachedImage
                source={{ uri: cattery.picture }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
        </View>

        {/* Top left - back button */}
        <View style={styles.backButtonView}>
          <View>
            <Pressable
              onPress={rootStackNavigateBack}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? Colors.orange
                    : Colors.arrowBackground,
                  borderRadius: 13,
                  width: 35,
                  height: 35,
                },
              ]}
            >
              <Ionicons
                name="chevron-back"
                size={FontSizes.backIcon}
                color={Colors.white}
                style={{ top: 4, left: 4 }}
              />
            </Pressable>
          </View>
        </View>

        {/* Top right - update cattery button */}
        <View style={styles.updateButtonView}>
          <View>
            <Pressable
              onPress={onUpdateCattery}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? Colors.orange
                    : Colors.arrowBackground,
                  borderRadius: 13,
                  width: 35,
                  height: 35,
                },
              ]}
            >
              <Feather
                name="edit"
                size={FontSizes.editIcon}
                color={Colors.white}
                style={{ top: 7, left: 9 }}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.catterDetailView}>
          {/* cattery name & address */}
          <View style={styles.nameAndAddressView}>
            <Text style={styles.catteryName}>{cattery.catteryName}</Text>

            <View style={{ padding: 4 }}>
              <LocationText textStyle={{ top: -1 }}>
                {catteryShortAddress}
              </LocationText>
            </View>
          </View>

          <View style={{ height: 24 }} />

          {/* cattery info: phone number, website, address */}
          <View
            style={{
              padding: 24,
              backgroundColor: Colors.white,
              borderRadius: 12,
            }}
          >
            <Text style={styles.infoTitle}>About</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoSubTitle}>Phone : </Text>
              <Text style={{ fontFamily: FontFamily.regular }}>
                {cattery.phoneNumber}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoSubTitle}>Website : </Text>
              <Text
                style={{
                  fontFamily: FontFamily.regular,
                  flex: 1,
                  flexWrap: "wrap",
                }}
              >
                {cattery.website}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoSubTitle}>Address : </Text>
              <Text
                style={{
                  fontFamily: FontFamily.regular,
                  flex: 1,
                  flexWrap: "wrap",
                }}
              >
                {catteryFullAddress}
              </Text>
            </View>
          </View>

          <View style={{ height: 24 }} />

          {/* available kittens */}
          <View style={styles.kittensView}>
            <View style={{ marginTop: 8, marginHorizontal: 8 }}>
              <Text style={styles.infoTitle}>Available Kittens</Text>
            </View>
            {catsListComponent}
          </View>
        </View>
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  ) : (
    <Text>Loading</Text>
  );
}

export default function ProfileCatteryPage() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="CatInformation" component={CatInformation} />
      <Stack.Screen name="PostNewCatScreen" component={PostNewCatScreen} />
      <Stack.Screen name="UpdateCatteryPage" component={UpdateCatteryPage} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  kittensView: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 25,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  nameAndAddressView: {
    alignItems: "center",
    backgroundColor: Colors.white,
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
    borderRadius: 13,
  },
  container: {
    backgroundColor: Colors.catInfoMainBackground,
  },
  catteryName: {
    color: Colors.orangeText,
    fontWeight: "800",
    fontSize: FontSizes.pageTitle,
    fontFamily: FontFamily.heavy,
  },
  infoTitle: {
    color: Colors.orangeText,
    fontSize: FontSizes.button,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: FontFamily.bold,
  },
  infoSubTitle: {
    fontWeight: "600",
    fontSize: FontSizes.text,
    marginBottom: 8,
    fontFamily: FontFamily.bold,
  },
  infoText: {
    fontSize: FontSizes.text,
    fontFamily: FontFamily.regular,
  },
});
