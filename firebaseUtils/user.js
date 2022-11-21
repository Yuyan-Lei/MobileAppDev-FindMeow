import { deleteFromDB, updateToDB, wrtieToDB } from "./firestore";

const collectionName = "Users";

export async function createUser(userEmail) {
    const newUser = {
        isCattery: false,
        likeCats: [],
    }
    return await wrtieToDB(newUser, collectionName, userEmail);
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
    }
    return await wrtieToDB(newCattery, collectionName, userEmail);
}