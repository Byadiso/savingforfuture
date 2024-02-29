// import { getDatabase , onValue, serverTimestamp, set } from "firebase/database";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { database, storage } from './Firebase';
import {app} from "./Firebase";


import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as dbRef, set, serverTimestamp, getDatabase } from "firebase/database";

// const database = getDatabase()
const db = getDatabase();


// export const createBlog = (image, body, title)=>{
  
//   // add blog here
//   const imageName = image.name;
//     //reference a collection
//     const storageRef = ref(storage,"images/" + imageName);

//     // upload image to selected  storage reference
//     // var uploadTask = storageRef.put(image);
//     var uploadTask = uploadBytesResumable(storageRef, image);

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
//         getDownloadURL(uploadTask.snapshot.ref).then(function (downloadURL) {
//           // getimage downloaded url here and upload to the database         

//           var id = Math.floor(Math.random() * 100);
//           const refDb = ref(db,'blogs/');

          
             
//          set(refDb,
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

//         console.log("blog added successfully");
//         // message = "successfully added"
//       }
//     );
//   }

// export const createBlog = async (image, body, title) => {
//   // Upload image to Firebase Storage
//   const refDb = ref(db, 'blogs/');
//   console.log(refDb)
//   try {
//     const imageName = image.name;
//     const storageRef = ref(storage, "images/" + imageName);
//     const uploadTask = uploadBytesResumable(storageRef, image);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//       },
//       (error) => {
//         console.error("Error uploading image:", error.message);
//       }
//     );

//     // Wait for the upload to complete and get the download URL
//     // const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

//     const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

//     // Generate a unique random ID (consider using a more robust method like UUID)
//     const id = Math.floor(Math.random() * 1000000); // 6-digit random number

//     // Save blog data to Firebase Realtime Database
//     const refDb = ref(db, "blogs/");
//     console.log(refDb)
//     await set(refDb, {
//       title,
//       body,
//       createdAt: serverTimestamp(),
//       Image: downloadURL,
//       id,
//     });

//     console.log("Blog added successfully!");
//   } catch (error) {
//     console.error("Error saving blog data:", error.message);
//   }
// };



// export const createBlog = async (image, body, title) => {
//   try {
//     // Upload image to Firebase Storage
//     const imageName = image.name;
//     const storageRef = ref(storage, "images/" + imageName);
//     const uploadTask = uploadBytesResumable(storageRef, image);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//       },
//       (error) => {
//         console.error("Error uploading image:", error.message);
//       }
//     );

//     // Wait for the upload to complete and get the download URL
//     const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//     // Generate a unique random ID (consider using a more robust method like UUID)
//     const id = Math.floor(Math.random() * 1000000); // 6-digit random number

//     // Save blog data to Firebase Realtime Database
//     const dbReference = dbRef(db, "blogs/");
//     await set(dbReference.child(id), {
//       title,
//       body,
//       createdAt: serverTimestamp(),
//       Image: downloadURL,
//       id,
//     });

//     console.log("Blog added successfully!");
//   } catch (error) {
//     console.error("Error saving blog data:", error.message);
//   }
// };


// import { ref as dbRef, set, serverTimestamp } from "firebase/database";

export const createBlog = async (image, body, title) => {
  try {
    // Upload image to Firebase Storage
    const imageName = image.name;
    const storageRef = ref(storage, "images/" + imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading image:", error.message);
      }
    );

    // Wait for the upload to complete and get the download URL
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    // Generate a unique random ID (consider using a more robust method like UUID)
    const id = Math.floor(Math.random() * 1000000); // 6-digit random number

    // Save blog data to Firebase Realtime Database
    await set(dbRef(db, "blogs/" + id), {
      title,
      body,
      createdAt: serverTimestamp(),
      Image: downloadURL,
      id,
    });

    console.log("Blog added successfully!");
  } catch (error) {
    console.error("Error saving blog data:", error.message);
  }
};
