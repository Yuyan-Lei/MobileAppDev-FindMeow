import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
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
import { FilterButtons } from "../pressable/FilterButtons";
import { Colors } from "../styles/Colors";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";
import CatteryProfileScreen from "./CatteryProfileScreen";
import DiscoverFilter from "./DiscoverFilter";
import MapPage from "./MapPage";
import PostNewCatScreen from "./PostNewCatScreen";

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

  const [data, setData] = useState([]);
  const [allCats, setAllCats] = useState([]);

  const refRBSheet = useRef();

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

  const [likeCats, setLikeCats] = useState([]);

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

  const [lastTimeRefreshCatData, setLastTimeRefreshCatData] = useState(0);
  const [refreshCatDataLock, setRefreshCatDataLock] = useState(false);
  const [enableNotification, setEnableNotification] = useState(false);
  const [maxNotificationRange, setMaxNotificationRange] = useState(0);

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

  const [catteries, setCatteries] = useState(null);

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

  async function refreshCatData({ forceLoad = false } = {}) {
    if (!forceLoad && refreshCatDataLock) return;
    setRefreshCatDataLock(true);

    // prevent running it too much in a short time
    const currentTimeInMill = new Date().getTime();
    if (!forceLoad && currentTimeInMill - lastTimeRefreshCatData < 5000) {
      return;
    }
    setLastTimeRefreshCatData(currentTimeInMill);

    // setSelectedIndex(selectedIndex);
    let location = await getUserLocation();
    try {
      let clauseBreed, clauseAge, clauseState, clauseGender, clauseTags;

      const selectedIndex = savedCallback.selectedIndex;
      const selectedBreed = savedCallback.selectedBreed;
      const selectedAge = savedCallback.selectedAge;
      const selectedState = savedCallback.selectedState;
      const selectedGender = savedCallback.selectedGender;
      const selectedPrice = savedCallback.selectedPrice;

      if (selectedBreed !== "" && selectedBreed !== "All") {
        clauseBreed = where("Breed", "==", selectedBreed);
      }

      if (selectedGender !== "" && selectedGender !== "All") {
        clauseGender = where("Gender", "==", selectedGender);
      }

      const constraints = [
        clauseBreed,
        clauseAge,
        clauseState,
        clauseGender,
        clauseTags,
      ].filter((item) => item !== undefined);

      const q = query(collection(db, "Cats"), ...constraints);

      const catSnapShot = await getDocs(q);

      let allCatteries = catteries || (await getAllCatteries());

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
        };
      });

      /* filter cats data */
      const dataBeforeSorting = filterCatsData(
        dataBeforeFiltering,
        selectedAge,
        selectedPrice,
        selectedState
      );

      /* sort cats data */
      const sortedData = sortCatsData(dataBeforeSorting, selectedIndex);
      setData(sortedData);

      // After each refresh, get all new added cat within maxNotificationRange.
      const addedCatWithinRange = dataBeforeFiltering.filter((cat) => {
        return (
          !allCats.some((existingCat) => existingCat.id === cat.id) &&
          cat.distance <= maxNotificationRange
        );
      });
      setAllCats(dataBeforeFiltering);

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
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshCatDataLock(false);
    }
  }

  function filterCatsData(
    dataBeforeFiltering,
    selectedAge,
    selectedPrice,
    selectedState
  ) {
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
    // 1. newer post
    if (index === 0) {
      return dataBeforeSorting
        .slice(0)
        .sort((d1, d2) => d2.uploadTime - d1.uploadTime);
    }
    // 2. nearby Post
    else if (index === 1) {
      try {
        return dataBeforeSorting
          .slice(0)
          .sort((d1, d2) => d1.distance - d2.distance);
      } catch (e) {
        console.log("error sorting by distance", e);
      }
    }
    // 3. Lower Price
    else if (index === 2) {
      return dataBeforeSorting.slice(0).sort((d1, d2) => d1.price - d2.price);
    }
  }

  const { height, width } = useWindowDimensions();

  /* data collector used for top filter tags - start */
  useEffect(() => {
    refreshCatData({ forceLoad: true });
  }, [filterTrigger]);

  useEffect(() => {
    const selectedIndex = savedCallback.selectedIndex;
    sortedData = sortCatsData(data, selectedIndex);
    setData(sortedData);
  }, [selectedIndex]);
  /* data collector used for top filter tags - end */

  /* events for top filter tags - start */
  const onFilterChange = (value) => {
    setSelectedIndex(value);
    // refreshCatData({ selectedIndex: value, forceLoad: true });
  };
  /* events for top filter tags - end */

  useEffect(() => {
    const interval = setInterval(() => {
      refreshCatData({ selectedIndex: savedCallback.selectedIndex });
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
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

      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={onFilterChange}
        buttons={["Newer Post", "Nearby", "Lower Price"]}
      />

      <View style={{ paddingHorizontal: 16 }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <CatCard
              cat={item}
              navigation={navigation}
              isLiked={likeCats.includes(item.id)}
            />
          )}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={refreshCatDataLock}
              onRefresh={() => {
                refreshCatData({ selectedIndex, forceLoad: true });
              }}
            />
          }
          ListFooterComponent={<View style={{ height: 80 }} />}
          showsVerticalScrollIndicator={false}
        />
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
        >
          <View
            style={{
              width: 143,
              backgroundColor: Colors.orange,
              alignItems: "center",
              height: 39,
              borderRadius: 10,
            }}
          >
            <Pressable onPress={() => navigation.navigate("MapPage")}>
              <Text
                style={{
                  padding: 8,
                  color: "white",
                  fontFamily: "PoppinsMedium",
                }}
              >
                Show in Map
              </Text>
            </Pressable>
          </View>
        </View>
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
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      draggableIcon: {
        backgroundColor: "#EFEFEF",
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
    top: 18,
  },
  headerView: {
    padding: 12,
  },
  container: {
    // paddingHorizontal: 12,
    paddingTop: 55,
    paddingBottom: 200,
    backgroundColor: "white",
  },
});
