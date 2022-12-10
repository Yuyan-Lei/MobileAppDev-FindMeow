import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CachedImage from "react-native-expo-cached-image";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import {
  getCattery,
  userLikeACat,
  userUnLikeACat,
} from "../../firebaseUtils/user";
import { useSwipePressable } from "../../utils/useSwipe";
import { HeartButton } from "../pressable/HeartButton";
import { LocationText } from "../texts/LocationText";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export function CatCard({
  cat,
  navigation,
  userLikedCats,
  catteryDoc,
  hideLocation,
  showBreed,
}) {
  const [likeCats, setLikeCats] = useState([]);

  useEffect(() => {
    if (userLikedCats === undefined) {
      const unSubscribe = onSnapshot(
        doc(db, "Users", getCurrentUserEmail()),
        (snapshot) => {
          const likeCats = snapshot.data().likeCats;
          setLikeCats(likeCats);
        }
      );

      return () => unSubscribe();
    } else {
      setLikeCats(userLikedCats);
    }
  }, [userLikedCats]);

  const onClickLikeButton = async () => {
    try {
      if (!likeCats.includes(cat.id)) {
        userLikeACat(cat.id);
      } else {
        userUnLikeACat(cat.id);
      }
    } catch (e) {
      console.error("Error while liking a cat", e);
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

  const [cattery, setCattery] = useState(null);

  useEffect(() => {
    if (catteryDoc !== undefined) {
      setCattery(catteryDoc);
    } else if (cat.cattery) {
      getCattery(cat.cattery)
        .then((cattery) => setCattery(cattery))
        .catch((e) => console.log(e));
    }
  }, [cat, catteryDoc]);

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
          <View style={{ width: 120 }}>
            <Text
              style={styles.catNameStyle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {cat.name}
            </Text>
          </View>

          {/* cat details */}
          <Text style={styles.catDetailStyle}>
            {cat.sex}, {catMonthText}
          </Text>

          {/* cat breed */}
          {showBreed && (
            <Text
              style={styles.catDetailStyle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {cat.breed}
            </Text>
          )}

          {/* cat location */}
          {!hideLocation && (
            <LocationText
              textStyle={styles.locationStyle}
              locationIconColor={styles.locationIconStyle.color}
              viewPosition={{ top: -1, left: -2.3 }}
            >
              {cattery && cattery.shortAddress
                ? cattery.shortAddress +
                  (cat.distance !== undefined && cat.distance !== null
                    ? ` (${cat.distance} mi)`
                    : "")
                : "Loading"}
            </LocationText>
          )}
        </View>
      </Pressable>

      {/* floating components */}
      <View style={styles.heartButtonView}>
        <HeartButton
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
    top: -8,
    width: "100%",
    padding: 9,
    backgroundColor: Colors.dimGray,
    borderRadius: 5,
    height: 77,
  },
  catNameStyle: {
    color: Colors.text,
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.text,
    marginBottom: 2,
  },
  catDetailStyle: {
    marginTop: 3,
    color: Colors.grayText,
    fontSize: FontSizes.smallTag,
  },
  locationStyle: {
    fontSize: FontSizes.smallText,
    color: Colors.text,
  },
  locationIconStyle: {
    color: Colors.orangeText,
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
    backgroundColor: Colors.dimGray,
    borderRadius: 10,
    shadowColor: Colors.priceViewShadow,
    marginHorizontal: 4,
  },
  priceTag: {
    color: Colors.priceColor,
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.text,
  },
});
