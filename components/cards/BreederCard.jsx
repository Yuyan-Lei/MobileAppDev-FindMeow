import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CachedImage from "react-native-expo-cached-image";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { userLikeACattery, userUnLikeACattery } from "../../firebaseUtils/user";
import { useSwipePressable } from "../../utils/useSwipe";
import { HeartButton2 } from "../pressable/HeartButton2";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export function BreederCard({ cattery, userLikedCatteryEmails, navigation }) {
  const [likeCatteries, setLikeCatteries] = useState([]);

  useEffect(() => {
    if (userLikedCatteryEmails === undefined) {
      const unSubscribe = onSnapshot(
        doc(db, "Users", getCurrentUserEmail()),
        (snapshot) => {
          const likeCatteries = snapshot.data().likeCatteries || [];
          setLikeCatteries(likeCatteries);
        }
      );
      return () => unSubscribe();
    } else {
      setLikeCatteries(userLikedCatteryEmails);
    }
  }, [userLikedCatteryEmails, likeCatteries]);

  const onClickLikeButton = () => {
    if (!likeCatteries.includes(cattery.email)) {
      userLikeACattery(cattery.email);
    } else {
      userUnLikeACattery(cattery.email);
    }
  };

  const { onTouchStart, onTouchEnd } = useSwipePressable(() =>
    navigation.navigate("CatteryProfile", { cattery })
  );

  return (
    <View
      style={[
        styles.cardView,
        Platform.OS === "ios" ? styles.iosShadowView : styles.androidShadowView,
      ]}
    >
      <Pressable
        onPressIn={onTouchStart}
        onPressOut={onTouchEnd}
        style={{ flexDirection: "row", flex: 1, flexGrow: 1 }}
      >
        {/* Cattery photo */}
        <View style={styles.imageView}>
          <CachedImage source={{ uri: cattery.picture }} style={styles.image} />
        </View>

        <View style={styles.detailView}>
          {/* Cattery Avatar */}
          <Text
            style={styles.breederNameText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {cattery.catteryName}
          </Text>

          {/* Cattery Breed */}
          <Text style={styles.breedText} numberOfLines={1} ellipsizeMode="tail">
            {cattery.breed === undefined ? "N/A breed" : cattery.breed}
          </Text>

          {/* Available Kitten Display */}
          <Text style={styles.availableKittenText}>
            {cattery.cats.length > 0
              ? cattery.cats.length === 1
                ? `${cattery.cats.length} Available Kitten`
                : `${cattery.cats.length} Available Kittens`
              : ""}
          </Text>

          {/* Cattery Location */}
          <LocationText
            textStyle={styles.locationTextStyle}
            locationIconColor={Colors.locationIcon}
            viewPosition={{ top: -1, left: -2 }}
          >
            {cattery.shortAddress}
          </LocationText>
        </View>
      </Pressable>
      {/* </View> */}

      <View style={styles.heartButtonView}>
        <HeartButton2
          isLiked={likeCatteries.includes(cattery.email)}
          onPress={onClickLikeButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  breederView: {
    marginHorizontal: 10,
  },
  heartButtonView: {
    justifyContent: "center",
  },
  breederNameText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.tagContent,
    color: Colors.black,
  },
  breedText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSizes.smallTag,
    color: Colors.grayText,
    marginTop: 3,
  },
  availableKittenText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.smallTag,
    color: Colors.orangeText,
    marginTop: 3,
  },
  locationTextStyle: {
    fontSize: FontSizes.smallLocation,
    color: Colors.locationIcon,
  },
  detailView: {
    flexGrow: 1,
    flex: 1,
  },
  imageView: {
    marginRight: 20,
    borderRadius: 16,
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  cardView: {
    flexDirection: "row",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  iosShadowView: {
    shadowColor: Colors.black,
    shadowRadius: 11,
    shadowOpacity: 0.07,
    shadowOffset: {
      width: 0,
      height: 7,
    },
  },
  androidShadowView: {
    shadowColor: Colors.shadowWhiteAndroid,
    elevation: 17,
  },
});
