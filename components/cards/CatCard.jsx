import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import {
  getCattery,
  userLikeACat,
  userUnLikeACat,
} from "../../firebaseUtils/user";
import { HeartButton } from "../pressable/HeartButton";
import { LocationText } from "../texts/LocationText";
import CachedImage from "react-native-expo-cached-image";
import { useSwipePressable } from "../../utils/useSwipe";
export function CatCard({
  cat,
  navigation,
  hideLocation,
  showBreed,
}) {
  const [likeCats, setLikeCats] = useState([]);
  const [cattery, setCattery] = useState(null);

  useEffect(() => {
    if (cat.cattery) {
      getCattery(cat.cattery).then((cattery) => setCattery(cattery));
    }
  }, [cat]);

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

  const onClickLikeButton = () => {
    if (!likeCats.includes(cat.id)) {
      userLikeACat(cat.id);
    } else {
      userUnLikeACat(cat.id);
    }
  };

  let catMonthText = "";
  if (cat.month <= 1) {
    catMonthText = "< 1 month";
  } else if (cat.month === 1) {
    catMonthText = cat.month + " month";
  } else {
    catMonthText = cat.month + " months";
  }

  const { onTouchStart, onTouchEnd } = useSwipePressable(() =>
    navigation.navigate("CatInformation", { catId: cat.id })
  );

  return (
    <View style={styles.container}>
      <Pressable onPressIn={onTouchStart} onPressOut={onTouchEnd}>
        <View style={styles.imageView}>
          {/* cat photo */}
          <CachedImage source={{ uri: cat.photo }} style={styles.image} />
        </View>

        <View style={styles.descriptionView}>
          {/* cat name */}
          <Text style={styles.catNameStyle}>{cat.name}</Text>

          {/* cat details */}
          <Text style={styles.catDetailStyle}>
            {cat.sex}, {catMonthText}
          </Text>

          {/* cat breed */}
          {showBreed && <Text style={styles.catDetailStyle}>{cat.breed}</Text>}

          {/* cat location */}
          {!hideLocation && (
            <LocationText
              textStyle={styles.locationStyle}
              locationIconColor={styles.locationIconStyle.color}
              viewPosition={{ top: -1, left: -2.3}}
            >
              {cattery && cattery.shortAddress
                ? cattery.shortAddress +
                  " (" + cat.distance + " mi)"
                : "Loading"}
            </LocationText>
          )}
        </View>
      </Pressable>

      {/* floating components */}
      <View style={styles.heartButtonView}>
        <HeartButton
          // notSelectedColor="white"
          isLiked={likeCats.includes(cat.id)}
          onPress={onClickLikeButton}
        />
      </View>

      <View style={styles.priceView}>
        <Text style={styles.priceTag}>${cat.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    justifyContent: "center",
    width: "46%",
  },
  imageView: {
    aspectRatio: 0.834,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  image: {
    width: "100%",
    height: 125,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  descriptionView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 9,
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
    height: 77,
  },
  catNameStyle: {
    color: "#2E2525",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    marginBottom: 2,
  },
  catDetailStyle: {
    marginTop: 4,
    color: "rgba(46, 37, 37, 0.67)",
    fontSize: 12,
  },
  locationStyle: {
    fontSize: 10,
    color: "#2E2525",
  },
  locationIconStyle: {
    color: "#F59156",
  },
  heartButtonView: {
    position: "absolute",
    top: 0,
    left: 4,
  },
  priceView: {
    position: "absolute",
    top: 12,
    right: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    shadowColor: "rgba(245, 145, 86, 0.19)",
    marginHorizontal: 4,
  },
  priceTag: {
    color: "#F6AC3D",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },
});
