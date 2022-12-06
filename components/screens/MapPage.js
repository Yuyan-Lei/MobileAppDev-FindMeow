import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { CatCard_map } from "../cards/CatCard_map";
import { CatteryMarker } from "../pressable/CatteryMarker";
import { Colors } from "../styles/Colors";
import { getUserLocation } from "../../firebaseUtils/user";
import { useRef } from "react";

export default function MapPage({
  route: {
    params: { catsData, likedCats },
  },
  navigation,
}) {
  const { height, width } = useWindowDimensions();
  const [showCatList, setShowCatList] = useState(true);
  const [location, setLocation] = useState(null);

  const showCatListHandler = () => {
    setShowCatList(!showCatList);
  };

  /* Set user location. */
  // useEffect(() => {
  //   (async () => {
  //     let location = await getUserLocation();
  //     setLocation(location);
  //   })();
  // }, []);

  const initialLat = catsData.at(0).geoLocation.lat;
  const initialLng = catsData.at(0).geoLocation.lng;

  // markList = () => {
  //   cat.map((catsData, navigation, showCatList, setShowCatList) => {
  //     return (
  //       <CatteryMarker
  //         cat={catsData}
  //         navigation={navigation}
  //         showCatList={showCatList}
  //         setShowCatList={setShowCatList}
  //       />
  //     );
  //   });
  // };

  const mapRef = useRef(null);
  const selectLocation = (region) => {
    mapRef.current.animateToRegion(region, 1000);
  };

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

        <CatteryMarker
          catsData={catsData}
          navigation={navigation}
          showCatList={showCatList}
          setShowCatList={setShowCatList}
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
      {/* </ScrollView> */}

      {/* Flatlist card */}

      {showCatList == true ? (
        <View
          style={{
            backgroundColor: "transparent",
            marginTop: height * 0.75,
            left: 30,
          }}
        >
          <FlatList
            data={catsData}
            renderItem={({ item }) => (
              <CatCard_map
                cat={item}
                navigation={navigation}
                isliked={likedCats.includes(item.id)}
              />
            )}
            horizontal
            onScrollEndDrag={(event) => {
              const index = Math.floor(
                Math.floor(event.nativeEvent.contentOffset.x) /
                Math.floor(event.nativeEvent.layoutMeasurement.width)
              );
              if (index === undefined || index < 0 || index >= catsData.length)
                return;
              selectLocation({
                latitude: catsData[index].geoLocation.lat,
                longitude: catsData[index].geoLocation.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              })
            }}
          />
        </View>
      ) : (
        // <View style={{ width: width + 20, alignItems: "center" }}>
        //   <View
        //     style={{
        //       height: 80,
        //       backgroundColor: "transparent",
        //       position: "absolute",
        //       top: height - 170,
        //     }}
        //   >
        //     <CatCard_map cat={catsData} navigation={navigation} />
        //   </View>
        // </View>
        <View />
      )}

      {/* Trigger button - refresh if location changed */}
      {/* <View
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
        <Pressable>
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
      </View> */}
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
