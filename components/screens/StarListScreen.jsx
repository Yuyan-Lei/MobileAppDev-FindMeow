import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View, Text } from "react-native";
import { getAllCats } from "../../firebaseUtils/cat";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { getAllCatteries, getUserLikeCats } from "../../firebaseUtils/user";
import { BreederCard } from "../cards/BreederCard";
import { CatCard } from "../cards/CatCard";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";

function CatsScreen({ navigation, cats }) {

  return (
    <View style={{ padding: 12 }}>
      <FlatList
        data={cats}
        renderItem={({ item, index }) => {
            return <CatCard 
              key={item.id}
              cat={item} 
              navigation={navigation} />}}
        numColumns={2}
        ListFooterComponent={<View style={{ height: 60 }} />}
      />
    </View>
  );
}

function CatteriesScreen({ navigation, catteries }) {

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        data={catteries}
        renderItem={({ item, index }) => {
            return <BreederCard 
            key={item.email}
            cattery={item} 
            navigation={navigation} />}}
        numColumns={1}
        ListFooterComponent={<View style={{ height: 60 }} />}
      />
    </View>
  );
}

function MainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [likeCats, setLikeCats] = useState([]);
  const [likeCatteries, setLikeCatteries] = useState([]);
  /* subscribe user likes to display liked cats - start */
  useEffect(() => {
    const unSubscribe =
      onSnapshot(doc(db, 'Users', getCurrentUserEmail()),
        (snapshot) => {
          const likeCats = snapshot.data().likeCats;
          getAllCats().then((catsSnapshots) => {
            setLikeCats(
              catsSnapshots.docs.map((entry) => {
                const birthday = new Date(entry.data().Birthday);
                const now = new Date();
                const age =
                  now.getMonth() -
                  birthday.getMonth() +
                  12 * (now.getFullYear() - birthday.getFullYear());
                return {
                  id: entry.id,
                  name: entry.data().Breed,
                  sex: entry.data().Gender,
                  price: entry.data().Price,
                  month: age,
                  photo: entry.data().Picture,
                  cattery: entry.data().Cattery,
                  uploadTime: entry.data().UploadTime,
                };
              }).filter(entry =>
                likeCats.includes(entry.id))
              .sort((d1, d2) => d2.uploadTime - d1.uploadTime)
            );
          })
        });

    return () => unSubscribe();
  }, [])
  /* subscribe user likes to display liked cats - end */
  /* subscribe user likes to display liked catteries - start */
  useEffect(() => {
    const unSubscribe =
      onSnapshot(doc(db, 'Users', getCurrentUserEmail()),
        (snapshot) => {
          const likeCatteries = snapshot.data().likeCatteries || [];
          getAllCatteries().then((snapshot) => {
            setLikeCatteries(
              snapshot.filter(entry =>
                likeCatteries.includes(entry.email))
            );
          })
        });

    return () => unSubscribe();
  }, [])
  /* subscribe user likes to display liked catteries - end */

  return (
    <View style={styles.container}>
      <View style={{ margin: 12 }}>
        <View>
          <TitleText>Collections</TitleText>
        </View>
      </View>

      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        buttons={["Cats", "Catteries"]}
      />
      {
        selectedIndex === 0 && <CatsScreen 
        navigation={navigation} 
        cats={likeCats} /> 
      }
      {
        selectedIndex === 1 && 
        <CatteriesScreen navigation={navigation} 
          catteries={likeCatteries} />
      }
    </View>)
}

export default function StarListScreen({ route, navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="CatInformation" component={CatInformation} />
      <Stack.Screen name="CatteryProfile" component={CatteryProfileScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 55,
    backgroundColor: "white",
    flex: 1,
  },
})