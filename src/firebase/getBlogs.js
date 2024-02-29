import { getDatabase , ref, onValue, serverTimestamp } from "firebase/database";
import { ref as refStorage, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { storage } from './Firebase';
import {app} from "./Firebase";
import 'firebase/firestore';

const databaseFirebase = getDatabase();


export const listBlog = (setBlogList)=>{
    const blogRefList = ref(databaseFirebase, "blogs/");
    onValue(blogRefList, (snapshot) => {
        const data = snapshot.val()       
          let blogsArray = [];
          for (var [key, value] of Object.entries(data)) {
            var obj = {
              id: value.id,
              title: value.title,
              body: value.body,
              Image: value.Image,
              uid_key: key,
              createdAt:value.createdAt,
            };
    
            blogsArray.push(obj);
          }
          setBlogList(blogsArray)  
      })
}



export const listVocabularies = (setVocabularyList)=>{
    const blogRefList = ref(databaseFirebase, "vocabularies/");
    onValue(blogRefList, (snapshot) => {
        const data = snapshot.val()
          let vocabularyArray = [];
          for (var [key, value] of Object.entries(data)) {
            var obj = {
                content: value.content,
                timeStamp: value.time,
                uid_key: key,
            };
            vocabularyArray.push(obj);
          }
          setVocabularyList(vocabularyArray)         
      })
}

export const listUsers = (setUserList)=>{
  const userRefList = ref(databaseFirebase, "users/");
  onValue(userRefList, (snapshot) => {
      const data = snapshot.val()      
        let usersArray = [];
        for (var [key, value] of Object.entries(data)) {
          var obj = {
              content: value.content,
              timeStamp: value.time,
              uid_key: key,
          };  
          usersArray.push(obj);
        }
        setUserList(usersArray);  
    })
}

export const singleBlog = (setBlogList, blogId)=>{
  const blogRefList = ref(databaseFirebase, "blogs/" + blogId);
  onValue(blogRefList, (snapshot) => {
      const data = snapshot.val()        
        let blogsArray = [];
        for (var [key, value] of Object.entries(data)) {
          var obj = {
            id: value.id,
            title: value.title,
            body: value.body,
            Image: value.Image,
            uid_key: key,
          };  
          blogsArray.push(obj);
        }
        setBlogList(blogsArray)         
    })
}


// // 
// export const createBlog = (image, body, title)=>{
  
//   // add blog here
//   const imageName = image.name;
//     //reference a collection
//     const storageRef = ref.storage(storage,"images/" + imageName);

//     // upload image to selected  storage reference
//     var uploadTask = storageRef.put(image);

//     uploadTask.on(
//       "state_changed",
//       function (snapshot) {
//         var progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "done");
//       },
//       function (error) {
//         //  let message = error.message;
//         console.log(error.message);
//       },
//       function () {
//         // handle successfully upload here..
//         uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//           // getimage downloaded url here and upload to the database

//           var id = Math.floor(Math.random() * 100);

//           app
//             .database()
//             .ref("blogs/")
//             .push()
//             .set(
//               {
//                 title: title,
//                 body: body,
//                 createdAt: serverTimestamp(),
//                 Image: downloadURL,
//                 id: id,
//               },
//               function (error) {
//                 if (error) {
//                   console.log("error whie uploading");
//                   // message ="error whie uploading"
//                 } else {
//                   console.log("successfully uploaded");
//                   // message="successfully uploaded"                 
//                 }
//               }
//             );
//         });      

//         console.log("blog added successully");
//         // message = "successfully added"
//       }
//     );
//   }