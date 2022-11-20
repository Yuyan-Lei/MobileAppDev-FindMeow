import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-setup";

export async function wrtieToDB(data, collectionName) {
  try {
    return await addDoc(collection(db, collectionName), data);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(key, collectionName) {
  try {
    return await deleteDoc(doc(db, collectionName, key));
  } catch (err) {
    console.log(err);
  }
}

export async function updateToDB(key, collectionName, changingDict) {
  try {
    return await updateDoc(doc(db, collectionName, key), changingDict);
  } catch (err) {
    console.log(err);
  }
}
