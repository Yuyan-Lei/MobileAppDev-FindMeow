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
    await addDoc(collection(firestore, collectionName), data);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(key, collectionName) {
  try {
    await deleteDoc(doc(firestore, collectionName, key));
  } catch (err) {
    console.log(err);
  }
}

export async function markImportant(key, collectionName, changingDict) {
  try {
    await updateDoc(doc(firestore, collectionName, key), changingDict);
  } catch (err) {
    console.log(err);
  }
}
