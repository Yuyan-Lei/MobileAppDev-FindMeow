import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  collection,
  onSnapshot, orderBy, query
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { db } from "../../firebaseUtils/firebase-setup";
import { CatCard } from "../cards/CatCard";
import { FilterButton } from "../pressable/FilterButton";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import DiscoverFilter from "./DiscoverFilter";

function MainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);


  /* values used for DiscoverFilter start */
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);

  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");

  const refRBSheet = useRef();
  /* values used for DiscoverFilter end */


  function resetAllFilters() {
    setValue(0);

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
      // TODO ...
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
          let age =
            now.getMonth() -
            birthday.getMonth() +
            12 * (now.getFullYear() - birthday.getFullYear());
          // age cannot be negative
          if (age === undefined || isNaN(age) || age < 0) {
            age = 0;
          }

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
    let dataCopy = data;
    // 1. newer post
    if (value === 0) {
      setData(dataCopy.sort((d1, d2) => d2.uploadTime - d1.uploadTime));
    }
    // 2. nearby Post
    else if (value === 1) {
      Alert.alert("Feature for this button is coming soon~", "See you next time!", [
        { text: "Sad" },
        { text: "Wait for you" },
      ])
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
      style={styles.container}
    >
      <View style={styles.headerView}>
        <View>
          <TitleText>Discover</TitleText>
        </View>
        <View style={styles.filterButtonView}>
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
        customStyles={styles.RBSheetCustomStyles}
        height={670}
      >
        <DiscoverFilter
          states={{
            visible,
            setVisible,
            value,
            setValue,

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

      <View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => <CatCard cat={item} navigation={navigation} />}
          numColumns={2}
          ListFooterComponent={<View style={{ height: 80 }} />}
        />
      </View>
    </View>)
}

export default function DiscoverMainScreen({ route, navigation }) {

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="CatInformation" component={CatInformation} />
    </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
  RBSheetCustomStyles: {
    wrapper: {
      backgroundColor: "transparent",
      container: {
        borderRadius: 28,
      },
      draggableIcon: {
        backgroundColor: "#EFEFEF",
        width: 100,
      },
    },
  },
  filterButtonView: {
    position: "absolute",
    right: 24,
    top: 18,
  },
  headerView: {
    padding: 12,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 200,
  },
})