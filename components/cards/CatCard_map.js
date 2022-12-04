import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { HeartButton2 } from "../pressable/HeartButton2";
import { LocationText } from "../texts/LocationText";

export function CatCard_map({ cat, navigation, hideLocation, showBreed }) {
  const { height, width } = useWindowDimensions();
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
          borderRadius: 8,
          height: 80,
        }}
      >
        {/* <Pressable onPressIn={onTouchStart} onPressOut={onTouchEnd}> */}
        <Pressable
          style={{ marginTop: 20, marginHorizontal: 10 }}
          onPress={onPressCatCard}
        >
          <View style={{ flexDirection: "row", marginRight: 20 }}>
            <View style={styles.imageView}>
              {/* cat photo */}
              {/* <CachedImage source={{ uri: cat.photo }} style={styles.image} /> */}
            </View>

            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <View>
                {/* cat name */}
                {/* <Text style={styles.catNameStyle}>{cat.name}</Text> */}
                <Text style={styles.catNameStyle}>Ragdoll</Text>
                {/* cat breed */}
                {/* {showBreed && (
              <Text style={styles.catDetailStyle}>{cat.breed}</Text>
            )} */}

                {/* cat details */}
                <Text style={styles.catDetailStyle}>
                  {/* {cat.sex}, {catMonthText} */}
                  Male, 4 months
                </Text>

                {/* cat location */}
                {/* {!hideLocation && (
              <LocationText
                textStyle={styles.locationStyle}
                locationIconColor={styles.locationIconStyle.color}
              >
                {cattery && cattery.shortAddress
                  ? cattery.shortAddress + " (" + cat.distance + " km)"
                  : "Loading"}
              </LocationText>
            )} */}
                <LocationText style={styles.locationStyle}>
                  San Jose (0.8km)
                </LocationText>
                {/* <Text>San Jose (0.8 km)</Text> */}
              </View>
            </View>
          </View>

          {/* floating components */}
          <View style={{ flexDirection: "column" }}>
            <View style={styles.heartButtonView}>
              <HeartButton2
                // notSelectedColor="white"
                //   isLiked={likeCats.includes(cat.id)}
                onPress={onClickLikeButton}
              />
            </View>

            <View style={styles.priceView}>
              {/* <Text style={styles.priceTag}>${cat.price}</Text> */}
              <Text style={styles.priceTag}>$1500</Text>
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
    borderRadius: 5,
  },
  imageView: {
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 8,
    marginVertical: 10,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  catNameStyle: {
    color: "#2E2525",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    marginBottom: 2,
  },
  catDetailStyle: {
    marginTop: 2,
    color: "rgba(46, 37, 37, 0.67)",
    fontSize: 12,
    fontFamily: "Poppins",
  },
  locationStyle: {
    fontSize: 10,
    color: "#2E2525",
    marginTop: 5,
  },
  locationIconStyle: {
    color: "#F59156",
  },
  heartButtonView: {
    position: "absolute",
    marginLeft: "auto",
    left: 245,
    marginRight: 90,
    top: -70,
  },
  priceView: {
    marginLeft: "auto",
    top: -70,
    paddingLeft: -20,
    marginRight: 20,
  },
  priceTag: {
    color: "#F6AC3D",
    fontFamily: "PoppinsMedium",
    fontSize: 14,
  },
});
