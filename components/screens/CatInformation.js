// import { Feather, Ionicons } from "@expo/vector-icons";
// import { Chip } from "@rneui/themed";
// import {
//   collection,
//   doc,
//   getDoc,
//   onSnapshot,
//   query,
//   QuerySnapshot,
//   where,
// } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { Image, Pressable, StyleSheet, Text, View } from "react-native";
// import BottomDrawer from "react-native-bottom-drawer-view";
// import { db } from "../../firebaseUtils/firebase-setup";
// import { MessageButton } from "../pressable/MessageButton";
// import { PhoneButton } from "../pressable/PhoneButton";
// import { HeartButton } from "../pressable/HeartButton";
// import { Colors } from "../styles/Colors";
// // import { Chip } from "../pressable/Chip";

// export default function CatInformation({ route, navigation }) {
//   function RenderContent() {
//     return (
//       <View style={{ marginHorizontal: 15 }}>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-evenly",
//             marginVertical: 20,
//           }}
//         >
//           <View style={styles.label}>
//             <View style={styles.tags}>
//               <Text style={styles.tagText}>Gender</Text>
//               <Text style={styles.tagInfoText}>{cat.Gender}</Text>
//             </View>
//             <View style={styles.tags}>
//               <Text style={styles.tagText}>Age</Text>
//               <Text style={styles.tagInfoText}>
//                 {cat.month} {cat.month === 1 ? "month" : "months"}
//               </Text>
//             </View>
//             <View style={styles.tags}>
//               <Text style={styles.tagText}>Breed</Text>
//               <Text style={styles.tagInfoText}>{cat.Breed}</Text>
//             </View>
//           </View>
//         </View>
//         <View style={{ flexDirection: "row" }}>
//           <Text style={styles.textPrimary}>{cat.Name}</Text>
//           <Text
//             style={{
//               textAlign: "right",
//               fontSize: 20,
//               fontWeight: "bold",
//               color: Colors.darkOrange,
//               marginLeft: "auto",
//               marginVertical: 20,
//             }}
//           >
//             ${cat.Price}
//           </Text>
//         </View>
//         {/* TODO: CATTERY LOCATION */}
//         <View style={{ flexDirection: "row" }}>
//           <Ionicons name="location-sharp" size={24} color={Colors.darkOrange} />
//           <Text style={styles.textSecondary}>{cattery.address}</Text>
//         </View>
//         <Text style={styles.date}>{cat.Birthday}</Text>
//         <View style={styles.chipBox}>
//           {cat.Tags ? (
//             cat.Tags.map((tag, index) => (
//               <Chip
//                 title={tag}
//                 key={index}
//                 containerStyle={styles.chip}
//                 color={Colors.orangeText}
//               />
//             ))
//           ) : (
//             <></>
//           )}
//         </View>

//         {/* contact info label */}
//         <View style={styles.contactLabel}>
//           <Text style={styles.contact}>Contact Info</Text>
//           <View style={{ flexDirection: "row" }}>
//             <View>
//               <Text>{cattery.catteryName}</Text>
//               <Text style={styles.date}>Cattery</Text>
//             </View>
//             <View style={{ width: 200 }}></View>
//             <View style={styles.buttonView}>
//               <PhoneButton />
//               <MessageButton />
//             </View>
//           </View>
//         </View>
//         {/* contact info label end */}
//         <View style={styles.detailLabel}>
//           <Text style={styles.contact}>Details</Text>
//           <View>
//             <Text>{cat.Description}</Text>
//           </View>
//         </View>
//       </View>
//     );
//   }

//   const catId = route.params.catId;
//   const [cat, setCat] = useState({});
//   const [cattery, setCattery] = useState([]);

//   useEffect(() => {
//     const unSubscribe = onSnapshot(doc(db, "Cats", catId), async (catEntry) => {
//       const catData = catEntry.data();
//       const birthday = new Date(catData.Birthday);
//       const now = new Date();

//       let age =
//         now.getMonth() -
//         birthday.getMonth() +
//         12 * (now.getFullYear() - birthday.getFullYear());
//       // age cannot be negative
//       if (age === undefined || isNaN(age) || age < 0) {
//         age = 0;
//       }

//       /* Group cat object */
//       setCat({
//         ...catData,
//         id: catEntry.id,
//         month: age,
//       });

