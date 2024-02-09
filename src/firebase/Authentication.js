
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Auth = getAuth();

export const isAuthenticated = () => {
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);    
    } else {
     return "false";
    }
  });
};
