import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text, useWindowDimensions, View
} from "react-native";
import CachedImage from "react-native-expo-cached-image";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import {
  getCattery,
  userLikeACat,
  userUnLikeACat
} from "../../firebaseUtils/user";
import { HeartButton2 } from "../pressable/HeartButton2";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";

export function CatCard_map({ cat, navigation, showBreed }) {
  const { width } = useWindowDimensions();
  const [cattery, setCattery] = useState(null);
  const [likeCats, setLikeCats] = useState([]);

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

  const onPressCatCard = () =>
    navigation.navigate("CatInformation", { catId: cat.id });

  return (
    <View style={{
      width: width,
      alignSelf: 'center',
      padding: 10,
      paddingBottom: 30
    }}>
      <View
        style={{
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: 10,
          height: 110,
        }}
      >
        {/* <Pressable onPressIn={onTouchStart} onPressOut={onTouchEnd}> */}
        <Pressable
          style={{ flex: 1, paddingLeft: 20, paddingVertical: 10 }}
          onPress={onPressCatCard}
        >
          <View style={{ flexDirection: "row", marginRight: 10 }}>
            <View style={styles.imageView}>
              {/* cat photo */}
              <CachedImage source={{ uri: cat.photo }} style={styles.image} />
            </View>

            <View style={{ paddingLeft: 12 }}>
              <View>
                {/* cat name */}
                <Text style={styles.catNameStyle}>{cat.name}</Text>
                {/* cat breed */}
                {showBreed && (
                  <Text style={styles.catDetailStyle}>{cat.petName}</Text>
                )}

                {/* cat details */}
                <Text style={styles.catDetailStyle}>
                  {cat.sex},{" "}
                  {cat.month === 1
                    ? cat.month + " month"
                    : cat.month + " months"}
                </Text>

                {/* cat location */}
                <LocationText
                  style={styles.locationStyle}
                  viewPosition={{ left: -2.5 }}
                >
                  {cattery && cattery.shortAddress
                    ? cattery.shortAddress + " (" + cat.distance + " mi)"
                    : "Loading"}
                </LocationText>
              </View>
            </View>
          </View>

          {/* Right Part */}
          <View style={styles.heartButtonView}>
            {/* Price Tag */}
            <Text style={styles.priceTag}>${cat.price}</Text>

            {/* Heart Button */}
            <View style={{ marginTop: 15, marginRight: -8 }}>
              <HeartButton2
                notSelectedColor={Colors.gray}
                isLiked={likeCats.includes(cat.id)}
                onPress={onClickLikeButton}
              />
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
    marginTop: 7,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  catNameStyle: {
    color: "#2E2525",
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
    marginTop: 6,
    marginBottom: 2,
  },
  catDetailStyle: {
    marginTop: 6,
    color: "rgba(46, 37, 37, 0.67)",
    fontSize: 13,
    fontFamily: "PoppinsRegular",
  },
  locationStyle: {
    fontSize: 13,
    color: "#2E2525",
  },
  locationIconStyle: {
    color: "#F59156",
  },
  heartButtonView: {
    marginTop: -77,
    marginRight: 20,
    alignItems: "flex-end",
  },
  priceTag: {
    color: "#F6AC3D",
    fontFamily: "PoppinsSemiBold",
    fontSize: 17,
  },
});
