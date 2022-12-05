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
} from "../../firebaseUtils/user";

export function CatteryMarker({
  catsData,
  navigation,
  showCatList,
  setShowCatList,
}) {
  const { height, width } = useWindowDimensions();
  //   const [showCatCard, setShowCatCard] = useState(false);

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
        <View style={{ width: width + 20, alignItems: "center" }}>
          <View
            style={{
              height: 180,
              backgroundColor: "yellow",
              position: "absolute",
              top: height - 170,
            }}
          >
            <CatCard_map cat={catsData} navigation={navigation} />
            <Text>asdegfasrthsdgtjnsdfgn</Text>
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}
