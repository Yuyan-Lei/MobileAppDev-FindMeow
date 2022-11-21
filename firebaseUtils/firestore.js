import {
  addDoc,
  collection,
  deleteDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase-setup";

export async function wrtieToDB(data, collectionName, key='') {
  try {
    if (key !== '') {
      return await setDoc(doc(db, collectionName, key), data);
    } else {
      return await addDoc(collection(db, collectionName), data);
    }
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

export async function writeImageToDB(image) {
  try {

    const img = await fetch(image);
    const blob = await img.blob();
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + new Date().getTime() + '.jpg');

    // 'file' comes from the Blob or File API
    return await uploadBytes(storageRef, blob).then((result) => getDownloadURL(result.ref));
  }catch (err) {
    console.log(err);
  }
}
