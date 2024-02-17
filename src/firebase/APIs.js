import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import app from "./Firebase";

const databaseFirebase = getDatabase();
const RequestLink = "https://shortstories-api.onrender.com/stories";

export const getStories = async () => {
  let response = await fetch(RequestLink);
  let data = response.json();  
  return data;
};
