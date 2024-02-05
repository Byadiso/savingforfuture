// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import env from "react-dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: "mybrand-df7b7.firebaseapp.com",
  databaseURL: "https://mybrand-df7b7-default-rtdb.firebaseio.com",
  projectId: "mybrand-df7b7",
  storageBucket: "mybrand-df7b7.appspot.com",
  messagingSenderId: "1073877765217",
  appId: "1:1073877765217:web:7f63596f42c5d4ca18ae20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;