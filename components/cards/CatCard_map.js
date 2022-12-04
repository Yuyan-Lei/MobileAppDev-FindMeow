import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import CachedImage from "react-native-expo-cached-image";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { getCattery, userLikeACat, userUnLikeACat } from "../../firebaseUtils/user";
import { HeartButton2 } from "../pressable/HeartButton2";
import { LocationText } from "../texts/LocationText";

export function CatCard_map({ cat, navigation, isliked, hideLocation, showBreed }) {
  const { height, width } = useWindowDimensions();
  const [cattery, setCattery] = useState(null);

  useEffect(() => {
    if (cat.cattery) {
      getCattery(cat.cattery).then((cattery) => setCattery(cattery));
    }
  }, [cat]);



  const onClickLikeButton = () => {
    if (!isliked) {
      userLikeACat(cat.id);
    } else {
      userUnLikeACat(cat.id);
    }
    isliked = !isliked;
  };

  // let catMonthText = "";
  // if (cat.month <= 1) {
  //   catMonthText = "< 1 month";
  // } else if (cat.month === 1) {
  //   catMonthText = cat.month + " month";
  // } else {
  //   catMonthText = cat.month + " months";
  // }

  const onPressCatCard = () =>
    navigation.navigate("CatInformation", { catId: cat.id });

  return (
    <View style={{ width: width - 40 }}>
      <View
        style={{
          justifyContent: "center",
          width: "94%",
          backgroundColor: "white",
          borderRadius: 10,
          height: 110,
        }}
      >
        {/* <Pressable onPressIn={onTouchStart} onPressOut={onTouchEnd}> */}
        <Pressable
          style={{ marginTop: 20, marginHorizontal: 20 }}
          onPress={onPressCatCard}
        >
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <View style={styles.imageView}>
              {/* cat photo */}
              <CachedImage source={{ uri: cat.photo }} style={styles.image} />
            </View>

            <View style={{ marginLeft: 12, marginTop: 10 }}>
              <View>
                {/* cat name */}
                <Text style={styles.catNameStyle}>{cat.name}</Text>
                {/* cat breed */}
                {showBreed && (
                  <Text style={styles.catDetailStyle}>{cat.petName}</Text>
                )}

                {/* cat details */}
                <Text style={styles.catDetailStyle}>
                  {cat.sex}, {cat.month === 1 ? cat.month + " month" : cat.month + " months"}
                </Text>

                {/* cat location */}
                <LocationText style={styles.locationStyle} viewPosition={{ left: -2.5 }}>
                  {cattery && cattery.shortAddress
                    ? cattery.shortAddress +
                    " (" + cat.distance + " mi)"
                    : "Loading"}
                </LocationText>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "column" }}>
            {/* Heart Button */}
            <View style={styles.heartButtonView}>
              <HeartButton2
                // notSelectedColor="white"
                //   isLiked={likeCats.includes(cat.id)}
                onPress={onClickLikeButton}
              />
            </View>

            {/* Price Tag */}
            <View style={styles.priceView}>
              <Text style={styles.priceTag}>
                ${cat.price}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  imageView: {
    backgroundColor: "red",
    width: 75,
    height: 75,
    borderRadius: 16,
    marginVertical: 10,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  catNameStyle: {
    color: "#2E2525",
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
    marginTop: 1,
    marginBottom: 2,
  },
  catDetailStyle: {
    marginTop: 7,
    color: "rgba(46, 37, 37, 0.67)",
    fontSize: 13,
    fontFamily: "PoppinsRegular",
  },
  locationStyle: {
    fontSize: 13,
    color: "#2E2525",
    marginTop: 6,
  },
  locationIconStyle: {
    color: "#F59156",
  },
  heartButtonView: {
    position: "absolute",
    marginLeft: "auto",
    left: 255,
    marginRight: 90,
    top: -76
  },
  priceView: {
    marginLeft: "auto",
    top: -86,
    paddingLeft: -25,
  },
  priceTag: {
    color: "#F6AC3D",
    fontFamily: "PoppinsSemiBold",
    fontSize: 17,
  },
});
