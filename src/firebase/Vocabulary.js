import { database, storage } from "./Firebase";
import { app } from "./Firebase";


import {
  ref as dbRef,
  set,
  serverTimestamp,
  getDatabase,
  remove,
  update,
  ref,
  onValue,
} from "firebase/database";

const db = getDatabase();

export const createVocabulary = async (vocabulary, userID) => {
  let { word } = vocabulary;
  try {    
    await set(dbRef(db, "Vocabularies/"), {
      word,
      createdAt: serverTimestamp(),
      addedBy: userID,   
    });

    console.log("Vocabulary added successfully!");
  } catch (error) {
    console.error("Error saving Vocabulary data:", error.message);
  }
};

export const listVocabularies = (setVocabularyList)=>{
  const blogRefList = ref(db, "vocabularies/");
  onValue(blogRefList, (snapshot) => {
      const data = snapshot.val()
        let vocabularyArray = [];
        for (var [key, value] of Object.entries(data)) {
          var obj = {
              content: value.content,
              header: value.header,
              timeStamp: value.createdAt,
              uid_key: key,
          };
          vocabularyArray.push(obj);
        }
        setVocabularyList(vocabularyArray)         
    })
}

export const deleteVocabulary = async (id) => {
  try {
    //remove Vocabulary if I am the admin user
    await remove(dbRef(db, "vocabularies/" + id), function (error) {
      if (error) {
        console.log("delete error" + error);
      }
    });
    // console.log("Vocabulary Deleted successfully!");
  } catch (error) {
    console.error("Error deleting Vocabulary data:", error.message);
  }
};

export const editVocabulary = async (vocabulary, VocabularyID, userID) => {
  let { word } = vocabulary;
  try {
    // Save blog data to Firebase Realtime Database
    const vocabularyRef = dbRef(db, "vocabularies/" + VocabularyID);
    await update(vocabularyRef, {
      word,
      createdAt: serverTimestamp(),
      addedBy: userID,
      id: VocabularyID,
    });
  } catch (error) {
    // console.log("Blog Updated successfully!");

    console.error("Error saving blog data:", error.message);
  }
};
