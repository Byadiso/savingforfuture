import { getDatabase , ref, onValue} from "firebase/database";
import { initializeApp } from "firebase/app";
import app from "./Firebase";

const databaseFirebase = getDatabase();


export const listBlog = (setBlogList)=>{
    const blogRefList = ref(databaseFirebase, "blogs/");
    onValue(blogRefList, (snapshot) => {
        const data = snapshot.val()   
        console.log(data)     
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



export const listVocabularies = (setVocabularyList)=>{
    const blogRefList = ref(databaseFirebase, "vocabularies/");
    onValue(blogRefList, (snapshot) => {
        const data = snapshot.val()
          let vocabularyArray = [];
          for (var [key, value] of Object.entries(data)) {
            var obj = {
                content: value.content,
                timeStamp: value.time,
                uid_key: key,
            };
            vocabularyArray.push(obj);
          }
          setVocabularyList(vocabularyArray)         
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