import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../firebase/Authentication";
import { useNavigate } from "react-router-dom";
import NoAccess from "./NoAccess";
import { waitToLoad } from "../firebase/Helpers";
import TableData from "./TableData";
import CardBugdeto from "./CardBugdeto";
import BudgetGraph from "./BudgetGraph";
import "../Style/Dashboard.css";
import { listTransactions } from "../firebase/getTransactions";
import { listAlltransactionWithoutSuper } from "../firebase/Filters";
import { KEYWORDS } from "../firebase/CONSTANTS";

function Dashboard() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = React.useState([])

  const { totalExpense, totalIncome } = listAlltransactionWithoutSuper(transactions,KEYWORDS); 
  
  const data = {
    earnings: totalIncome,
    expenses: totalExpense,
  };

  const navigate = useNavigate();
  

  useEffect(() => {      
       isAuthenticated(setIsLoggedIn);
       listTransactions(setTransactions)
    waitToLoad(setLoading);
  }, [navigate, isLoggedIn,]);

  return (
    <div className="main_dashboard">     
      <div className="bugdet_summary" style={{ display: "flex", alignItems: "center"}}>
        <div className="bugdet_summary_item" style={{ display: "flex", alignItems: "center", width:"50%", padding:"40px" }}>
          <BudgetGraph data={data} />
        </div>
        <div className="bugdet_summary_item" style={{ display: "flex", alignItems: "center", width:"30%", padding:"20px" }}>
          <CardBugdeto dataExpense={totalIncome - totalExpense}/>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", width:"100%" , padding:"80px"}}>
        <div style={{ padding:"20px", width:"100%" }}>
        {isLoggedIn ? <TableData fetchDataFunction={listTransactions}/> : !loading && <NoAccess />}
        </div>
       
       
      </div>     
    </div>
  );
}

export default Dashboard;
