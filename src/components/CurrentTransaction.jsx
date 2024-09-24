import React, { useEffect, useState } from 'react';
import { readArchivedPlans } from '../firebase/ArchiveLogics';
import { isAuthenticatedDetails } from '../firebase/Authentication';
import { Link } from 'react-router-dom';
import "../Style/Archive.css";
import { filterTransactionByMonthAndType, listTransactionsByMonthAndType } from '../firebase/Filters';
import { listTransactions } from '../firebase/getTransactions';
import NoAccess from './NoAccess';
import TableData from './TableData';
import CardBugdeto from './CardBugdeto';
import { waitToLoad } from '../firebase/Helpers';

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
      <div
        className="bugdet_summary"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          className="bugdet_summary_item"
          style={{
            display: "flex",
            alignItems: "center",
            width: "30%",
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
          padding: "80px",
        }}
      >
        <div style={{ padding: "20px", width: "100%" }}>
          {isLoggedIn ? (
            <TableData fetchDataFunction={listByMonth} />
          ) : (
            !loading && <NoAccess />
          )}
        </div>
      </div>
    </div>

  );
};

export default CurrentTransaction;
