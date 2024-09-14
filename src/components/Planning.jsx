import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../firebase/Authentication";
import { Link } from "react-router-dom";
import "../Style/Planning.css";
import AddIcon from "@mui/icons-material/Add";
import BudgetModal from "./BudgetModal"; // Import the modal

function Planning() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [budgets, setBudgets] = useState([]); // Store planned budgets
  const [currentBudget, setCurrentBudget] = useState(null); // Store the budget being edited
  const [editIndex, setEditIndex] = useState(null); // Store index of the budget being edited

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
  }, [isLoggedIn]);

  // Open modal for adding a new budget
  const handleAddNewPlan = () => {
    setCurrentBudget(null); // No budget for adding a new one
    setEditIndex(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing budget
  const handleEditBudget = (index) => {
    setCurrentBudget(budgets[index]); // Set the current budget for editing
    setEditIndex(index);
    setIsModalOpen(true);
  };

  // Add or update a budget
  const handleAddOrEditBudget = (newBudget) => {
    if (editIndex !== null) {
      // Update an existing budget
      const updatedBudgets = budgets.map((budget, index) =>
        index === editIndex ? newBudget : budget
      );
      setBudgets(updatedBudgets);
    } else {
      // Add a new budget
      setBudgets([...budgets, newBudget]);
    }
    setIsModalOpen(false); // Close the modal
  };

  // Remove a budget
  const handleRemoveBudget = (index) => {
    const updatedBudgets = budgets.filter((_, i) => i !== index);
    setBudgets(updatedBudgets);
  };

  return (
    <div className="main_dashboard">
      <div style={{ paddingTop: "20px", margin: "20px" }}>
        <Link to="/Dashboard"> Go back</Link>
      </div>
      <div style={{ padding: "20px", margin: "20px", color: "black" }}>
        <h4>Welcome to your planning page</h4>
        <div className="main_container_planner">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Start Planning</p>
            <AddIcon onClick={handleAddNewPlan} className="Add_plan" />
          </div>

          {/* Display Budget Cards */}
          <div className="budget-cards-container">
            {budgets.length > 0 ? (
              budgets.map((budget, index) => (
                <div className="budget-card" key={index}>
                  <h5>{budget.name}</h5>
                  <p>Amount: ${budget.amount}</p>
                  <p>Category: {budget.category}</p>
                  <button onClick={() => handleEditBudget(index)}>Edit</button>
                  <button onClick={() => handleRemoveBudget(index)}>Remove</button>
                </div>
              ))
            ) : (
              <p>No plans yet. Start by adding a budget.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Budget */}
      {isModalOpen && (
        <BudgetModal
          closeModal={() => setIsModalOpen(false)}
          addOrEditBudget={handleAddOrEditBudget}
          currentBudget={currentBudget} // Pass the current budget for editing
        />
      )}
    </div>
  );
}

export default Planning;
