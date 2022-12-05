import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
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

export function BreederCard({ cattery, navigation }) {
  const [likeCatteries, setLikeCatteries] = useState([]);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      doc(db, "Users", getCurrentUserEmail()),
      (snapshot) => {
        const likeCatteries = snapshot.data().likeCatteries || [];
        setLikeCatteries(likeCatteries);
      }
    );
    return () => unSubscribe();
  }, []);

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
    // <View style={styles.breederView}>
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
            {cattery.breed === undefined
              ? "N/A breed"
              : cattery.breed}
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
            locationIconColor={"#C5C4C4"}
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
    // top: 20,
    // marginRight: 24,
    // width:48,
    justifyContent: "center",
  },
  breederNameText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
    color: Colors.black,
  },
  breedText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: Colors.grayText,
    marginTop: 3,
  },
  availableKittenText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
    color: Colors.orangeText,
    marginTop: 3,
  },
  locationTextStyle: {
    fontSize: 11,
    color: "#C5C4C4",
  },
  detailView: {
    flexGrow: 1,
    flex: 1,
    // minWidth: 150,
  },
  imageView: {
    height: 80,
    width: 80,
    backgroundColor: "gray",
    marginRight: 20,
    borderRadius: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  cardView: {
    flexDirection: "row",
    padding: 16,
    // paddingLeft: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 20,
    // width: "90%",
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
