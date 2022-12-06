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
  catsData,
  navigation,
  showCatList,
  setShowCatList,
}) {
  const { height, width } = useWindowDimensions();
  const [cattery, setCattery] = useState(null);
  const [likeCats, setLikeCats] = useState([]);

  useEffect(() => {
    if (catsData.cattery) {
      getCattery(catsData.cattery).then((cattery) => setCattery(cattery));
    }
  }, [catsData]);

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
    if (!likeCats.includes(catsData.id)) {
      userLikeACat(catsData.id);
    } else {
      userUnLikeACat(catsData.id);
    }
  };

  const showCatCardHandler = () => {
    setShowCatList(!showCatList);
  };

  return (
    <View>
      {catsData.map((cat, index) => {
        return (
          <Marker
            coordinate={{
              latitude: cat.geoLocation.lat,
              longitude: cat.geoLocation.lng,
            }}
            onPress={showCatCardHandler}
            indentifier={index + ""}
          >
            {/* <View> */}
            {/* <Pressable> */}
            <Foundation name="marker" size={40} color={Colors.orangeText} />

            {/* </Pressable> */}
            {/* </View> */}
            {/* <Callout>
            <View style={{ width: 100, height: 100, backgroundColor: "white" }}>
              <Text>Hi Hi hi</Text>
            </View>
          </Callout> */}
          </Marker>
        );
      })}

      {showCatList == false ? (
        <View style={{ width: width + 20, alignItems: "center" }}>
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
              data={catsData}
              renderItem={({ item }) => (
                <CatCard_map cat={item} navigation={navigation} />
              )}
              horizontal
            />
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}
