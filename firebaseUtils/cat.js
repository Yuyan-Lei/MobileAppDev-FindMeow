import { deleteFromDB, updateToDB, wrtieToDB } from "./firestore";

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
