import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { getLoggedUser, isAuthenticated} from '../firebase/Authentication';
import NoAccess from './NoAccess';

function UserProfile() {
  const [loggedUser, setLoggedUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  let email = loggedUser.email;
  let userId = loggedUser.uid;

  useEffect(() => {    
    getLoggedUser(setLoggedUser);
    isAuthenticated(setIsLoggedIn);
  }, [ isLoggedIn]);


  return (
    <div >
      <Navbar />
      {isLoggedIn ? 
      <div>
      <h1>UserProfile</h1>
      <p >Email: {email && email}</p>
      <p >Uid: {userId && userId}</p>
      </div>
      :  <NoAccess />}
      <Footer />
      </div>
  )
}

export default UserProfile