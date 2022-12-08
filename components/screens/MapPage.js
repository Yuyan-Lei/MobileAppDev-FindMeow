import { Ionicons } from "@expo/vector-icons";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { CatCard_map } from "../cards/CatCard_map";
import { CatteryMarker } from "../pressable/CatteryMarker";

export default function MapPage({
  route: {
    params: { catsData },
  },
  navigation,
}) {
  const { height, width } = useWindowDimensions();
  const [showCatList, setShowCatList] = useState(true);
  const [location, setLocation] = useState(null);
  const [currentSwiperIndex, setCurrentSwiperIndex] = useState(0);

  const [allCatteries, setAllCatteries] = useState([]);
  const [likedCatsEmails, setLikedCatsEmails] = useState([]);

  /* renew likedCatsEmails */
  useEffect(() => {
    const userDoc = query(doc(db, "Users", getCurrentUserEmail()));
    const unsubscribeUser = onSnapshot(userDoc, (userSnapShot) => {
      const userLikedCatsEmails = userSnapShot.data().likeCats;
      setLikedCatsEmails(userLikedCatsEmails);
    });

    return () => {
      unsubscribeUser();
    };
  }, []);

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

    return () => unsubscribeCattery();
  }, []);

  const showCatListHandler = () => {
    setShowCatList(!showCatList);
  };

  const initialLat = catsData.at(0).geoLocation.lat;
  const initialLng = catsData.at(0).geoLocation.lng;

  const mapRef = useRef(null);
  const selectLocation = (region) => {
    mapRef.current.animateToRegion(region, 1000);
  };

  const flatListRef = useRef();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: initialLat,
          longitude: initialLng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <CatteryMarker
          catsData={catsData}
          navigation={navigation}
          showCatList={showCatList}
          setShowCatList={setShowCatList}
          flatListRef={flatListRef}
        />
      </MapView>

      {/* Header and goBack button */}
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

      {/* Swiper card */}
      {showCatList === true ? (
        <View
          style={{
            backgroundColor: "transparent",
            marginTop: height * 0.75,
          }}
        >
          <SwiperFlatList
            ref={flatListRef}
            showsPagination={false}
            onChangeIndex={({ index }) => {
              selectLocation({
                latitude: catsData[index].geoLocation.lat,
                longitude: catsData[index].geoLocation.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }}
            data={catsData}
            renderItem={({ item }) => (
              <CatCard_map
                cat={item}
                navigation={navigation}
                likedCatInput={likedCatsEmails}
                catteryInput={allCatteries.find(
                  (cattery) => {
                    cattery.id === item.Cattery
                  })}
              />
            )}>
          </SwiperFlatList>
        </View>
      ) : (
        <View />
      )
      }
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
