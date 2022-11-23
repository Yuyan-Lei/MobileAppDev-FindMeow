import { deleteFromDB, getAllFromDB, updateToDB, wrtieToDB, getMultipleFromDB } from "./firestore";

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
  UploadTime
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

export async function getAllCats() {
  return await getAllFromDB(collectionName);
}

export async function getCats(catIds) {
  return await getMultipleFromDB(catIds, collectionName)
  .then((catsSnap) => catsSnap.docs.map(doc => doc.data()));
}
