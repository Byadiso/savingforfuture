import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import app from "./Firebase";

const databaseFirebase = getDatabase();

export const getStories = async (URL) => {
  let response = await fetch(URL);
  let data = response.json();  
  return data;
};
