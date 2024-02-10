import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import app from "./Firebase";

const Auth = getAuth();

export const isAuthenticated = (setIsloggedState, userId) => {
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      setIsloggedState(true);
    } else {
      setIsloggedState(false);
    }
  });
};

export const login = (email, password) => {
  signInWithEmailAndPassword(Auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("logged in successfull");
      console.log(user.email);
    })
    .catch((error) => {
      console.log(error);
    });
};


export const LogoutUser = ()=>{
  
  signOut(Auth).then(() => {
    
    console.log("// Sign-out successful.")
  }).catch((error) => {
    // An error happened.
    console.log(error)
    
  });
}

export const checkUser = ()=>{
  let currentUser = Auth.currentUser;
  return currentUser
}
 





