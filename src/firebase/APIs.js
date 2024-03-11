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
    // let vocabularies =[]  
      const url = `${URLVocabulary}/${word}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.RapidAPI_Key || RapidAPI_Key,
          "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);       
        const result = await response.json();
        if(response.status === 404){
          let error = {status:response.status, error: "Word not found"} 
          // console.log(error)
          return error
          
        }
        return result      
      
      } catch (error) {       
        console.error(error);         
        // return error     
      }
    
  };

  

