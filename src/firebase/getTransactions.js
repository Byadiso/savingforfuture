import { getDatabase , ref, onValue } from "firebase/database";
import 'firebase/firestore';

const databaseFirebase = getDatabase();


export const listTransactions = (setTransactionList)=>{
    const transactionRefList = ref(databaseFirebase, "Transactions/");
    onValue(transactionRefList, (snapshot) => {
        const data = snapshot.val()         
          if (!data){
          return []
          }
          let transactionsArray = [];
          for (var [key, value] of Object.entries(data)) {
            var obj = {
              id: value.id,
              title: value.title,
              amount: value.amount,
              type: value.type,
              uid_key: key,
              createdAt:value.createdAt,
            };
    
            transactionsArray.push(obj);
          }          
          setTransactionList(transactionsArray.sort((a, b) => b.createdAt - a.createdAt))  
      })
}


export const singleTransaction = (setBlogList, blogId)=>{
  const blogRefList = ref(databaseFirebase, "Transactions/" + blogId);
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
