import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../firebase/Authentication";
import { Link } from "react-router-dom";
import NoAccess from "./pages/ErrorComponents/NoAccess";
import { waitToLoad } from "../Helpers/Helpers";
import TableData from "./TableData";
import CardBugdeto from "./CardBugdeto";
import "../Style/Dashboard.css";
import { listTransactions } from "../firebase/getTransactions";
import { filterBenefits} from "../firebase/Filters";


function Motivation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = React.useState([]);

  const { filteredBenefits, totalBenefits } = filterBenefits(
    transactions
  );


  const listBenefits = (setDataList) => {
    return setDataList(filteredBenefits);
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
            width: "100%",
            padding: "20px",
          }}
        >
          <CardBugdeto dataExpense={totalBenefits} />
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
        <div style={{  width: "100%" }}>
          {isLoggedIn ? (
            <TableData fetchDataFunction={listBenefits} />
          ) : (
            !loading && <NoAccess />
          )}
        </div>
      </div>
    </div>
  );
}

export default Motivation;
