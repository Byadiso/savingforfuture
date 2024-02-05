import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import database from "./firebase/Firebase.js";
import { uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { getDatabase , ref, onValue} from "firebase/database";
const databaseFirebase = getDatabase();

function App() {
  const [blogList, setBlogList] = useState([]);
 

  const blogRefList = ref(databaseFirebase, "blogs/"); 

  
 

  useEffect(() => {

     const unsubscribe = () =>{
    onValue(blogRefList, (snapshot) => {
      const data = snapshot.val()
      // const unsubscribe = () =>{
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
      // }   
         
    })
  };
    return () => unsubscribe();
  }, []);

  // console.log(blogList.length)

  return (
    <div className="App">
      <Navbar />
      <LandingPage blogNumber={blogList.length}/>
      <Footer />
    </div>
  );
}

export default App;
