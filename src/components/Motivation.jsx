import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../firebase/Authentication";
import { Link } from "react-router-dom";
import NoAccess from "./NoAccess";
import { waitToLoad } from "../firebase/Helpers";
import TableData from "./TableData";
import CardBugdeto from "./CardBugdeto";
import "../Style/Dashboard.css";
import { listTransactions } from "../firebase/getTransactions";
import { filterBenefits} from "../firebase/Filters";


function Motivation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = React.useState([]);

  const { filteredTransactions, totalIncome } = filterBenefits(
    transactions
  );

  const listSuper = (setDataList) => {
    return setDataList(filteredTransactions);
  };

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    listTransactions(setTransactions);
    waitToLoad(setLoading);
  }, [isLoggedIn]);

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
          <CardBugdeto dataExpense={totalIncome} />
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
            <TableData fetchDataFunction={listSuper} />
          ) : (
            !loading && <NoAccess />
          )}
        </div>
      </div>
    </div>
  );
}

export default Motivation;
