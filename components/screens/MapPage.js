import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Pressable,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Overlay,
  OverlayComponent,
} from "react-native-maps";
import { Foundation } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import { Ionicons } from "@expo/vector-icons";
import { CatCard_map } from "../cards/CatCard_map";
import CatInformation from "./CatInformation";
import { db } from "../../firebaseUtils/firebase-setup";
import {
  calculateDistance,
  getAllCatteries,
  getUserLocation,
} from "../../firebaseUtils/user";
import { CatteryMarker } from "../pressable/CatteryMarker";

export default function MapPage({ route, navigation }) {
  const { height, width } = useWindowDimensions();
  const [showCatCard, setShowCatCard] = useState(false);
  const [data, setData] = useState([]);

  const showCatCardHandler = () => {
    setShowCatCard(!showCatCard);
  };

  function onSearchArea() {
    refreshCatData({ forceLoad: true });
  }

  function isScrollToTop(event) {
    return event.nativeEvent.contentOffset.y < -100;
  }

  function onScrollToTop() {
    refreshCatData({ forceLoad: true });
  }

  const [refreshCatDataLock, setRefreshCatDataLock] = useState(false);

  async function refreshCatData({ forceLoad = false } = {}) {
    if (!forceLoad && refreshCatDataLock) return;
    setRefreshCatDataLock(true);

    // prevent running it too much in a short time
    const currentTimeInMill = new Date().getTime();
    if (!forceLoad && currentTimeInMill - lastTimeRefreshCatData < 5000) {
      return;
    }
    setLastTimeRefreshCatData(currentTimeInMill);

    let location = await getUserLocation();
    const allCatteries = await getAllCatteries();
    try {
      const q = query(collection(db, "Cats"), ...constraints);

      const catSnapShot = await getDocs(q);

      const dataBeforeSorting = catSnapShot.docs.map((catDoc) => {
        const birthday = new Date(catDoc.data().Birthday);
        const now = new Date();
        const cattery = allCatteries.find(
          (ca) => ca.email === catDoc.data().Cattery
        );
        // if cattery doesn't have location, use 9999 to make cat in the bottom.
        const distance =
          cattery.geoLocation && location
            ? calculateDistance(location, cattery.geoLocation)
            : 9999;
        let age =
          now.getMonth() -
          birthday.getMonth() +
          12 * (now.getFullYear() - birthday.getFullYear());
        // age cannot be negative
        if (age === undefined || isNaN(age) || age < 0) {
          age = 0;
        }

        return {
          id: catDoc.id,
          name: catDoc.data().Breed,
          sex: catDoc.data().Gender,
          price: catDoc.data().Price,
          month: age,
          photo: catDoc.data().Picture,
          cattery: catDoc.data().Cattery,
          distance,
          uploadTime: catDoc.data().UploadTime,
          tags: catDoc.data().Tags,
        };
      });
      setData(dataBeforeSorting.sort((d1, d2) => d1.distance - d2.distance));
    } finally {
      setRefreshCatDataLock(false);
    }
  }

  useEffect(() => {
    refreshCatData({ forceLoad: true });
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.3387,
          longitude: -121.8853,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* <Marker
          coordinate={{ latitude: 37.3307, longitude: -121.8853 }}
          onPress={showCatCardHandler}
        > */}
        {/* <View> */}
        {/* <Pressable> */}
        {/* <Foundation name="marker" size={40} color={Colors.orangeText} /> */}
        {/* </Pressable> */}
        {/* </View> */}
        {/* <Callout>
            <View style={{ width: 100, height: 100, backgroundColor: "white" }}>
              <Text>Hi Hi hi</Text>
            </View>
          </Callout> */}
        {/* </Marker> */}

        <CatteryMarker />
      </MapView>

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          width: width,
          height: 90,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
        }}
      >
        <View style={{ top: 40, position: "absolute" }}>
          <Pressable onPress={navigation.goBack} style={{ marginLeft: 15 }}>
            <Ionicons
              name="chevron-back"
              size={24}
              color="black"
              style={{ top: 12 }}
            />
          </Pressable>
          <View
            style={{
              alignItems: "center",
              width: width,
            }}
          >
            <Text
              style={{ fontFamily: "PoppinsSemiBold", fontSize: 20, top: -15 }}
            >
              Location
            </Text>
          </View>
        </View>
      </View>

      {/* Scrollable card */}
      {/* <ScrollView
        horizontal={true}
        style={{
          flexDirection: "row",
          height: 100,
          backgroundColor: "transparent",
          position: "absolute",
          top: height - 170,
        }}
      > */}
      {/* Add space to the beginning */}
      {/* <View style={{ width: 20 }}></View> */}

      {/* Cat card list here */}
      {/* <CatCard_map></CatCard_map> */}

      {/* <CatCard_map></CatCard_map>
      </ScrollView> */}

      {/* Flatlist card */}
      <View
        style={{
          height: 80,
          backgroundColor: "transparent",
          position: "absolute",
          top: height - 170,
          left: 30,
        }}
      >
        {/* <View style={{ width: 200 }}></View> */}
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CatCard_map cat={item} navigation={navigation} />
          )}
          horizontal
          onScrollEndDrag={(event) => {
            if (isScrollToTop(event)) {
              onScrollToTop();
            }
          }}
        />
        {/* <CatCard_map></CatCard_map> */}
      </View>

      {/* Trigger button - refresh if location changed */}
      <View
        style={{
          height: 40,
          backgroundColor: "white",
          position: "absolute",
          top: 100,
          left: (width - 140) / 2,
          borderRadius: 100,
          width: 140,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => onSearchArea()}>
          <Text
            style={{
              fontFamily: "Poppins",
              color: Colors.orangeText,
              paddingTop: 9,
            }}
          >
            Search this area
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
