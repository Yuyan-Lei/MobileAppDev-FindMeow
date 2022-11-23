import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import { rootStackNavigate } from "../RootNavigation";
import DiscoverFilter from "./DiscoverFilter";
import { collection, onSnapshot, query, orderBy, doc } from "firebase/firestore";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { getAllCats } from "../../firebaseUtils/cat";
import { getUserLikeCats } from "../../firebaseUtils/user";

export default function StarListScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [data, setData] = useState([]);
  useEffect(() => {
    let q;
    if (selectedIndex == 0) {
      q = query(collection(db, "Cats"), orderBy("UploadTime", "desc"));
    } else {
      q = query(collection(db, "Cats"), orderBy("Price", "desc"));
    }
    const unSubscribe = onSnapshot(q, (snapshot) => {
      getUserLikeCats().then((likeCats) => {
        setData(
          snapshot.docs.map((entry) => {
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
              uploadTime: entry.data().UploadTime,
            };
          }).filter(entry => 
            likeCats.includes(entry.id))
        );
      });
    });

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    const unSubscribe = 
      onSnapshot(doc(db, 'Users', getCurrentUserEmail()), 
        (snapshot) => {
          const likeCats = snapshot.data().likeCats;
          getAllCats().then((catsSnapshots)=> {
            setData(
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
                  uploadTime: entry.data().UploadTime,
                };
              }).filter(entry => 
                likeCats.includes(entry.id))
            );
          })
        });
    
    return () => unSubscribe();
  }, [])

  const onFilterChange = (value) => {
    let dataCopy = data;
    if (value === 0) {
      setData(dataCopy.sort((d1, d2) => d2.uploadTime - d1.uploadTime));
    } else {
      Alert.alert("The button function is coming soon~", "See you next time!", [
        {
          text: "Sad",
          onPress: () => console.log("Feel Sad about no button function now"),
        },
        {
          text: "Wait for you",
          onPress: () => console.log("Wait for coming button function"),
        },
      ]);
      setData(dataCopy.sort((d1, d2) => d1.price - d2.price));
    }
    setSelectedIndex(value);
  };

  return (
    <View style={{ marginHorizontal: 16, marginTop: 55, marginBottom: 200 }}>
      <View style={{ margin: 12 }}>
        <View>
          <TitleText>Collections</TitleText>
        </View>
      </View>

      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={onFilterChange}
        buttons={["Cats", "Catteries"]}
      />
      <View style={{ padding: 12 }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => <CatCard cat={item} />}
          numColumns={2}
          ListFooterComponent={<View style={{ height: 60 }} />}
        />
      </View>
    </View>
  );
}