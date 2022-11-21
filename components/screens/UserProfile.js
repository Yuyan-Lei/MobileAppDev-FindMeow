import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import { rootStackNavigate } from "../RootNavigation";
import DiscoverFilter from "./DiscoverFilter";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseUtils/firebase-setup";
import { Colors } from "../styles/Colors";

export default function UserProfile({ route, navigation }) {
  return (
    <View style={{ marginHorizontal: 16, marginTop: 55, marginBottom: 200 }}>
      <View style={{ margin: 12 }}>
        <View>
          <TitleText>Profile</TitleText>
        </View>
      </View>

      <View style={{ padding: 12 }}>
        {/* add a profile photo here */}
        <Text
          style={{
            color: "orange",
            fontWeight: "700",
            fontSize: 24,
            textAlign: "center",
            paddingBottom: 20,
          }}
        >
          Corrine
        </Text>
        <Pressable
          //   onPress={resetHandler}
          style={styles.button}
        >
          <Text style={styles.text}>Change Profile Photo</Text>
        </Pressable>

        <Pressable
          //   onPress={resetHandler}
          style={styles.button}
        >
          <Text style={styles.text}>Change Password</Text>
        </Pressable>

        <Pressable
          //   onPress={resetHandler}
          style={styles.button}
        >
          <Text style={styles.text}>Enable Notifications</Text>
        </Pressable>

        {/* Log Out button */}
        <Pressable
          //   onPress={resetHandler}
          style={{
            backgroundColor: Colors.messageButton,
            padding: 8,
            borderRadius: 25,
            height: 40,
            width: 120,
            marginHorizontal: 130,
            marginTop: 40,
          }}
        >
          <Text
            style={{
              alignItems: "center",
              color: "white",
              fontSize: 18,
              marginLeft: 20,
            }}
          >
            Log Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    height: 40,
    width: 363,
    marginVertical: 20,
  },
  text: {
    alignItems: "center",
    color: "black",
    fontSize: 18,
  },
});
