import { arrayRemove, arrayUnion } from "firebase/firestore";
import {
  getAllFromDB,
  getCurrentUserEmail,
  getFromDB,
  updateToDB,
  wrtieToDB,
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
          catteryEmail: snap.id,
          catteryData: snap.data(),
        };
      })
  );
}
