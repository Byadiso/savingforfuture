import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, ButtonBase, Card, Grid, Paper, Typography } from "@mui/material";
import { listBlog } from "../firebase/getBlogs";
import SkeletonDashboard from "../Skeletons/SkeletonDashboard";
import styled from "@emotion/styled";
import EditForm from "./EditForm";
import CreateBlog from "./CreateBlog";
import DeleteModal from "./DeleteModal";
import { isAuthenticated } from "../firebase/Authentication";
import { Link, useNavigate } from "react-router-dom";
import NoAccess from "./NoAccess";
import { waitToLoad } from "../firebase/Helpers";
import TableData from "./TableData";
import CardBugdeto from "./CardBugdeto";
import BudgetGraph from "./BudgetGraph";
import "../Style/Dashboard.css";
import { dataBugdet } from "../firebase/data";

function Dashboard() {
  const [blogList, setBlogList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [ dataBugdet, setDataBudget ] = useState();

  const getData = () =>{
    setDataBudget(dataBugdet)    
  }

  const data = {
    earnings: 10000,
    expenses: 5000,
  };

  const navigate = useNavigate();

  useEffect(() => {
    getData()
    listBlog(setBlogList);
    isAuthenticated(setIsLoggedIn);
    waitToLoad(setLoading);
  }, [navigate, isLoggedIn, getData]);

  return (
    <div className="main_dashboard">
      <Navbar />
      <div className="bugdet_summary">
        <div className="bugdet_summary_item">
          <BudgetGraph data={data} />
        </div>
        <div className="bugdet_summary_item">
          <CardBugdeto dataExpense={dataBugdet}/>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", width:"100%" , padding:"80px"}}>
        <div style={{ padding:"20px"}}>
        {isLoggedIn ? <TableData /> : !loading && <NoAccess />}
        </div>
        <div style={{ padding:"20px"}}>
        {isLoggedIn ? <TableData /> : !loading && <NoAccess />}
        </div>

       
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
