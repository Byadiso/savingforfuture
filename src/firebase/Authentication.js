import {
  // createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  // signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { app } from "./Firebase";

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

export const isAuthenticatedDetails = (setIsloggedState, setUserId) => {
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      // User is authenticated, so set the logged state to true and set the userId
      setIsloggedState(true);
      setUserId(user.uid); // Pass the user's UID to the setUserId function
    } else {
      // User is not authenticated, set the logged state to false and clear userId
      setIsloggedState(false);
      setUserId(null); // Reset userId when the user logs out
    }
  });
};

export const getLoggedUser = (setIsloggedState) => {
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      setIsloggedState(user);
    } else {
      console.log("No user logged in")
    }
  });
}

// export const login = (email, password) => {
//   signInWithEmailAndPassword(Auth, email, password)
   
// };

// export const register = (firstname, lastname, email, password) => {
//   createUserWithEmailAndPassword(
//     Auth,
//     email,
//     password,
//     firstname,
//     lastname
//   ).then((userCredential) => {   
//     const user = userCredential.user;
//     const userData = {
//       firstname: firstname,
//       lastname: lastname,
//       displayName: firstname,
//       email: email,
//     };
//     app
//       .firestore()
//       .collection("users")
//       .doc(user.uid)
//       .set(userData)
//       .then((user) => {       
//         console.log("User data stored in Firestore.");
//       })
//       .catch((error) => {
//         // Handle error
//         console.error("Error storing user data in Firestore:", error);
//       });
//   });
// };

export const LogoutUser = () => {
  signOut(Auth)
    .then(() => {
        console.log("// Sign-out successful.");
    })
    .catch((error) => {     
      console.log(error);
    });
};

export const checkUser = () => {
  let currentUser = Auth.currentUser;
  return currentUser;
};
