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

export default function MapPage({ route, navigation }) {
  const { height, width } = useWindowDimensions();
  const [showCatCard, setShowCatCard] = useState(false);
  // const catId = route.params.catId;
  // const [cat, setCat] = useState({});
  // const [cattery, setCattery] = useState([]);
  // const [location, setLocation] = useState(null);
  // const [distance, setDistance] = useState("Distance Loading");
  // const [likeCats, setLikeCats] = useState([]);
  // const [allowEdit, setAllowEdit] = useState(false);
  // const [data, setData] = useState([]);

  // const buttonHandler = () => {
  //   Alert.alert("Alert Title", "My Alert Msg", [
  //     {
  //       text: "Cancel",
  //       onPress: () => console.log("Cancel Pressed"),
  //       style: "cancel",
  //     },
  //     { text: "OK", onPress: () => console.log("OK Pressed") },
  //   ]);
  // };

  // /* Set user location. */
  // useEffect(() => {
  //   (async () => {
  //     let location = await getUserLocation();
  //     setLocation(location);
  //   })();
  // }, []);

  // /* Allow edit if user is the cat owner. */
  // useEffect(() => {
  //   if (cat && cat.Cattery) {
  //     setAllowEdit(cat.Cattery === getCurrentUserEmail());
  //   }
  // }, [cat]);

  // /* Calculate distance to the cat if both user location and cattery location are provided. */
  // useEffect(() => {
  //   if (cattery && cattery.placeId && location) {
  //     const googleMapClient = new Client({});
  //     googleMapClient
  //       .placeDetails({
  //         params: {
  //           place_id: cattery.placeId,
  //           key: REACT_APP_GOOGLE_MAP_APP_KEY,
  //         },
  //       })
  //       .then((resp) => {
  //         setDistance(
  //           calculateDistance(location, resp.data.result.geometry.location) +
  //             "mi"
  //         );
  //       });
  //   }
  // }, [cattery, location]);

  // useEffect(() => {
  //   const unSubscribe = onSnapshot(doc(db, "Cats", catId), async (catEntry) => {
  //     const catData = catEntry.data();
  //     const birthday = new Date(catData.Birthday);
  //     const now = new Date();

  //     let age =
  //       now.getMonth() -
  //       birthday.getMonth() +
  //       12 * (now.getFullYear() - birthday.getFullYear());
  //     // age cannot be negative
  //     if (age === undefined || isNaN(age) || age < 0) {
  //       age = 0;
  //     }

  //     /* Group cat object */
  //     setCat({
  //       ...catData,
  //       id: catEntry.id,
  //       month: age,
  //     });

  //     /* Get cattery */
  //     const catteryRef = doc(db, "Users", catData.Cattery);
  //     const catterySnap = await getDoc(catteryRef);

  //     setCattery(catterySnap.data());
  //   });

  //   return () => unSubscribe();
  // }, []);

  // useEffect(() => {
  //   const unSubscribe = onSnapshot(
  //     doc(db, "Users", getCurrentUserEmail()),
  //     (snapshot) => {
  //       const likeCats = snapshot.data().likeCats;
  //       setLikeCats(likeCats);
  //     }
  //   );

  //   return () => unSubscribe();
  // }, []);

  // const onClickLikeButton = () => {
  //   if (!likeCats.includes(cat.id)) {
  //     userLikeACat(cat.id);
  //   } else {
  //     userUnLikeACat(cat.id);
  //   }
  // };

  // {
  //   /* Calculate the post time */
  // }
  // const getDateFormatted = (timestamp) => {
  //   var date = new Date(timestamp);
  //   var dateFormat = date.toDateString();
  //   return dateFormat;
  // };

  const showCatCardHandler = () => {
    setShowCatCard(!showCatCard);
  };

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
          <Pressable
            // onPress={navigation.goBack}
            style={{ marginLeft: 15 }}
          >
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

      {showCatCard == true ? (
        <View
          style={{
            height: 80,
            backgroundColor: "transparent",
            position: "absolute",
            top: height - 170,
          }}
        >
          {/* <View style={{ width: 200 }}></View> */}
          <FlatList
            // data={data}
            renderItem={({ item }) => <CatCard_map cat={item} />}
            horizontal
          />
          <CatCard_map></CatCard_map>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    // top: 130,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
