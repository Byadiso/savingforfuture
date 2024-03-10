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
        return result      
      
      } catch (error) {       
        // console.error(error);
         
        return error     
      }
    
  };

  


  // // adding vocabulary to the page
  // searchResult.addEventListener("click", (e)=>{
  //   if(e.target.classList.contains("Add_vocabulary_Btn")){
  //     e.preventDefault()      
      
  //     let definition = vocabularies[0][0].definition
  //     console.log(definition)
  //     addVocabulary(word,definition)
  //   }

  // }
  // )

//   // adding vocabulary
// const addVocabulary = (word, definition)=>{ 
//     console.log("yes let add a vocabulary")
//      firebase
//     .database()
//     .ref("vocabularies/")
//     .push()
//     .set(
//       {
//         header: word,  
//         content: definition, 
//         createdAt: Date.now(),        
//       },
//       function (error) {
//         if (error) {
//           console.log("error while adding vocabulary");
//         } else {
//           console.log("successfully added");

//         }
//       }
//     )

//   }

