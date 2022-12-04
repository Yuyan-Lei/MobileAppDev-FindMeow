import { REACT_APP_GOOGLE_MAP_APP_KEY } from "@env";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Client } from "@googlemaps/google-maps-services-js";
import { Divider } from "@react-native-material/core";
import { Chip } from "@rneui/themed";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CachedImage from "react-native-expo-cached-image";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import {
  calculateDistance,
  getUserLocation,
  userLikeACat,
  userUnLikeACat,
} from "../../firebaseUtils/user";
import { HeartButton_InfoPage } from "../pressable/HeartButton_InfoPage";
import { MessageButton } from "../pressable/MessageButton";
import { PhoneButton } from "../pressable/PhoneButton";
import { Colors } from "../styles/Colors";

export default function CatInformation({ route, navigation }) {
  const catId = route.params.catId;
  const [cat, setCat] = useState({});
  const [cattery, setCattery] = useState([]);
  const [location, setLocation] = useState(null);
  const [distance, setDistance] = useState("Distance Loading");
  const [likeCats, setLikeCats] = useState([]);
  const [allowEdit, setAllowEdit] = useState(false);

  /* Set user location. */
  useEffect(() => {
    (async () => {
      let location = await getUserLocation();
      setLocation(location);
    })();
  }, []);

  /* Allow edit if user is the cat owner. */
  useEffect(() => {
    if (cat && cat.Cattery) {
      setAllowEdit(cat.Cattery === getCurrentUserEmail());
    }
  }, [cat]);

  /* Calculate distance to the cat if both user location and cattery location are provided. */
  useEffect(() => {
    if (cattery && cattery.placeId && location) {
      const googleMapClient = new Client({});
      googleMapClient
        .placeDetails({
          params: {
            place_id: cattery.placeId,
            key: REACT_APP_GOOGLE_MAP_APP_KEY,
          },
        })
        .then((resp) => {
          setDistance(
            calculateDistance(location, resp.data.result.geometry.location) +
            "mi"
          );
        })
        .catch((err) => {
          console.error(err)
        });
    }
  }, [cattery, location]);

  useEffect(() => {
    const unSubscribe = onSnapshot(doc(db, "Cats", catId), async (catEntry) => {
      const catData = catEntry.data();
      if (catData === undefined || catData === null) { return; }

      const birthday = new Date(catData.Birthday);
      const now = new Date();

      let age =
        now.getMonth() -
        birthday.getMonth() +
        12 * (now.getFullYear() - birthday.getFullYear());
      // age cannot be negative
      if (age === undefined || isNaN(age) || age < 0) {
        age = 0;
      }

      /* Group cat object */
      setCat({
        ...catData,
        id: catEntry.id,
        month: age,
      });

      /* Get cattery */
      const catteryRef = doc(db, "Users", catData.Cattery);
      const catterySnap = await getDoc(catteryRef);

      setCattery(catterySnap.data());
    });

    return () => unSubscribe();
  }, []);

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

  const onClickEditButton = () => {
    navigation.push("PostNewCatScreen", { cat });
  };

  {/* Calculate the post time */ }
  const getDateFormatted = (timestamp) => {
    var date = new Date(timestamp);
    var dateFormat = date.toDateString();
    return dateFormat;
  }


  return (
    <ScrollView>
      <View>
        {/* Background Image */}
        <CachedImage
          source={{ uri: cat.Picture }}
          resizeMode="cover"
          style={{ height: 450, width: 500 }}
        ></CachedImage>

        {/* Heart button */}
        <View style={styles.floatingView}>
          <HeartButton_InfoPage
            notSelectedColor="white"
            isLiked={likeCats.includes(cat.id)}
            onPress={onClickLikeButton}
          />
        </View>

        {/* Edit Button */}
        {allowEdit && (
          <View style={styles.editButtonView}>
            <Pressable onPress={onClickEditButton}>
              <Feather name="edit" size={18} color="white" />
            </Pressable>
          </View>
        )}

        {/* Back Button*/}
        <View style={styles.backButtonContainer}>
          <Pressable onPress={navigation.goBack}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
        </View>

        {/* Main Contents */}
        <View
          style={{
            paddingHorizontal: 15,
            marginTop: -35,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: 'rgb(250, 250, 250)',
          }}
        >
          <Divider style={styles.divider} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 20,
            }}
          >
            <View style={styles.label}>
              <View style={styles.tags}>
                <Text style={styles.tagTitleText}>Gender</Text>
                <Text style={styles.tagContentText}>{cat.Gender}</Text>
              </View>
              <View style={styles.tags}>
                <Text style={styles.tagTitleText}>Age</Text>
                <Text style={styles.tagContentText}>
                  {cat.month} {cat.month === 1 ? "month" : "months"}
                </Text>
              </View>
              <View style={styles.tags}>
                <Text style={styles.tagTitleText}>Breed</Text>
                <Text style={styles.tagContentText}>{cat.Breed}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.catNameText}>{cat.Name}</Text>
            <Text style={styles.priceText}>${cat.Price}</Text>
          </View>
          {/* TODO: CATTERY LOCATION */}
          <View style={{ flexDirection: "row", marginLeft: -5 }}>
            <Ionicons
              name="location-sharp"
              size={24}
              color={Colors.darkOrange}
            />
            <Text style={styles.addressText}>{cattery.address}</Text>
            {distance !== "Distance Loading" && (
              <Text style={styles.addressText}>({distance})</Text>
            )}
          </View>
          {/* <Text style={styles.date}>{cat.Birthday}</Text> */}
          <Text style={styles.PostDateText}>Posted in {getDateFormatted(cat.UploadTime)}</Text>
          <View style={styles.chipBox}>
            {cat.Tags ? (
              cat.Tags.map((tag, index) => (
                <Chip
                  title={tag}
                  key={index}
                  containerStyle={styles.chip}
                  color={Colors.orangeText}
                  titleStyle={{ fontFamily: "Poppins" }}
                />
              ))
            ) : (
              <></>
            )}
          </View>

          {/* contact info label */}
          <View style={styles.contactLabelContainer}>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.contactText}>Contact Info</Text>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  onPress={() => navigation.push("CatteryProfile", { cattery })}
                >
                  <CachedImage
                    source={{ uri: cattery.picture }}
                    resizeMode="cover"
                    style={{
                      padding: 8,
                      borderRadius: 100,
                      height: 40,
                      width: 40,
                      marginRight: 10,
                    }}
                  ></CachedImage>
                </Pressable>
                <View>
                  <Text style={styles.catteryNameText}>
                    {cattery.catteryName}
                  </Text>
                  <Text style={styles.catteryLabelText}>Cattery</Text>
                </View>
                <View style={{ width: 200 }}></View>
                <View style={styles.buttonView}>
                  <PhoneButton cattery={cattery} />
                  <MessageButton cattery={cattery} />
                </View>
              </View>
            </View>
          </View>

          {/* contact info label end */}
          <View style={styles.detailLabel}>
            <Text style={styles.detailTitleText}>Details</Text>

            <View>
              <Text style={styles.descriptionText}>{cat.Description}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 450,
    width: 500,
  },
  label: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  divider: {
    borderBottomWidth: 3,
    marginHorizontal: 140,
    marginTop: 8,
  },
  tags: {
    backgroundColor: "white",
    marginHorizontal: 10,
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  },
  chip: {
    marginVertical: 8,
    marginRight: 10,
    height: 35,
  },
  buttonView: {
    flexDirection: "row",
    marginLeft: "auto",
    top: -4,
  },
  roundButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "white",
  },
  chipBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  backButtonContainer: {
    padding: 5,
    backgroundColor: Colors.arrowBackground,
    borderRadius: 13,
    position: "absolute",
    top: 50,
    left: 22,
    width: 35,
    height: 35,
  },
  floatingView: {
    position: "absolute",
    top: 50,
    right: 22,
  },
  editButtonView: {
    position: "absolute",
    top: 50,
    right: 68,
    width: 35,
    height: 35,
    backgroundColor: Colors.arrowBackground,
    borderRadius: 13,
    alignItems: "center",
    paddingTop: 8,
  },
  tagTitleText: {
    fontSize: 13,
    color: "rgba(46, 37, 37, 0.5)",
    fontFamily: "PoppinsRegular",
    marginVertical: 5,
  },
  tagContentText: {
    fontSize: 15,
    color: Colors.text,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 5,
  },
  catNameText: {
    fontSize: 28,
    color: Colors.text,
    fontFamily: "PoppinsBold",
    marginBottom: 20,
  },
  priceText: {
    fontSize: 23,
    color: Colors.priceColor,
    fontFamily: "PoppinsMedium",
    textAlign: "right",
    marginLeft: "auto",
    marginBottom: 20,
  },
  addressText: {
    fontSize: 15,
    color: Colors.text,
    fontFamily: "PoppinsMedium",
    marginLeft: 5,
  },
  PostDateText: {
    fontSize: 14,
    color: "rgba(46, 37, 37, 0.67)",
    fontFamily: "PoppinsLight",
    marginTop: 8,
    marginBottom: 15,
  },
  detailLabel: {
    textAlign: "left",
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontFamily: "Poppins",
    marginBottom: 50,
  },
  detailTitleText: {
    marginBottom: 15,
    marginTop: 10,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  descriptionText: {
    fontSize: 15,
    color: "rgba(46, 37, 37, 0.76)",
    fontFamily: "PoppinsRegular",
  },
  contactLabelContainer: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 8,
    borderRadius: 15,
    marginTop: 20,
  },
  contactText: {
    marginBottom: 15,
    marginRight: "auto",
    marginTop: 10,
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  catteryNameText: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: "PoppinsMedium",
  },
  catteryLabelText: {
    fontSize: 12,
    color: "rgba(46, 37, 37, 0.63)",
    fontFamily: "PoppinsMedium",
    marginTop: 5,
    marginBottom: 15,
  },
});
