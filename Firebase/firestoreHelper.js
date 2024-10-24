import { database } from "./firebaseSetup";
import { collection, addDoc, getDocs } from 'firebase/firestore';

// FUnction to fetch entries from the database
export async function fetchEntriesFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    let entries = [];
    querySnapshot.forEach((doc) => {
      entries.push({ ...doc.data(), id: doc.id });
    });
    return entries;
  } catch (error) {
    console.log("Error fetching from DB: ", error);
  }
};

// Function to write an entry to the database
export async function writeEntryToDB(collectionName, entry) {
  try {
    const docRef = await addDoc(collection(database, collectionName), entry);
    return docRef.id;
  } catch (error) {
    console.log("Error writing to DB: ", error);
  }
};
