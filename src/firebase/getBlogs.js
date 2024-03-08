import { getDatabase , ref, onValue, serverTimestamp } from "firebase/database";
import { ref as refStorage, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { storage } from './Firebase';
import {app} from "./Firebase";
import 'firebase/firestore';

const databaseFirebase = getDatabase();


export const listBlog = (setBlogList)=>{
    const blogRefList = ref(databaseFirebase, "blogs/");
    onValue(blogRefList, (snapshot) => {
        const data = snapshot.val()       
          let blogsArray = [];
          for (var [key, value] of Object.entries(data)) {
            var obj = {
              id: value.id,
              title: value.title,
              body: value.body,
              Image: value.Image,
              uid_key: key,
              createdAt:value.createdAt,
            };
    
            blogsArray.push(obj);
          }
          setBlogList(blogsArray)  
      })
}

export const listUsers = (setUserList)=>{
  const userRefList = ref(databaseFirebase, "users/");
  onValue(userRefList, (snapshot) => {
      const data = snapshot.val()      
        let usersArray = [];
        for (var [key, value] of Object.entries(data)) {
          var obj = {
              content: value.content,
              timeStamp: value.time,
              uid_key: key,
          };  
          usersArray.push(obj);
        }
        setUserList(usersArray);  
    })
}

export const singleBlog = (setBlogList, blogId)=>{
  const blogRefList = ref(databaseFirebase, "blogs/" + blogId);
  onValue(blogRefList, (snapshot) => {
      const data = snapshot.val()        
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
    })
}
