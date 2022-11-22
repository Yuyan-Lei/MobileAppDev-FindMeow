import { getFromDB, updateToDB, wrtieToDB, getCurrentUserEmail } from "./firestore";
import { arrayUnion, arrayRemove, doc } from "firebase/firestore";
import { db } from "./firebase-setup";

const collectionName = "Users";

export async function createUser(userEmail) {
    const newUser = {
        isCattery: false,
        likeCats: [],
    }
    return await wrtieToDB(newUser, collectionName, userEmail);
}

export async function userLikeACat(catId) {
    const email = getCurrentUserEmail();
    const newLikesArrayEntry = {
        likeCats: arrayUnion(catId)
    };
    return await updateToDB(email, collectionName, newLikesArrayEntry);
}

export async function userUnLikeACat(catId) {
    const email = getCurrentUserEmail();
    const newLikesArrayEntry = {
        likeCats: arrayRemove(catId)
    };
    return await updateToDB(email, collectionName, newLikesArrayEntry);
}

export async function getUserLikeCats() {
    const email = getCurrentUserEmail();

    return await getFromDB(email, collectionName).then((docSnap) => docSnap.data().likeCats);
}

export async function getUserData() {
    const email = getCurrentUserEmail();

    return await getFromDB(email, collectionName).then((docSnap) => docSnap.data());
}

export async function createCattery(userEmail, {
    catteryName,
    phoneNumber,
    website
}) {
    const newCattery = {
        isCattery: true,
        catteryName,
        phoneNumber,
        website,
        geoLocation: '',
        cats: [],
        likeCats: [],
    }
    return await wrtieToDB(newCattery, collectionName, userEmail);
}