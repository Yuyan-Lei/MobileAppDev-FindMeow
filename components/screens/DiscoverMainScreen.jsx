import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import { rootStackNavigate } from "../RootNavigation";
import DiscoverFilter from "./DiscoverFilter";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseUtils/firebase-setup";

export default function DiscoverMainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* values used for DiscoverFilter start */
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  /* values used for DiscoverFilter end */

  function resetAllFilters() {
    setValue(0);

    setCheck1(false);
    setCheck2(false);
    setCheck3(false);
    setCheck4(false);

    setSelectedBreed("");
    setSelectedAge("");
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    let q;
    if (selectedIndex == 0) {
      q = query(collection(db, "Cats"), orderBy("UploadTime", "desc"));
    } else {
      q = query(collection(db, "Cats"), orderBy("Price", "desc"));
    }
    const unSubscribe = onSnapshot(q, (snapshot) => {
      setData(
        snapshot.docs.map(entry => {
          const birthday = new Date(entry.data().Birthday);
          const now = new Date();
          const age = now.getMonth() -
            birthday.getMonth() +
            12 * (now.getFullYear() - birthday.getFullYear())
          return {
            name: entry.data().Breed,
            sex: entry.data().Gender,
            price: entry.data().Price,
            month: age,
            photo: entry.data().Picture,
            uploadTime: entry.data().UploadTime,
          };
        })
      )
    });

    return () => unSubscribe();
  }, []);

  const onFilterChange = (value) => {
    console.log(value);
    let dataCopy = data;
    if (value === 0) {
      setData(dataCopy.sort((d1, d2) => d2.uploadTime - d1.uploadTime));
      console.log(data);
    } else {
      setData(dataCopy.sort((d1, d2) => d1.price - d2.price));
    }
    setSelectedIndex(value);
  };

  return (
    <View style={{ marginHorizontal: 16, marginTop: 55, marginBottom: 200 }}>
      <View style={{ margin: 12 }}>
        <View>
          <TitleText>Discover</TitleText>
        </View>
        <View style={{ position: "absolute", right: 0 }}>
          <FilterButton onPress={() => setVisible(true)} />
        </View>
      </View>

      <DiscoverFilter
        states={{
          visible,
          setVisible,
          value,
          setValue,
          check1,
          setCheck1,
          check2,
          setCheck2,
          check3,
          setCheck3,
          check4,
          setCheck4,
          selectedBreed,
          setSelectedBreed,
          selectedAge,
          setSelectedAge,
          resetAllFilters,
        }}
      />

      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={onFilterChange}
        buttons={["Latest Post", "Nearby", "Lowest Price"]}
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
