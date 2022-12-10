import * as Location from 'expo-location';
import { arrayRemove, arrayUnion } from "firebase/firestore";
import haversine from 'haversine-distance';
import { Alert } from "react-native";
import { globalVariables } from "../utils/globalVariables";
import {
  getAllFromDB,
  getCurrentUserEmail,
  getFromDB,
  updateToDB,
  wrtieToDB
} from "./firestore";
import { REACT_APP_GOOGLE_MAP_APP_KEY } from "@env";
import { Client } from "@googlemaps/google-maps-services-js";

const collectionName = "Users";

export async function createUser(userEmail) {
  const newUser = {
    isCattery: false,
    likeCats: [],
    likeCatteries: [],
  };
  return await wrtieToDB(newUser, collectionName, userEmail);
}

function triggerStarListNeedReload() {
  globalVariables.starListNeedReload = true;
}

export async function userLikeACat(catId) {
  const email = getCurrentUserEmail();
  const newLikesArrayEntry = {
    likeCats: arrayUnion(catId),
  };
  await updateToDB(email, collectionName, newLikesArrayEntry);
  triggerStarListNeedReload()
}

export async function userUnLikeACat(catId) {
  const email = getCurrentUserEmail();
  const newLikesArrayEntry = {
    likeCats: arrayRemove(catId),
  };
  await updateToDB(email, collectionName, newLikesArrayEntry);
  triggerStarListNeedReload()
}

export async function userLikeACattery(catteryEmail) {
  const email = getCurrentUserEmail();
  const newLikesArrayEntry = {
    likeCatteries: arrayUnion(catteryEmail),
  };
  await updateToDB(email, collectionName, newLikesArrayEntry);
  triggerStarListNeedReload()
}

export async function userUnLikeACattery(catteryEmail) {
  const email = getCurrentUserEmail();
  const newLikesArrayEntry = {
    likeCatteries: arrayRemove(catteryEmail),
  };
  await updateToDB(email, collectionName, newLikesArrayEntry);
  triggerStarListNeedReload()
}

export async function getUserLikeCats() {
  const email = getCurrentUserEmail();

  return await getFromDB(email, collectionName).then(
    (docSnap) => docSnap.data().likeCats
  );
}

export async function getUserData() {
  const email = getCurrentUserEmail();

  if (email === "") {
    return Promise.resolve();
  }

  return await getFromDB(email, collectionName).then((docSnap) =>
    docSnap.data()
  );
}

export async function deleteCatInCattery(catId) {
  const email = getCurrentUserEmail();

  const newLikesArrayEntry = {
    cats: arrayRemove(catId),
  };
  return await updateToDB(email, collectionName, newLikesArrayEntry);
}

export async function createCattery(
  userEmail,
  { catteryName, breed, phoneNumber, website, address, shortAddress, placeId }
) {
  const googleMapClient = new Client({});
  const catteryPlaceDetails = await googleMapClient
    .placeDetails({
      params: {
        place_id: placeId,
        key: REACT_APP_GOOGLE_MAP_APP_KEY,
      },
    })
  const newCattery = {
    isCattery: true,
    catteryName,
    breed,
    phoneNumber,
    website,
    address,
    placeId,
    cats: [],
    likeCats: [],
    likeCatteries: [],
    shortAddress,
    geoLocation: catteryPlaceDetails.data.result.geometry.location
  };
  return await wrtieToDB(newCattery, collectionName, userEmail);
}

export async function updateCattery({
  catteryName,
  phoneNumber,
  website,
  address,
  shortAddress,
  placeId,
  picture,
  breed,
}) {
  const email = getCurrentUserEmail();
  const googleMapClient = new Client({});
  const catteryPlaceDetails = await googleMapClient
    .placeDetails({
      params: {
        place_id: placeId,
        key: REACT_APP_GOOGLE_MAP_APP_KEY,
      },
    })
  const updatedCattery = {
    catteryName,
    phoneNumber,
    website,
    address,
    placeId,
    picture,
    breed,
    shortAddress,
    geoLocation: catteryPlaceDetails.data.result.geometry.location
  };
  return await updateToDB(email, collectionName, updatedCattery);
}

export async function updateUserNotificationSettings({enableNotification, maxNotificationRange}) {
  const email = getCurrentUserEmail();
  const updateUser = {
    enableNotification,
    maxNotificationRange
  };
  return await updateToDB(email, collectionName, updateUser);
}

export async function getCattery(email) {
  return await getFromDB(email, collectionName).then((docSnap) =>
    docSnap.data()
  );
}

export async function getAllCatteries() {
  return await getAllFromDB(collectionName).then((userSnap) =>
    userSnap.docs
      .filter((snap) => snap.data().isCattery)
      .map((snap) => {
        return {
          email: snap.id,
          ...snap.data(),
        };
      })
  );
}

export async function getUserLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission to access location was denied, you will not get access to any location related features.');
    return;
  }

  try {
    let location = await Location.getLastKnownPositionAsync({});
    if (location !== null) {
      Location.getCurrentPositionAsync({});
      return {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
    } else {
      location = await Location.getCurrentPositionAsync({});
      return {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      };
    }
  } catch {
    Alert.alert('Could not get your location, please try again later.');
  }
}

// Function to calculate distance between 2 points.
export function calculateDistance(mk1, mk2) {
  const distanceInMeter = haversine(mk1, mk2);
  return (distanceInMeter / 1600).toFixed(1);
}
