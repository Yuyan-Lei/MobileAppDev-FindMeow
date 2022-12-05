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
import CatInformation from "../screens/CatInformation";
import { db } from "../../firebaseUtils/firebase-setup";
import {
  calculateDistance,
  getAllCatteries,
  getUserLocation,
  getCattery,
  userLikeACat,
  userUnLikeACat,
} from "../../firebaseUtils/user";

export function CatteryMarker({
  cat,
  navigation,
  showCatList,
  setShowCatList,
}) {
  const { height, width } = useWindowDimensions();
  const [cattery, setCattery] = useState(null);
  const [likeCats, setLikeCats] = useState([]);

  useEffect(() => {
    if (cat.cattery) {
      getCattery(cat.cattery).then((cattery) => setCattery(cattery));
    }
  }, [cat]);

  //   useEffect(() => {
  //     const unSubscribe = onSnapshot(
  //       doc(db, "Users", getCurrentUserEmail()),
  //       (snapshot) => {
  //         const likeCats = snapshot.data().likeCats;
  //         setLikeCats(likeCats);
  //       }
  //     );

  //     return () => unSubscribe();
  //   }, []);

  const onClickLikeButton = () => {
    if (!likeCats.includes(cat.id)) {
      userLikeACat(cat.id);
    } else {
      userUnLikeACat(cat.id);
    }
  };

  const showCatCardHandler = () => {
    setShowCatList(!showCatList);
  };

  return (
    <View>
      <Marker
        coordinate={{ latitude: 37.3387, longitude: -121.8853 }}
        onPress={showCatCardHandler}
      >
        <View>
          {/* <Pressable> */}
          <Foundation name="marker" size={40} color={Colors.orangeText} />

          {/* </Pressable> */}
        </View>
        {/* <Callout>
            <View style={{ width: 100, height: 100, backgroundColor: "white" }}>
              <Text>Hi Hi hi</Text>
            </View>
          </Callout> */}
      </Marker>

      {showCatList == false ? (
        <View
          style={{
            height: 110,
            backgroundColor: "transparent",
            position: "absolute",
            top: height - 211,
            left: 30,
          }}
        >
          <FlatList
            data={cat}
            renderItem={({ item }) => (
              <CatCard_map cat={cat} navigation={navigation} />
            )}
            horizontal
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}
