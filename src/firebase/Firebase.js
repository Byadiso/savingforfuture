import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC705NQ6r02gGuGpiekSIE5Nj5Bbr4hxnM",
  authDomain: "saving-for-the-future.firebaseapp.com",
  databaseURL: "https://saving-for-the-future-default-rtdb.firebaseio.com",
  projectId: "saving-for-the-future",
  storageBucket: "saving-for-the-future.firebasestorage.app",
  messagingSenderId: "856852461879",
  appId: "1:856852461879:web:80a247c1e1a729af6a82b2",
  measurementId: "G-Z2JKL143F0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app);
const firestore = getFirestore(app); // ✅ Firestore instance


export  {app, auth,storage, db, firestore};




 