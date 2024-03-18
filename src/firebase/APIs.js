import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import app from "./Firebase";
// importing firebaseConfiguration and other configurations
import { RapidAPI_Key } from "./ApiKey";


const RequestLink = "https://shortstories-api.onrender.com/stories";
const URLVocabulary = "https://wordsapiv1.p.rapidapi.com/words"


export const getStories = async () => {
  let response = await fetch(RequestLink);
  let data = response.json();
  return data;
};


export const getWord = async (word) => {
  const url = `${URLVocabulary}/${word}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RapidAPI_Key || RapidAPI_Key,
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };
  const response = await fetch(url, options);
  if (response.status === 404) {
    let error = { status: response.status, error: "That word Word was not found" }
    return error
  }
  const result = await response.json();
  return result
};



