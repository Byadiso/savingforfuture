import React, { useEffect, useState } from 'react';
import { readArchivedPlans } from '../firebase/ArchiveLogics';
import { isAuthenticatedDetails } from '../firebase/Authentication';
import { Link } from 'react-router-dom';
import "../Style/Archive.css";
import { listTransactionsByMonthAndType } from '../firebase/Filters';
import { listTransactions } from '../firebase/getTransactions';
import NoAccess from './pages/ErrorComponents/NoAccess';
import TableData from './TableData';
import CardBugdeto from './CardBugdeto';
import { waitToLoad } from '../Helpers/Helpers';

// Archived Component
const CurrentTransaction = () => {
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Store the user ID
  const [transactions, setTransactions] = React.useState([]);


 let filtered= listTransactionsByMonthAndType(transactions,"current");
 
 let data = filtered.matchingTransactions
 
 let total = (filtered.totalIncome+filtered.totalExtra)-filtered.totalExpense

 const listByMonth = (setDataList) => {
  return setDataList(data);
};


  useEffect(() => {
   
    isAuthenticatedDetails(setIsLoggedIn, setUserId); 
    listTransactions(setTransactions);
    waitToLoad(setLoading);
    if (userId) {
      fetchArchivedData(userId)
    }
    
  }, [userId]);

  const fetchArchivedData = async (userId) => {
    const data = await readArchivedPlans(userId);    
    const archiveArray = Object.keys(data).map(key => ({
      id: key,
      ...data[key],
    }));
    setArchives(archiveArray);    
  };

  return (
    <div className="main_dashboard">
      <div style={{ paddingTop: "20px", margin: "20px" }}>
        <Link to="/Dashboard"> Go back</Link>
      </div>
      {!isLoggedIn? <NoAccess/> :
      
      <><div
            className="bugdet_summary"
            style={{ display: "flex", alignItems: "center"}}
          >
            <div
              className="bugdet_summary_item"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "20px",
              }}
            >
              <CardBugdeto dataExpense={total} type="current month bugdet" />
            </div>
      </div>
      <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: "5px",
            }}
          >
            <div style={{ width: "100%" }}>              
                <TableData fetchDataFunction={listByMonth} />             
             
            </div>
      </div>
      </>}
    
    </div>

  );
};

export default CurrentTransaction;
