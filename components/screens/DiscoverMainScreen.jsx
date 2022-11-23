import React, { useState, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, View, Button, Alert } from "react-native";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import { rootStackNavigate } from "../RootNavigation";
import DiscoverFilter from "./DiscoverFilter";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
  const [selectedState, setSelectedState] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");

  const refRBSheet = useRef();
  /* values used for DiscoverFilter end */


  function resetAllFilters() {
    setValue(0);

    setCheck1(false);
    setCheck2(false);
    setCheck3(false);
    setCheck4(false);

    setSelectedBreed("");
    setSelectedAge("");
    setSelectedState("");
    setSelectedGender("");
  }


  /* data collector used for top filter tags - start */
  const [data, setData] = useState([]);
  useEffect(() => {
    let q;
    // 1. Newer Post
    if (selectedIndex == 0) {
      q = query(collection(db, "Cats"), orderBy("UploadTime", "desc"));
    }
    // 2. Nearby Post
    else if (selectedIndex == 1) {
      q = query(collection(db, "Cats"), orderBy("UploadTime", "desc"));
      // todo ...
    }
    // 3. Lower Price
    else if (selectedIndex == 2) {
      q = query(collection(db, "Cats"), orderBy("Price", "desc"));
    }
    const unSubscribe = onSnapshot(q, (snapshot) => {
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
            cattery: entry.data().Cattery,
            uploadTime: entry.data().UploadTime,
          };
        })
      );
    });

    return () => unSubscribe();
  }, []);
  /* data collector used for top filter tags - end */


  /* events for top filter tags - start */
  const onFilterChange = (value) => {
    console.log(value);
    let dataCopy = data;
    // 1. newer post
    if (value === 0) {
      setData(dataCopy.sort((d1, d2) => d2.uploadTime - d1.uploadTime));
    }
    // 2. nearby Post
    else if (value === 1) {
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
    }
    // 3. Lower Price
    else if (value === 2) {
      setData(dataCopy.sort((d1, d2) => d1.price - d2.price));
    }
    setSelectedIndex(value);
  };
  /* events for top filter tags - end */


  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 55,
        paddingBottom: 200,
      }}
    >
      <View style={{ padding: 12 }}>
        <View>
          <TitleText>Discover</TitleText>
        </View>
        <View style={{ position: "absolute", right: 24, top: 18 }}>
          <FilterButton
            onPress={() => refRBSheet.current.open()}
            size={18}
            length={29}
          />
        </View>
      </View>

      {/* <Button
        title="OPEN BOTTOM SHEET"
        onPress={() => refRBSheet.current.open()}
      /> */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          container: {
            borderRadius: 28,
          },
          draggableIcon: {
            backgroundColor: "#EFEFEF",
            width: 100,
          },
        }}
        height={670}
      >
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

            selectedState,
            setSelectedState,
            selectedBreed,
            setSelectedBreed,
            selectedAge,
            setSelectedAge,
            selectedGender,
            setSelectedGender,
            
            resetAllFilters,
            refRBSheet,
          }}
        />
      </RBSheet>

      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={onFilterChange}
        buttons={["Newer Post", "Nearby", "Lower Price"]}
      />

      <View style={{ padding: 12 }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => <CatCard cat={item} />}
          numColumns={2}
          ListFooterComponent={<View style={{ height: 80 }} />}
        />
      </View>
    </View>
  );
}
