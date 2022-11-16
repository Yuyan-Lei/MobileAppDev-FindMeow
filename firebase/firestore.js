import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "./firebase-setup";

export async function wrtieToDB(data, collectionName) {
  try {
    return await addDoc(collection(firestore, collectionName), data);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(key, collectionName) {
  try {
    return await deleteDoc(doc(firestore, collectionName, key));
  } catch (err) {
    console.log(err);
  }
}

export async function updateToDB(key, collectionName, changingDict) {
  try {
    return await updateDoc(doc(firestore, collectionName, key), changingDict);
  } catch (err) {
    console.log(err);
  }
}
