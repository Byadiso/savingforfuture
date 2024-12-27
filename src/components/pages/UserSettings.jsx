import React, { useEffect, useState } from "react";
import {
  checkIfAdmin,
  getLoggedUser,
  isAuthenticated,
  isAuthenticatedDetails,
} from "../../firebase/Authentication";
import { Link, useNavigate } from "react-router-dom";
import NoAccess from "./ErrorComponents/NoAccess";
import { totalPlanBugdet, waitToLoad } from "../../Helpers/Helpers";
import CardBugdeto from "./CardBugdeto";
import "../../Style/Dashboard.css";
import { listTransactions } from "../../firebase/getTransactions";
import {
  filterBenefits,
  filterTransactionsAndCalculateTotal,
  filterWhatIsNotMine,
  listAlltransactionWithoutSuper,
} from "../../firebase/Filters";
import { KEYWORDS } from "../../firebase/CONSTANTS";
import { readPlans } from "../../firebase/Plan";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "./Layouts/Navbar";
import AddIcon from "@mui/icons-material/Add";

function UserSettings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [transactions, setTransactions] = React.useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);

  const { totalExpense, totalIncome } = listAlltransactionWithoutSuper(
    transactions,
    KEYWORDS
  );
  const { totalBenefits } = filterBenefits(transactions);
  const { total } = filterTransactionsAndCalculateTotal(transactions, KEYWORDS);

  const { filteredWhatIsNotMine, totalWhatIsNotMine } =
    filterWhatIsNotMine(transactions);

  let goalAmount = 2000;
  let HomeExpenseAmount = 1000;

  let isAdmin = checkIfAdmin(userId);

  const fetchBudgets = async (userId) => {
    const plans = await readPlans(userId);
    const plansArray = Object.keys(plans).map((key) => ({
      id: key,
      ...plans[key],
    }));
    setBudgets(plansArray);
  };

  const totalBudgetPlan = totalPlanBugdet(budgets);

  HomeExpenseAmount = HomeExpenseAmount + totalBudgetPlan;

  const navigate = useNavigate();
   

    const [isModalOpen, setIsModalOpen] = useState(false);
   
    const [currentBudget, setCurrentBudget] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
  
    // let currentMonth = getCurrentMonthName();
  
    useEffect(() => {
      isAuthenticatedDetails(setIsLoggedIn, setUserId);
    }, [isLoggedIn]);
  
    useEffect(() => {
      if (userId) {
        fetchBudgets(userId);
      }
    }, [userId]);
  
    
    const handleAddNewPlan = () => {
      setCurrentBudget(null);
      setEditIndex(null);
      setIsModalOpen(true);
    };
  
    const handleEditBudget = (index) => {
      setCurrentBudget(budgets[index]);
      setEditIndex(index);
      setIsModalOpen(true);
    };
  
    // const handleAddOrEditBudget = async (newBudget) => {
    //   if (editIndex !== null) {
    //     await editPlan(userId, budgets[editIndex].id, newBudget);
    //     const updatedBudgets = budgets.map((budget, index) =>
    //       index === editIndex
    //         ? { ...newBudget, id: budgets[editIndex].id }
    //         : budget
    //     );
    //     setBudgets(updatedBudgets);
    //   } else {
    //     await createPlan(userId, newBudget);
    //     setBudgets([
    //       ...budgets,
    //       { ...newBudget, id: Math.floor(Math.random() * 1000000) },
    //     ]);
    //   }
    //   setIsModalOpen(false);
    // };
  
    // const handleRemoveBudget = async (index) => {
    //   await deletePlan(userId, budgets[index].id);
    //   const updatedBudgets = budgets.filter((_, i) => i !== index);
    //   setBudgets(updatedBudgets);
    // };
  
    const totalAmount = totalPlanBugdet(budgets);

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    getLoggedUser(setLoggedUser);
    isAuthenticatedDetails(setIsLoggedIn, setUserId);
    listTransactions(setTransactions);
    fetchBudgets(userId);
    waitToLoad(setLoading);
  }, [navigate, isLoggedIn]);

  return (
    <div className="main_dashboard">
      {isLoggedIn && (
        <>
       
          <div
            style={{
              paddingTop: "5px",
              paddingBottom: "20px",
              margin: "5px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Link
              to="/Dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ArrowBackIcon style={{ marginRight: "5px" }} /> Go back
            </Link>
          </div>

          <div className="dashboard_grid">
            <div className="dashboard_item goal_amount">
              {isLoggedIn && (
                <CardBugdeto
                  dataExpense={goalAmount}
                  type="Save Goal till 30th December 2024"
                />
              )}
            </div>
            <div className="dashboard_item goal_amount">
              <p>
                On this page you will be able to change goal settings and more
                settings
              </p>
            </div>
          </div>

          <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "10px",
                  alignItems: "center",
                  color: "white",
                  backgroundColor: "#008DDA",
                  justifyContent: "center",
                }}
              >
                <p onClick={handleAddNewPlan} className="Add_plan">
                  Add a Goal for this month
                </p>
                <AddIcon onClick={handleAddNewPlan} className="Add_plan" />
              </div>
        </>
      )}
      {!isLoggedIn && <NoAccess />}
    </div>
  );
}

export default UserSettings;
