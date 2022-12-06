import React, { useEffect, useState } from "react";
import { View, useWindowDimensions, FlatList } from "react-native";
import { Marker } from "react-native-maps";
import { Foundation } from "@expo/vector-icons";
import { Colors } from "../styles/Colors";
import { CatCard_map } from "../cards/CatCard_map";
import {
  getCattery,
  userLikeACat,
  userUnLikeACat,
} from "../../firebaseUtils/user";

export function CatteryMarker({
  catsData,
  navigation,
  showCatList,
  setShowCatList,
  flatListRef,
}) {
  const { height, width } = useWindowDimensions();
  const [cattery, setCattery] = useState(null);
  const [likeCats, setLikeCats] = useState([]);

  useEffect(() => {
    if (catsData.cattery) {
      getCattery(catsData.cattery).then((cattery) => setCattery(cattery));
    }
  }, [catsData]);

  const onClickLikeButton = () => {
    if (!likeCats.includes(catsData.id)) {
      userLikeACat(catsData.id);
    } else {
      userUnLikeACat(catsData.id);
    }
  };

  const markerOnPress = async (event) => {
    const idString = event._targetInst._debugOwner.memoizedProps.indentifier;
    const id = parseInt(idString, 10);
    if (!isNaN(id)) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      try {
        if (flatListRef.current)
          flatListRef.current.scrollToIndex({ index: id, animated: true });
        else console.log("flatListRef.current is null");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <View>
      {catsData.map((cat, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: cat.geoLocation.lat,
              longitude: cat.geoLocation.lng,
            }}
            onPress={markerOnPress}
            indentifier={`${index}`}
          >
            <Foundation name="marker" size={40} color={Colors.orangeText} />

            {/* <Callout>
            <View style={{ width: 100, height: 100, backgroundColor: "white" }}>
              <Text>Hi Hi hi</Text>
            </View>
          </Callout> */}
          </Marker>
        );
      })}

      {showCatList === false ? (
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

      <View style={{}}></View>
    </View>
  );
}
