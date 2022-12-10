import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import CachedImage from "react-native-expo-cached-image";
import { getCats } from "../../firebaseUtils/cat";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { userLikeACattery, userUnLikeACattery } from "../../firebaseUtils/user";
import { CatCard } from "../cards/CatCard";
import { HeartButton_InfoPage } from "../pressable/HeartButton_InfoPage";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";
import CatInformation from "./CatInformation";
import PostNewCatScreen from "./PostNewCatScreen";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

function MainScreen({ route, navigation }) {
  const { height, width } = useWindowDimensions();
  const [likeCatteries, setLikeCatteries] = useState([]);
  const [cats, setCats] = useState([]);
  const [catsListComponent, setCatsListComponent] = useState([]);
  const cattery = route.params.cattery;
  const catteryShortAddress =
    cattery.address.split(", ")[1] + ", " + cattery.address.split(", ")[2];
  const catteryFullAddress =
    cattery.address.split(", ")[0] +
    ", " +
    cattery.address.split(", ")[1] +
    ", " +
    cattery.address.split(", ")[2];

  const [likeCats, setLikeCats] = useState([]);

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
    const docRef = doc(db, "Users", cattery.email || cattery.id);
    const unSubscribe = onSnapshot(docRef, (snapshot) => {
      getCats(snapshot.data().cats).then((cats) => setCats(cats));
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

  const [allCatteries, setAllCatteries] = useState([]);

  /* renew allCatteries */
  useEffect(() => {
    const allCatteryQuery = query(
      collection(db, "Users"),
      where("isCattery", "==", true)
    );
    const unsubscribeCattery = onSnapshot(
      allCatteryQuery,
      (catterySnapShot) => {
        const allCatteries = catterySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            email: doc.id,
            ...doc.data(),
          };
        });
        setAllCatteries(allCatteries);
      }
    );

    return () => {
      unsubscribeCattery();
    };
  }, []);

  useEffect(() => {
    let catsList = [];
    const allCatItems = cats.map((cat) => buildCatItem(cat));

    for (let i = 0; i < cats.length; i += 2) {
      catsList.push(
        <View style={{ flexDirection: "row" }} key={i}>
          <CatCard
            cat={allCatItems[i]}
            navigation={navigation}
            hideLocation
            showBreed
            userLikedCats={likeCats}
            catteryDoc={allCatteries.find(
              (cattery) =>
                cattery.email && cattery.email === allCatItems[i].catteryEmail
            )}
          />
          {i < cats.length - 1 && (
            <CatCard
              cat={allCatItems[i + 1]}
              navigation={navigation}
              hideLocation
              showBreed
              userLikedCats={likeCats}
              catteryDoc={allCatteries.find(
                (cattery) =>
                  cattery.email &&
                  cattery.email === allCatItems[i + 1].catteryEmail
              )}
            />
          )}
        </View>
      );
    }
    setCatsListComponent(catsList);
  }, [cats, likeCats, allCatteries]);

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

  const args = (cattery) => {
    return {
      number: cattery.phoneNumber,
      prompt: false,
      skipCanOpen: true,
    };
  };

  const callNumber = (phone) => {
    console.log("callNumber ----> ", phone);
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <View
            style={{
              height: width * 0.7,
              backgroundColor: Colors.gray,
            }}
          >
            {cattery.picture && (
              <CachedImage
                source={{ uri: cattery.picture }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </View>
        </View>

        {/* Top left button - back */}
        <View style={styles.backButtonView}>
          <Pressable
            onPress={navigation.goBack}
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

        <View style={styles.catteryDetailView}>
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
          <View style={styles.infoView}>
            <Text style={styles.infoTitle}>About</Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.infoSubTitle}>Phone : </Text>
              <Pressable onPress={() => callNumber(cattery.phoneNumber)}>
                <Text style={{ fontFamily: FontFamily.regular }}>
                  {cattery.phoneNumber}
                </Text>
              </Pressable>
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
              <Text style={[styles.infoSubTitle]}>Address : </Text>
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

      {/* floating components */}
      <View style={styles.floatingView}>
        <HeartButton_InfoPage
          isLiked={likeCatteries.includes(cattery.email)}
          onPress={onClickLikeButton}
        />
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
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
      <Stack.Screen name="PostNewCatScreen" component={PostNewCatScreen} />
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
  backButtonView: {
    position: "absolute",
    top: 46,
    left: 12,
    padding: 5,
    height: 35,
    width: 35,
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
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  nameAndAddressView: {
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
  },
  catteryDetailView: {
    margin: 32,
    top: -80,
    marginBottom: 32 - 80,
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
});
