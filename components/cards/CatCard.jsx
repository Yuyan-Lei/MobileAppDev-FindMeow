import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Image, Alert } from "react-native";
import { userUnLikeACat, userLikeACat, getCattery } from "../../firebaseUtils/user";
import { HeartButton } from "../pressable/HeartButton";
import { rootStackNavigate } from "../RootNavigation";
import { Colors } from "../styles/Colors";
import { LocationText } from "../texts/LocationText";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
export function CatCard({ cat }) {
  const [likeCats, setLikeCats] = useState([]);
  const [cattery, setCattery] = useState(null);

  getCattery(cat.cattery).then((cattery) => setCattery(cattery));

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
          <Text style={styles.catNameStyle}>
            {cat.name}
          </Text>

          {/* cat details */}
          <Text style={styles.catDetailStyle}>
            {cat.sex}, {cat.month} {cat.month === 1 ? "month" : "months"}
          </Text>

          {/* cat location */}
          <LocationText
            textStyle={styles.locationStyle}
            locationIconColor={styles.locationIconStyle.color}
          >
            {cattery && cattery.address ? 
              cattery.address.split(", ")[1] + ", " + cattery.address.split(", ")[2] : 'Loading'}
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
        <Text style={styles.priceTag}>
          ${cat.price}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    margin: 8, 
    justifyContent: "center", 
    width: "45%" 
  },
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
    height: 77,
  },
  catNameStyle: {
    color: Colors.black,
    fontFamily: "PoppinsMedium",
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
