import { arrayRemove, arrayUnion } from "firebase/firestore";
import {
  getAllFromDB,
  getCurrentUserEmail,
  getFromDB,
  updateToDB,
  wrtieToDB,
} from "./firestore";
import * as Location from 'expo-location';
import { Alert } from "react-native";

const collectionName = "Users";

export async function createUser(userEmail) {
  const newUser = {
    isCattery: false,
    likeCats: [],
    likeCatteries: [],
  };
  return await wrtieToDB(newUser, collectionName, userEmail);
}

export async function userLikeACat(catId) {
  const email = getCurrentUserEmail();
  const newLikesArrayEntry = {
    likeCats: arrayUnion(catId),
  };
  return await updateToDB(email, collectionName, newLikesArrayEntry);
}

export async function userUnLikeACat(catId) {
  const email = getCurrentUserEmail();
  const newLikesArrayEntry = {
    likeCats: arrayRemove(catId),
  };
  return await updateToDB(email, collectionName, newLikesArrayEntry);
}

export async function userLikeACattery(catteryEmail) {
  const email = getCurrentUserEmail();
  const newLikesArrayEntry = {
    likeCatteries: arrayUnion(catteryEmail),
  };
  return await updateToDB(email, collectionName, newLikesArrayEntry);
}

export async function userUnLikeACattery(catteryEmail) {
  const email = getCurrentUserEmail();
  const newLikesArrayEntry = {
    likeCatteries: arrayRemove(catteryEmail),
  };
  return await updateToDB(email, collectionName, newLikesArrayEntry);
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
export function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  return d.toFixed(1);
}
