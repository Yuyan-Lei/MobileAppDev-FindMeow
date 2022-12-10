import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import {
  calculateDistance,
  getAllCatteries,
  getUserData,
  getUserLocation,
} from "../../firebaseUtils/user";
import { CatCard } from "../cards/CatCard";
import { stateFullNameToAbbr } from "../listContents/allStates";
import { FilterButton } from "../pressable/FilterButton";
import { MapButton } from "../pressable/MapButton";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";
import DiscoverFilter from "./DiscoverFilter";
import MapPage from "./MapPage";
import PostNewCatScreen from "./PostNewCatScreen";
import { FontSizes } from "../styles/FontSizes";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { ButtonGroup } from "../pressable/ButtonGroup";

function MainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* values used for DiscoverFilter start */
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);

  const [selectedBreed, setSelectedBreed] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState([0, 10000]);

  const [filterTrigger, setFilterTrigger] = useState(false);

  /* Tags for filter */
  const [vaccinated, setVaccinated] = useState(false);
  const [vetChecked, setVetChecked] = useState(false);
  const [dewormed, setDewormed] = useState(false);
  const [ready, setReady] = useState(false);
  const [neutered, setNeutered] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [catsData, setCatsData] = useState([]);
  const [likeCats, setLikeCats] = useState([]);
  const [rawCatData, setRawCatData] = useState(null);

  const [userLocation, setUserLocation] = useState(null);

  const [catteries, setCatteries] = useState(null);

  const [enableNotification, setEnableNotification] = useState(false);
  const [maxNotificationRange, setMaxNotificationRange] = useState(0);
  const availableSelections = ["Newer Post", "Nearby", "Lower Price"];

  const refRBSheet = useRef();
  const flatListRef = useRef();

  /* use reference for setInterval functions
     otherwise functions cannot get newest variables */
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.selectedIndex = selectedIndex;
    savedCallback.selectedBreed = selectedBreed;
    savedCallback.selectedAge = selectedAge;
    savedCallback.selectedState = selectedState;
    savedCallback.selectedGender = selectedGender;
    savedCallback.selectedPrice = selectedPrice;
  }, [
    selectedIndex,
    selectedBreed,
    selectedAge,
    selectedState,
    selectedGender,
    selectedPrice,
  ]);

  /* values used for DiscoverFilter end */

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

  function resetAllFilters() {
    setValue(0);

    setSelectedBreed("");
    setSelectedAge("");
    setSelectedState("");
    setSelectedGender("");
    setSelectedPrice([0, 10000]);

    setVaccinated(false);
    setVetChecked(false);
    setDewormed(false);
    setReady(false);
    setNeutered(false);
    setSelectedTags([]);
  }

  function flipFilterTrigger() {
    setFilterTrigger(!filterTrigger);
  }

  // Get user notification settings first.
  useEffect(() => {
    getUserData().then((userData) => {
      setEnableNotification(userData.enableNotification || false);
      setMaxNotificationRange(userData.maxNotificationRange || 0);
    });
  });

  // When tap notification, if only one new cat is added, navigate to the cat information page.
  // Otherwise stay in discover main page.
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const newCats = response.notification.request.content.data.newCats;
        if (newCats.length === 1) {
          navigation.navigate("CatInformation", { catId: newCats[0].id });
        }
      }
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "Users"), where("isCattery", "==", true));
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const newCatteries = [];
      querySnapshot.forEach((doc) => {
        newCatteries.push({
          email: doc.id,
          ...doc.data(),
        });
      });
      setCatteries(newCatteries);
    });

    return unSubscribe;
  }, []);

  function makeQuery() {
    try {
      let clauseBreed, clauseGender;

      const selectedBreed = savedCallback.selectedBreed;
      const selectedGender = savedCallback.selectedGender;

      if (selectedBreed !== "" && selectedBreed !== "All") {
        clauseBreed = where("Breed", "==", selectedBreed);
      }

      if (selectedGender !== "" && selectedGender !== "All") {
        clauseGender = where("Gender", "==", selectedGender);
      }

      const constraints = [clauseBreed, clauseGender].filter(
        (item) => item !== undefined
      );

      const q = query(collection(db, "Cats"), ...constraints);
      return q;
    } catch (e) {
      console.log(e);
    }
  }

  // custom hook for getting previous value
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }
  const previousRawCatData = usePrevious(rawCatData);

  useEffect(() => {
    getUserLocation().then((location) => setUserLocation(location));
  }, []);

  useEffect(() => {
    const q = makeQuery();
    const unSubscribe = onSnapshot(q, async (catSnapShot) => {
      try {
        const allCatteries = catteries || (await getAllCatteries());
        setCatteries(allCatteries);
        const location = userLocation || (await getUserLocation());
        setUserLocation(location);

        const dataBeforeFiltering = catSnapShot.docs.map((catDoc) => {
          const birthday = new Date(catDoc.data().Birthday);
          const now = new Date();

          const cattery = allCatteries.find(
            (ca) => ca.email === catDoc.data().Cattery
          );
          // if cattery doesn't have location, use 9999 to make cat in the bottom.
          const distance =
            cattery.geoLocation && location
              ? calculateDistance(location, cattery.geoLocation)
              : null;
          let age =
            now.getMonth() -
            birthday.getMonth() +
            12 * (now.getFullYear() - birthday.getFullYear());
          // age cannot be negative
          if (age === undefined || isNaN(age) || age < 0) {
            age = 0;
          }

          return {
            ...catDoc.data(),
            id: catDoc.id,
            name: catDoc.data().Breed,
            sex: catDoc.data().Gender,
            price: catDoc.data().Price,
            month: age,
            photo: catDoc.data().Picture,
            cattery: catDoc.data().Cattery,
            distance,
            uploadTime: catDoc.data().UploadTime,
            tags: catDoc.data().Tags,
            catteryDoc: cattery,
            geoLocation: cattery.geoLocation,
          };
        });

        setRawCatData(dataBeforeFiltering);
      } catch (e) {
        console.error(e);
      }
    });

    return unSubscribe;
  }, [selectedBreed, selectedGender]);

  useEffect(() => {
    if (previousRawCatData) {
      // After each refresh, get all new added cat within maxNotificationRange.
      makeNotification(
        rawCatData,
        previousRawCatData,
        maxNotificationRange,
        enableNotification
      );
    }
  }, [rawCatData]);

  useEffect(() => {
    /* filter cats data */
    const dataBeforeSorting = filterCatsData(
      rawCatData,
      selectedAge,
      selectedPrice,
      selectedState
    );

    /* sort cats data */
    const sortedData = sortCatsData(dataBeforeSorting, selectedIndex);
    setCatsData(sortedData);
  }, [rawCatData, selectedAge, selectedPrice, selectedState, filterTrigger]);

  async function makeNotification(
    allCats,
    catsBeforeRefresh,
    maxNotificationRange,
    enableNotification
  ) {
    const addedCatWithinRange = allCats.filter((cat) => {
      return (
        !catsBeforeRefresh.some((existingCat) => existingCat.id === cat.id) &&
        cat.distance <= maxNotificationRange
      );
    });

    // If any new cats within maxNotificationRange are added, send out a notification.
    if (addedCatWithinRange.length > 0 && enableNotification) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "FindMeow",
          body:
            (addedCatWithinRange.length === 1
              ? "A new cat is "
              : addedCatWithinRange.length + " new cats are ") +
            "available nearby. Check it now!",
          data: {
            newCats: addedCatWithinRange,
          },
        },
        trigger: { seconds: 1 },
      });
    }
  }

  function filterCatsData(
    dataBeforeFiltering,
    selectedAge,
    selectedPrice,
    selectedState
  ) {
    if (!dataBeforeFiltering) {
      return [];
    }
    return dataBeforeFiltering
      .filter((cat) => {
        return (
          selectedTags.length === 0 ||
          selectedTags.every((tag) => {
            return cat.tags.indexOf(tag) !== -1;
          })
        );
      })
      .filter((cat) => {
        switch (selectedAge) {
          case "< 1 month":
            return cat.month < 1;
          case "1 - 3 months":
            return cat.month >= 1 && cat.month <= 3;
          case "3 - 6 months":
            return cat.month >= 3 && cat.month <= 6;
          case "6 - 12 months":
            return cat.month >= 6 && cat.month <= 12;
          case "> 1 year":
            return cat.month > 12;
          default:
            return true;
        }
      })
      .filter(
        (cat) => cat.price >= selectedPrice[0] && cat.price <= selectedPrice[1]
      )
      .filter((cat) => {
        return (
          selectedState === "All" ||
          selectedState === "" ||
          (cat.catteryDoc.shortAddress &&
            cat.catteryDoc.shortAddress.slice(-2) ===
              stateFullNameToAbbr[selectedState])
        );
      })
      .slice(0);
  }

  function sortCatsData(dataBeforeSorting, index) {
    let sortedData = [];
    // 1. newer post
    sortedData[0] = dataBeforeSorting
      .slice(0)
      .sort((d1, d2) => d2.uploadTime - d1.uploadTime);
    // 2. nearby Post
    try {
      sortedData[1] = dataBeforeSorting
        .slice(0)
        .sort((d1, d2) => d1.distance - d2.distance);
    } catch (e) {
      console.log("error sorting by distance", e);
    }
    // 3. Lower Price
    sortedData[2] = dataBeforeSorting
      .slice(0)
      .sort((d1, d2) => d1.price - d2.price);

    return sortedData;
  }

  const { height, width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View>
          <TitleText>Discover</TitleText>
        </View>
        <View style={styles.filterButtonView}>
          <FilterButton
            onPress={() => refRBSheet.current.open()}
            size={FontSizes.smallFilter}
            length={40}
          />
        </View>
        <View style={styles.mapButtonView}>
          <MapButton
            onPress={() => {
              if (
                catsData.length !== 0 &&
                catsData[selectedIndex].length !== 0
              ) {
                navigation.navigate("MapPage", {
                  catsData: catsData[selectedIndex],
                });
              }
            }}
            size={FontSizes.mapIcon}
            length={40}
          />
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={styles.RBSheetCustomStyles}
        height={height * 0.8}
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
            selectedPrice,
            setSelectedPrice,

            tags: {
              selectedTags,
              setSelectedTags,
              vaccinated,
              setVaccinated,
              vetChecked,
              setVetChecked,
              dewormed,
              setDewormed,
              ready,
              setReady,
              neutered,
              setNeutered,
              selectedTags,
              setSelectedTags,
            },

            resetAllFilters,
            refRBSheet,
            flipFilterTrigger,
          }}
        />
      </RBSheet>

      <ButtonGroup
        selectedValue={availableSelections[selectedIndex]}
        setSelectedValue={(value) => {
          const index = availableSelections.indexOf(value);
          flatListRef.current.scrollToIndex({ index, animated: true });
        }}
        selections={availableSelections}
      />

      <View style={{ flex: 1 }}>
        <SwiperFlatList
          ref={flatListRef}
          onViewableItemsChanged={(params) =>
            setSelectedIndex(params.changed?.[0]?.index)
          }
        >
          <View
            style={{ width, justifyContent: "center", paddingHorizontal: 16 }}
          >
            <FlatList
              data={catsData[0]}
              renderItem={({ item, index }) => (
                <CatCard
                  cat={item}
                  navigation={navigation}
                  userLikedCats={likeCats}
                />
              )}
              numColumns={2}
              refreshControl={<RefreshControl />}
              ListFooterComponent={<View style={{ height: 100 }} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View
            style={{ width, justifyContent: "center", paddingHorizontal: 16 }}
          >
            <FlatList
              data={catsData[1]}
              renderItem={({ item, index }) => (
                <CatCard
                  cat={item}
                  navigation={navigation}
                  userLikedCats={likeCats}
                />
              )}
              numColumns={2}
              refreshControl={<RefreshControl />}
              ListFooterComponent={<View style={{ height: 100 }} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View
            style={{ width, justifyContent: "center", paddingHorizontal: 16 }}
          >
            <FlatList
              data={catsData[2]}
              renderItem={({ item, index }) => (
                <CatCard
                  cat={item}
                  navigation={navigation}
                  userLikedCats={likeCats}
                />
              )}
              numColumns={2}
              refreshControl={<RefreshControl />}
              ListFooterComponent={<View style={{ height: 100 }} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </SwiperFlatList>
      </View>

      {/* floating map button */}
      {selectedIndex === 1 ? (
        <View
          style={{
            position: "absolute",
            top: height - 135,
            width: width,
            alignItems: "center",
          }}
        ></View>
      ) : (
        <View />
      )}
    </View>
  );
}

export default function DiscoverMainScreen({ route, navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="CatInformation" component={CatInformation} />
      <Stack.Screen name="PostNewCatScreen" component={PostNewCatScreen} />
      <Stack.Screen name="CatteryProfile" component={CatteryProfileScreen} />
      <Stack.Screen name="MapPage" component={MapPage} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  RBSheetCustomStyles: {
    wrapper: {
      backgroundColor: Colors.filterWrapper,
      draggableIcon: {
        backgroundColor: Colors.dragglableIcon,
        width: 100,
      },
    },
    container: {
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
    },
  },
  filterButtonView: {
    position: "absolute",
    right: 24,
    top: 9,
  },
  mapButtonView: {
    position: "absolute",
    left: 24,
    top: 10,
  },
  headerView: {
    padding: 12,
  },
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: Colors.white,
  },
  showMapButton: {
    width: 143,
    alignItems: "center",
    height: 39,
    borderRadius: 10,
  },
});
