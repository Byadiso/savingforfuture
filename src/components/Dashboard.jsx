import React, { useEffect, useState } from "react";
import { checkIfAdmin, getLoggedUser, isAuthenticated, isAuthenticatedDetails } from "../firebase/Authentication";
import { useNavigate } from "react-router-dom";
import NoAccess from "./NoAccess";
import { totalPlanBugdet, waitToLoad } from "../firebase/Helpers";
import TableData from "./TableData";
import CardBugdeto from "./CardBugdeto";
import BudgetGraph from "./BudgetGraph";
import "../Style/Dashboard.css";
import { listTransactions } from "../firebase/getTransactions";
import { filterBenefits, filterTransactionsAndCalculateTotal, listAlltransactionWithoutSuper } from "../firebase/Filters";
import { KEYWORDS } from "../firebase/CONSTANTS";
import { readPlans } from "../firebase/Plan";

function Dashboard() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [transactions, setTransactions] = React.useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);

  const { totalExpense, totalIncome } = listAlltransactionWithoutSuper(transactions, KEYWORDS); 
  const { totalBenefits } = filterBenefits(transactions);
  const { total } = filterTransactionsAndCalculateTotal(transactions, KEYWORDS);

  let goalAmount= 2000
  let HomeExpenseAmount= 1500
  let totalTobePaid= 54500

  let isAdmin =  checkIfAdmin(userId)

  const fetchBudgets = async (userId) => {
    const plans = await readPlans(userId);
    const plansArray = Object.keys(plans).map(key => ({
      id: key,
      ...plans[key],
    }));
    setBudgets(plansArray);
  };

  const totalBudgetPlan= totalPlanBugdet(budgets)

  const navigate = useNavigate();
  
  useEffect(() => {      
    isAuthenticated(setIsLoggedIn);
    getLoggedUser(setLoggedUser)
    isAuthenticatedDetails(setIsLoggedIn, setUserId);
    listTransactions(setTransactions);
    fetchBudgets(userId);
    waitToLoad(setLoading);
  }, [navigate, isLoggedIn]);

  return (
    <div className="main_dashboard">  

      {isLoggedIn && (
        <>
        <div>Logged in user: {loggedUser.email}</div>
        <div className="dashboard_grid">
          <div className="dashboard_item goal_amount">
            {isLoggedIn && <CardBugdeto dataExpense={goalAmount} type="Save Goal till 30th December 2024"/>}
          </div>
          <div className="dashboard_item home_amount">
            {isLoggedIn && <CardBugdeto dataExpense={HomeExpenseAmount} type="Home grosseries monthly"/>}
          </div>
          <div className="dashboard_item">
            {isLoggedIn && <CardBugdeto dataExpense={totalIncome - totalExpense} type="Bank Account"/>}
          </div>
          <div className="dashboard_item">
            {isLoggedIn && <CardBugdeto dataExpense={totalBenefits} type="Benefit Account"/>}
          </div>
          {isAdmin &&<div className="dashboard_item">
            {isLoggedIn &&  <CardBugdeto dataExpense={-total} type="Super Account"/>}
          </div>}
          <div className="dashboard_item">
            {isLoggedIn && <CardBugdeto dataExpense={totalBudgetPlan} type="Planned Account monthly"/>}
          </div>
          {isAdmin &&<div className="dashboard_item payback">
            {isLoggedIn && <CardBugdeto dataExpense={totalTobePaid} type="What is not mine"/>}
          </div>}
          
        </div>
        </>
        
      )}
    </div>
  );
}

export default Dashboard;
