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
import { Colors } from "../styles/Colors";

export default function CatInformation({ route, navigation }) {
  function RenderContent() {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginVertical: 20,
          }}
        >
          <View style={styles.label}>
            <View style={styles.tags}>
              <Text style={styles.tagText}>Gender</Text>
              <Text style={styles.tagInfoText}>{cat.Gender}</Text>
            </View>
            <View style={styles.tags}>
              <Text style={styles.tagText}>Age</Text>
              <Text style={styles.tagInfoText}>
                {cat.month} {cat.month === 1 ? "month" : "months"}
              </Text>
            </View>
            <View style={styles.tags}>
              <Text style={styles.tagText}>Breed</Text>
              <Text style={styles.tagInfoText}>{cat.Breed}</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textPrimary}>{cat.Name}</Text>
          <Text
            style={{
              textAlign: "right",
              fontSize: 20,
              fontWeight: "bold",
              color: Colors.darkOrange,
              marginLeft: "auto",
              marginVertical: 20,
            }}
          >
            ${cat.Price}
          </Text>
        </View>

        {/* TODO: CATTERY LOCATION */}
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="location-sharp" size={24} color={Colors.darkOrange} />
          <Text style={styles.textSecondary}>{cattery.address}</Text>
        </View>

        <Text style={styles.date}>{cat.Birthday}</Text>
        <View style={styles.chipBox}>
          {cat.Tags ? (
            cat.Tags.map((tag) => (
              <Chip title={tag} containerStyle={styles.chip} />
            ))
          ) : (
            <></>
          )}
        </View>

        <Text style={styles.contact}>Contact Info</Text>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text>Angel Girls</Text>
            <Text style={styles.date}>Cattery</Text>
          </View>
          <View style={styles.buttonView}>
            <PhoneButton />
            <MessageButton />
          </View>
        </View>
      </View>
    );
  }

  const catId = route.params.catId;
  const [cat, setCat] = useState({});
  const [cattery, setCattery] = useState({});
  console.log(cat);

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

  return (
    <View>
      <Image
        source={{ url: cat.Picture }}
        resizeMode="cover"
        style={{ height: 450, width: 500 }}
      ></Image>
      <View style={{ position: "absolute", top: 48, left: 12 }}>
        <View style={{ opacity: 0.5 }}>
          <Pressable onPress={navigation.goBack}>
            <Feather name="arrow-left-circle" size={24} color="white" />
          </Pressable>
        </View>
      </View>
      <BottomDrawer
        containerHeight={800}
        downDisplay={300}
        startUp={false}
        backgroundColor={Colors.dimGray}
        borderRadius={30}
      >
        <RenderContent />
      </BottomDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  tagInfoText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    margin: 10,
    marginTop: 1000,
    width: 100,
    alignSelf: "flex-end",
  },
  card: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  label: {
    alignItems: "center",
    flexDirection: "row",
  },
  tags: {
    backgroundColor: "white",
    marginHorizontal: 20,
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
  },
  tagText: {
    color: Colors.gray,
    padding: 5,
    width: 80,
    textAlign: "center",
  },
  textPrimary: {
    textAlign: "left",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "left",
    fontSize: 14,
    marginLeft: 6,
  },
  chip: {
    marginVertical: 8,
    marginHorizontal: 6,
    height: 35,
  },
  contact: {
    fontWeight: "bold",
    marginBottom: 20,
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
  date: {
    color: Colors.gray,
    marginVertical: 8,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
});
