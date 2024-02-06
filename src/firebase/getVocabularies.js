// import { getDatabase , ref, onValue} from "firebase/database";

// const databaseFirebase = getDatabase();


// export const listVocabularies = (setVocabularyList)=>{
//     const blogRefList = ref(databaseFirebase, "vocabularies/");
//     onValue(blogRefList, (snapshot) => {
//         const data = snapshot.val()
        
//           let vocabularyArray = [];
//           for (var [key, value] of Object.entries(data)) {
//             var obj = {
//                 content: value.content,
//                 timeStamp: value.time,
//                 uid_key: key,
//             };
    
//             vocabularyArray.push(obj);
//           }
//           setVocabularyList(vocabularyArray)       
           
//       })
// }