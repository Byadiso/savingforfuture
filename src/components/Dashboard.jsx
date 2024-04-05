import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../firebase/Authentication";
import { useNavigate } from "react-router-dom";
import NoAccess from "./NoAccess";
import { waitToLoad } from "../firebase/Helpers";
import TableData from "./TableData";
import CardBugdeto from "./CardBugdeto";
import BudgetGraph from "./BudgetGraph";
import "../Style/Dashboard.css";
import { transactionArray } from "../firebase/data";

function Dashboard() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [ dataBugdet, setDataBudget ] = useState();

 

  const data = {
    earnings: 10000,
    expenses: 5000,
  };

  const navigate = useNavigate();

  useEffect(() => {   
 
    setDataBudget(transactionArray)    
   
    isAuthenticated(setIsLoggedIn);
    waitToLoad(setLoading);
  }, [navigate, isLoggedIn, dataBugdet]);

  return (
    <div className="main_dashboard">     
      <div className="bugdet_summary">
        <div className="bugdet_summary_item">
          <BudgetGraph data={data} />
        </div>
        <div className="bugdet_summary_item">
          <CardBugdeto dataExpense="1000PLN"/>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", width:"100%" , padding:"80px"}}>
        <div style={{ padding:"20px"}}>
        {isLoggedIn ? <TableData rows={dataBugdet}/> : !loading && <NoAccess />}
        </div>
        <div style={{ padding:"20px"}}>
        {isLoggedIn ? <TableData rows={dataBugdet} /> : !loading && <NoAccess />}
        </div>
       
      </div>     
    </div>
  );
}

export default Dashboard;
