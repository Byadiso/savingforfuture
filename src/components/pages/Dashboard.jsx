import React, { useEffect, useState } from "react";
import {
  checkIfAdmin,
  getLoggedUser,
  isAuthenticated,
  isAuthenticatedDetails,
} from "../../firebase/Authentication";
import { useNavigate } from "react-router-dom";
import NoAccess from "./ErrorComponents/NoAccess";
import {
  getCurrentMonthName,
  totalPlanBugdet,
  waitToLoad,
} from "../../Helpers/Helpers";
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

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loggedUser, setLoggedUser] = useState([]);

  const { totalExpense, totalIncome } = listAlltransactionWithoutSuper(
    transactions,
    KEYWORDS
  );
  const { totalBenefits } = filterBenefits(transactions);
  const { total } = filterTransactionsAndCalculateTotal(transactions, KEYWORDS);

  const { filteredWhatIsNotMine, totalWhatIsNotMine } = filterWhatIsNotMine(
    transactions
  );

  const goalAmount = 7200;
  const currentMonth = getCurrentMonthName();
  const currentYear = new Date().getFullYear();
 

  const isAdmin = checkIfAdmin(userId);

  // Total Budget Plan calculation + adjusted Home Expense
  const totalBudgetPlan = 7200*36;
  const homeExpenseAmount = 7200 *12;

  const navigate = useNavigate();

  const fetchBudgets = async (userId) => {
    const plans = await readPlans(userId);
    const plansArray = Object.keys(plans).map((key) => ({
      id: key,
      ...plans[key],
    }));
    setBudgets(plansArray);
  };

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    getLoggedUser(setLoggedUser);
    isAuthenticatedDetails(setIsLoggedIn, setUserId);
    listTransactions(setTransactions);
    fetchBudgets(userId);
    waitToLoad(setLoading);
  }, [navigate, isLoggedIn, userId]);

  if (!isLoggedIn) return <NoAccess />;

  if (loading)
    return (
      <div className="dashboard_loading">
        <p>Loading dashboard...</p>
      </div>
    );

  return (
    <div className="main_dashboard">
      <div className="dashboard_grid">
        <section className="dashboard_item goal_amount">
          <CardBugdeto
            dataExpense={goalAmount}
            type={`The account in ${currentMonth},${currentYear} `}
          />
        </section>

        {!isAdmin && (
          <section className="dashboard_item home_amount">
            <CardBugdeto dataExpense={homeExpenseAmount} type=" in 12 Months" />
          </section>
        )}

        

        <section className="dashboard_item">
          <CardBugdeto dataExpense={totalBudgetPlan} type="After 3 Years" />
        </section>

        
      </div>
    </div>
  );
}

export default Dashboard;
