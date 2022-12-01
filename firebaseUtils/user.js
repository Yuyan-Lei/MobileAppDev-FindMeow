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
  { catteryName, phoneNumber, website, address, placeId }
) {
  const newCattery = {
    isCattery: true,
    catteryName,
    phoneNumber,
    website,
    address,
    placeId,
    cats: [],
    likeCats: [],
  };
  return await wrtieToDB(newCattery, collectionName, userEmail);
}

export async function updateCattery({
  catteryName,
  phoneNumber,
  website,
  address,
  placeId,
  picture,
}) {
  const email = getCurrentUserEmail();
  const updatedCattery = {
    catteryName,
    phoneNumber,
    website,
    address,
    placeId,
    picture,
  };
  return await updateToDB(email, collectionName, updatedCattery);
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

  let location = await Location.getCurrentPositionAsync({});
  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude
  };
}

// Function to calculate distance between 2 points.
export function calculateDistance(mk1, mk2) {
  const distanceInMeter = haversine(mk1, mk2);
  return (distanceInMeter / 1000).toFixed(1);
}
