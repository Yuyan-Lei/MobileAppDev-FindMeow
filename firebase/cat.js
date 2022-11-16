import { deleteFromDB, updateToDB, wrtieToDB } from "./firestore";

const collectionName = "Cats";

export async function createCat({
  name,
  breed,
  isAvaiable,
  location,
  picture,
  price,
  description,
  tags,
  cattery,
  contact,
}) {
  const newCat = {
    name,
    breed,
    isAvaiable,
    location,
    picture,
    price,
    description,
    tags,
    cattery,
    contact,
  };

  return await wrtieToDB(newCat, collectionName);
}

export async function updateCat({
  key,
  name,
  breed,
  isAvaiable,
  location,
  picture,
  price,
  description,
  tags,
  cattery,
  contact,
}) {
  const changingDict = {
    name,
    breed,
    isAvaiable,
    location,
    picture,
    price,
    description,
    tags,
    cattery,
    contact,
  };

  return await updateToDB(key, collectionName, changingDict);
}

export async function deleteCat(key) {
  return await deleteFromDB(key, collectionName);
}
