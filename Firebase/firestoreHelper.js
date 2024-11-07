import { database } from "./firebaseSetup";
import { collection, doc, addDoc, getDocs, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

// Function to fetch entries from the database
export async function fetchEntriesFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    let entriesArray = [];
    querySnapshot.forEach((docSnapshot) => {
      entriesArray.push(docSnapshot.data());
    });
    return entriesArray;
  } catch (error) {
    console.log("Error fetching from DB: ", error);
  }
};

// FUnction to fetch a single entry from the database
export async function getAnEntryFromDB(collectionName, entryId) {
  try {
    const docRef = doc(database, collectionName, entryId);
    const docSnap = await getDoc(docRef);

    return { ...docSnap.data(), id: docSnap.id };
  } catch (error) {
    console.log("Error fetching entry from DB: ", error);
  }
};

// Function to write an entry to the database
export async function writeEntryToDB(collectionName, entry) {
  try {
    const docRef = await addDoc(collection(database, collectionName), entry);
    return docRef;
  } catch (error) {
    console.log("Error writing to DB: ", error);
  }
};

// Function to update an entry in the database
export async function updateEntryInDB(collectionName, entryId, updatedEntry) {
  try {
    await setDoc(doc(database, `${collectionName}/${entryId}`), updatedEntry);
  } catch (error) {
    console.log("Error updating entry in DB: ", error);
  }
};

// Function to delete an entry from the database
export async function deleteEntryFromDB(collectionName, entryId) {
  try {
    const docRef = doc(database, collectionName, entryId);
    await deleteDoc(docRef);
  } catch (error) {
    console.log('Error deleting entry from DB:', error);
    throw error;
  }
};
