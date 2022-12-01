import { arrayUnion } from "firebase/firestore";
import {
  deleteFromDB,
  getAllFromDB,
  getMultipleFromDB,
  updateToDB,
  wrtieToDB
} from "./firestore";

const collectionName = "Cats";

export async function createCat({
  Name,
  Breed,
  Picture,
  Birthday,
  Gender,
  Price,
  Description,
  Tags,
  Cattery,
  Contact,
  UploadTime,
}) {
  const newCat = {
    Name,
    Breed,
    Picture,
    Birthday,
    Gender,
    Price,
    Description,
    Tags,
    Cattery,
    Contact,
    UploadTime,
  };

  const cat = await wrtieToDB(newCat, collectionName);

  /* link cat to cattery */
  const newCatEntry = {
    cats: arrayUnion(cat.id),
  };

  return await updateToDB(Cattery, "Users", newCatEntry);
}

export async function updateCat(catId, {
  Name,
  Breed,
  Picture,
  Birthday,
  Gender,
  Price,
  Description,
  Tags,
  Cattery,
  Contact,
  UploadTime,
}) {
  const changingDict = {
    Name,
    Breed,
    Picture,
    Birthday,
    Gender,
    Price,
    Description,
    Tags,
    Cattery,
    Contact,
    UploadTime,
  };

  return await updateToDB(catId, collectionName, changingDict);
}

export async function deleteCat(key) {
  return await deleteFromDB(key, collectionName);
}

export async function getAllCats() {
  return await getAllFromDB(collectionName);
}

export async function getCats(catIds) {
  return await getMultipleFromDB(catIds, collectionName).then((catsSnap) =>
    catsSnap.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    })
  );
}
