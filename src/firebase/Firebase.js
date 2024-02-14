
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import 'firebase/firestore';



const firebaseConfig = {
  apiKey: 'AIzaSyA5sPlupW_n1XEt6xsw_Y7aAZKltGEFyXw',
  authDomain: "mybrand-df7b7.firebaseapp.com",
  databaseURL: "https://mybrand-df7b7-default-rtdb.firebaseio.com",
  projectId: "mybrand-df7b7",
  storageBucket: "mybrand-df7b7.appspot.com",
  messagingSenderId: "1073877765217",
  appId: "1:1073877765217:web:7f63596f42c5d4ca18ae20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  {app, auth};
 