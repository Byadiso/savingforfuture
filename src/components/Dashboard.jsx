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
import { listTransactions } from "../firebase/getTransactions";

function Dashboard() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = React.useState([])


  function calculateTotalAmount(transactions) {
    let totalExpense = 0;
    let totalIncome = 0;
  
    transactions.forEach(transaction => {
      const amount = parseFloat(transaction.amount);
      if (transaction.type === 'Expense') {
        totalExpense += amount;
      } else if (transaction.type === 'Income') {
        totalIncome += amount;
      }
    });
  
    return { totalExpense, totalIncome };
  }
  
  const { totalExpense, totalIncome } = calculateTotalAmount(transactions);
  // console.log('Total Expense:', totalExpense);
  // console.log('Total Income:', totalIncome);
  
  
  const data = {
    earnings: totalExpense,
    expenses: totalIncome,
  };

  const navigate = useNavigate();
  

  useEffect(() => {      
       isAuthenticated(setIsLoggedIn);
       listTransactions(setTransactions)
    waitToLoad(setLoading);
  }, [navigate, isLoggedIn,]);

  return (
    <div className="main_dashboard">     
      <div className="bugdet_summary">
        <div className="bugdet_summary_item">
          <BudgetGraph data={data} />
        </div>
        <div className="bugdet_summary_item">
          <CardBugdeto dataExpense={totalIncome + totalExpense}/>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", width:"100%" , padding:"80px"}}>
        <div style={{ padding:"20px"}}>
        {isLoggedIn ? <TableData /> : !loading && <NoAccess />}
        </div>
        <div style={{ padding:"20px"}}>
        {isLoggedIn ? <TableData  /> : !loading && <NoAccess />}
        </div>
       
      </div>     
    </div>
  );
}

export default Dashboard;
