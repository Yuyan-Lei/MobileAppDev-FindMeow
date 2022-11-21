import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Image, Alert } from "react-native";
import { userUnLikeACat, userLikeACat } from "../../firebaseUtils/user";
import { HeartButton } from "../pressable/HeartButton";
import { rootStackNavigate } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
export function CatCard({ cat }) {
  const [likeCats, setLikeCats] = useState([]);

  useEffect(() => {
    const unSubscribe = 
      onSnapshot(doc(db, 'Users', getCurrentUserEmail()), 
        (snapshot) => {
          const likeCats = snapshot.data().likeCats;
          setLikeCats(likeCats);
        });
    
    return () => unSubscribe();
  }, []);
  const onClickLikeButton = () => {
    if(!likeCats.includes(cat.id)) {
      userLikeACat(cat.id);
    } else {
      userUnLikeACat(cat.id);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => rootStackNavigate("CatInformation")}>
        <View style={styles.imageView}>
          {/* cat photo */}
          <Image source={{ uri: cat.photo }} style={styles.image} />
        </View>

        <View style={styles.descriptionView}>
          {/* cat name */}
          <Text style={[styles.fontStyle, styles.catNameStyle]}>
            {cat.name}
          </Text>

          {/* cat details */}
          <Text style={[styles.fontStyle, styles.catDetailStyle]}>
            {cat.sex}, {cat.month} {cat.month === 1 ? "month" : "months"}
          </Text>

          {/* cat location */}
          <LocationText
            textStyle={[styles.fontStyle, styles.locationStyle]}
            locationIconColor={styles.locationIconStyle.color}
          >
            {cat.location}
          </LocationText>
        </View>
      </Pressable>

      {/* floating components */}
      <View style={styles.heartButtonView}>
        <HeartButton 
          notSelectedColor="white"
          isLiked={likeCats.includes(cat.id)}
          onPress={onClickLikeButton} />
      </View>

      <View style={styles.priceView}>
        <Text style={styles.orangeText}>${cat.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 8, justifyContent: "center", width: "45%" },
  imageView: {
    aspectRatio: 0.834,
    // backgroundColor: "gray",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  image: {
    width: "100%",
    height: 115,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  descriptionView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
    height: 90,
  },
  fontStyle: {
    fontFamily: "Poppins",
    fontWeight: "500",
  },
  catNameStyle: {
    color: Colors.black,
    fontSize: 14,
  },
  catDetailStyle: {
    color: "rgba(46, 37, 37, 0.67)",
    fontSize: 12,
    fontWeight: "400",
  },
  locationStyle: {
    fontSize: 10,
    color: Colors.black,
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
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    shadowColor: "rgba(245, 145, 86, 0.19)",
    marginHorizontal: 4,
  },
  orangeText: {
    color: "orange",
  },
});