//       /* Get cattery */
//       const catteryRef = doc(db, "Users", catData.Cattery);
//       const catterySnap = await getDoc(catteryRef);

//       setCattery(catterySnap.data());
//     });

//     return () => unSubscribe();
//   }, []);

//   // const onClickLikeButton = () => {
//   //   if (!likeCats.includes(cat.id)) {
//   //     userLikeACat(cat.id);
//   //   } else {
//   //     userUnLikeACat(cat.id);
//   //   }
//   // };

//   return (
//     <View>
//       <Image
//         source={{ uri: cat.Picture }}
//         resizeMode="cover"
//         style={{ height: 450, width: 500 }}
//       ></Image>
//       <View style={styles.floatingView}>
//         <HeartButton
//           notSelectedColor="white"
//           // isLiked={likeCats.includes(cat.id)}
//           // onPress={onClickLikeButton}
//         />
//       </View>
//       <View style={{ position: "absolute", top: 40, left: 12 }}>
//         <View
//           style={{
//             opacity: 0.5,
//             padding: 5,
//             backgroundColor: Colors.arrowBackground,
//             borderRadius: 13,
//             marginTop: 10,
//             marginLeft: 10,
//           }}
//         >
//           <Pressable onPress={navigation.goBack}>
//             {/* <Feather name="arrow-left-circle" size={24} color="white" /> */}
//             <Ionicons name="chevron-back" size={24} color="white" />
//           </Pressable>
//         </View>
//       </View>
//       <BottomDrawer
//         containerHeight={800}
//         downDisplay={300}
//         startUp={false}
//         backgroundColor={Colors.dimGray}
//         borderRadius={30}
//       >
//         <RenderContent />
//       </BottomDrawer>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   tagInfoText: {
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   button: {
//     margin: 10,
//     marginTop: 1000,
//     width: 100,
//     alignSelf: "flex-end",
//   },
//   card: {
//     width: "100%",
//     position: "absolute",
//     bottom: 0,
//   },
//   label: {
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   tags: {
//     backgroundColor: "white",
//     marginHorizontal: 20,
//     alignItems: "center",
//     padding: 8,
//     borderRadius: 12,
//   },
//   tagText: {
//     color: Colors.gray,
//     padding: 5,
//     width: 80,
//     textAlign: "center",
//   },
//   contactLabel: {
//     backgroundColor: "white",
//     alignItems: "center",
//     padding: 8,
//     borderRadius: 12,
//     marginTop: 10,
//   },
//   detailLabel: {
//     textAlign: "left",
//     marginTop: 10,
//     padding: 8,
//   },
//   textPrimary: {
//     textAlign: "left",
//     fontSize: 28,
//     fontWeight: "bold",
//     marginVertical: 20,
//   },
//   textSecondary: {
//     marginBottom: 10,
//     textAlign: "left",
//     fontSize: 14,
//     marginLeft: 6,
//   },
//   chip: {
//     marginVertical: 8,
//     marginHorizontal: 6,
//     height: 35,
//   },
//   contact: {
//     fontWeight: "bold",
//     marginBottom: 20,
//     marginRight: "auto",
//     marginTop: 5,
//     fontSize: 16,
//   },
//   buttonView: {
//     flexDirection: "row",
//     marginLeft: "auto",
//   },
//   roundButton: {
//     width: 30,
//     height: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 100,
//     backgroundColor: "#fff",
//   },
//   chipBox: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     // justifyContent: "space-evenly",
//   },
//   date: {
//     color: Colors.gray,
//     marginVertical: 8,
//   },
//   text: {
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   floatingView: {
//     position: "absolute",
//     top: 40,
//     right: 32,
//   },
// });

//new version using scrollable for whole screen
import { Feather, Ionicons } from "@expo/vector-icons";
import { Chip } from "@rneui/themed";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import BottomDrawer from "react-native-bottom-drawer-view";
import { db } from "../../firebaseUtils/firebase-setup";
import { MessageButton } from "../pressable/MessageButton";
import { PhoneButton } from "../pressable/PhoneButton";
import { HeartButton } from "../pressable/HeartButton";
import { HeartButton_InfoPage } from "../pressable/HeartButton_InfoPage";
import { Colors } from "../styles/Colors";
import {
  useWindowDimensions,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import {
  getUserLocation,
  haversine_distance,
  getCattery,
  userLikeACat,
  userUnLikeACat,
} from "../../firebaseUtils/user";
import { REACT_APP_GOOGLE_MAP_APP_KEY } from "@env";
import { Client } from "@googlemaps/google-maps-services-js";

export default function CatInformation({ route, navigation }) {
  // function RenderContent() {
  //   return (
  //     <View style={{ marginHorizontal: 15 }}>
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "space-evenly",
  //           marginVertical: 20,
  //         }}
  //       >
  //         <View style={styles.label}>
  //           <View style={styles.tags}>
  //             <Text style={styles.tagText}>Gender</Text>
  //             <Text style={styles.tagInfoText}>{cat.Gender}</Text>
  //           </View>
  //           <View style={styles.tags}>
  //             <Text style={styles.tagText}>Age</Text>
  //             <Text style={styles.tagInfoText}>
  //               {cat.month} {cat.month === 1 ? "month" : "months"}
  //             </Text>
  //           </View>
  //           <View style={styles.tags}>
  //             <Text style={styles.tagText}>Breed</Text>
  //             <Text style={styles.tagInfoText}>{cat.Breed}</Text>
  //           </View>
  //         </View>
  //       </View>
  //       <View style={{ flexDirection: "row" }}>
  //         <Text style={styles.catNameText}>{cat.Name}</Text>
  //         <Text
  //           style={{
  //             textAlign: "right",
  //             fontSize: 20,
  //             fontWeight: "bold",
  //             color: Colors.darkOrange,
  //             marginLeft: "auto",
  //             marginVertical: 20,
  //           }}
  //         >
  //           ${cat.Price}
  //         </Text>
  //       </View>
  //       {/* TODO: CATTERY LOCATION */}
  //       <View style={{ flexDirection: "row" }}>
  //         <Ionicons name="location-sharp" size={24} color={Colors.darkOrange} />
  //         <Text style={styles.textSecondary}>
  //           {cattery.address} ({distance})
  //         </Text>
  //       </View>
  //       <Text style={styles.date}>{cat.Birthday}</Text>
  //       <View style={styles.chipBox}>
  //         {cat.Tags ? (
  //           cat.Tags.map((tag, index) => (
  //             <Chip
  //               title={tag}
  //               key={index}
  //               containerStyle={styles.chip}
  //               color="#F59156"
  //               titleStyle={"Poppins"}
  //             />
  //           ))
  //         ) : (
  //           <></>
  //         )}
  //       </View>

  //       {/* contact info label */}
  //       <View style={styles.contactLabel}>
  //         <Text style={styles.contact}>Contact Info</Text>
  //         <View style={{ flexDirection: "row" }}>
  //           <View>
  //             <Text style={styles.text}>{cattery.catteryName}</Text>
  //             <Text style={styles.date}>Cattery</Text>
  //           </View>
  //           <View style={{ width: 200 }}></View>
  //           <View style={styles.buttonView}>
  //             <PhoneButton />
  //             <MessageButton />
  //           </View>
  //         </View>
  //       </View>
  //       {/* contact info label end */}
  //       <View style={styles.detailLabel}>
  //         <Text style={styles.contact}>Details</Text>
  //         <View>
  //           <Text style={styles.descriptionText}>{cat.Description}</Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

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
            haversine_distance(location, resp.data.result.geometry.location) +
              "mi"
          );
        });
    }
  }, [cattery, location]);

  useEffect(() => {
    const unSubscribe = onSnapshot(doc(db, "Cats", catId), async (catEntry) => {
      const catData = catEntry.data();
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
    navigation.navigate("PostNewCatScreen", {cat});
  };

  return (
    <ScrollView>
      <View>
        {/* Background Image */}
        <Image
          source={{ uri: cat.Picture }}
          resizeMode="cover"
          style={{ height: 450, width: 500 }}
        ></Image>

        {/* Heart button */}
        <View style={styles.floatingView}>
          <HeartButton_InfoPage
            notSelectedColor="white"
            isLiked={likeCats.includes(cat.id)}
            onPress={onClickLikeButton}
          />
        </View>

        {/* Edit Button */}
        {allowEdit && <View style={styles.editButtonView}>
          <Pressable onPress={onClickEditButton}>
            <Feather name="edit" size={18} color="white" />
          </Pressable>
        </View>}

        {/* Back Button*/}
        <View
          style={{
            padding: 5,
            backgroundColor: Colors.arrowBackground,
            borderRadius: 13,
            position: "absolute",
            top: 45,
            left: 22,
            width: 35,
            height: 35,
          }}
        >
          <Pressable onPress={navigation.goBack}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
        </View>

        {/* Main Contents */}
        <View
          style={{
            marginHorizontal: 15,
            borderRadius: 40,
          }}
        >
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
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="location-sharp"
              size={24}
              color={Colors.darkOrange}
            />
            <Text style={styles.addressText}>{cattery.address}</Text>
            <Text style={styles.addressText}>({distance})</Text>
          </View>
          {/* <Text style={styles.date}>{cat.Birthday}</Text> */}
          <Text style={styles.PostDateText}>Posted in {cat.Birthday}</Text>
          <View style={styles.chipBox}>
            {cat.Tags ? (
              cat.Tags.map((tag, index) => (
                <Chip
                  title={tag}
                  key={index}
                  containerStyle={styles.chip}
                  color={Colors.orangeText}
                />
              ))
            ) : (
              <></>
            )}
          </View>

          {/* contact info label */}
          <View style={styles.contactLabelContainer}>
            <Text style={styles.contactText}>Contact Info</Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                onPress={() =>
                  navigation.navigate("CatteryProfile", { cattery })
                }
              >
                <Image
                  source={{ uri: cat.Picture }}
                  resizeMode="cover"
                  style={{
                    padding: 8,
                    borderRadius: 100,
                    height: 40,
                    width: 40,
                    marginRight: 10,
                  }}
                ></Image>
              </Pressable>
              <View>
                <Text style={styles.catteryNameText}>
                  {cattery.catteryName}
                </Text>
                <Text style={styles.catteryLabelText}>Cattery</Text>
              </View>
              <View style={{ width: 200 }}></View>
              <View style={styles.buttonView}>
                <PhoneButton />
                <MessageButton />
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
  // button: {
  //   // margin: 10,
  //   marginTop: 1000,
  //   width: 100,
  //   alignSelf: "flex-end",
  // },
  // card: {
  //   width: "100%",
  //   position: "absolute",
  //   bottom: 0,
  // },
  label: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  tags: {
    backgroundColor: "white",
    marginHorizontal: 10,
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  },
  // tagText: {
  //   color: Colors.gray,
  //   padding: 5,
  //   width: 80,
  //   textAlign: "center",
  //   fontFamily: "Poppins",
  // },

  // textPrimary: {
  //   textAlign: "left",
  //   fontSize: 28,
  //   fontWeight: "bold",
  //   marginVertical: 20,
  //   fontFamily: "Poppins",
  // },
  // textSecondary: {
  //   marginBottom: 10,
  //   textAlign: "left",
  //   fontSize: 14,
  //   fontFamily: "Poppins",
  //   // marginLeft: 6,
  // },
  chip: {
    marginVertical: 8,
    // marginHorizontal: 6,
    marginRight: 10,
    height: 35,
  },
  buttonView: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  roundButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  chipBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-evenly",
  },
  // date: {
  //   color: Colors.gray,
  //   marginVertical: 8,
  //   fontFamily: "Poppins",
  // },
  text: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "Poppins",
  },
  floatingView: {
    position: "absolute",
    top: 45,
    right: 22,
  },
  editButtonView: {
    position: "absolute",
    top: 45,
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
    color: "#2E2525",
    fontFamily: "PoppinsSemiBold",
    marginBottom: 5,
  },

  catNameText: {
    fontSize: 28,
    color: "#2E2525",
    fontFamily: "PoppinsBold",
    marginBottom: 20,
  },
  priceText: {
    fontSize: 23,
    color: "#F6AC3D",
    fontFamily: "PoppinsMedium",
    textAlign: "right",
    marginLeft: "auto",
    marginBottom: 20,
  },

  addressText: {
    fontSize: 15,
    color: "#2E2525",
    fontFamily: "PoppinsMedium",
    marginLeft: 5,
  },
  PostDateText: {
    fontSize: 14,
    color: "rgba(46, 37, 37, 0.67)",
    fontFamily: "PoppinsLight",
    marginTop: 8,
    marginBottom: 15,
    marginLeft: 5,
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
    color: "#2E2525",
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
