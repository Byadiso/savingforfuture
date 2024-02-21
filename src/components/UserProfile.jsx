import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { getLoggedUser} from '../firebase/Authentication';

function UserProfile() {

  const [loggedUser, setLoggedUser] = useState([]);


  let email = loggedUser.email;
  let userId = loggedUser.uid;


  useEffect(() => {    
    getLoggedUser(setLoggedUser);

  }, []);

  return (
    <div >
      <Navbar />
      <h1>UserProfile</h1>
      <p >Email: {email && email}</p>
      <p >Uid: {userId && userId}</p>
      <Footer />
      </div>
  )
}

export default UserProfile