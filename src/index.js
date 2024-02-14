import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom'
// import Stories from './components/Stories';
// import ListBlogs from './components/ListBlogs';
// import Dashboard from './components/Dashboard';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <App />
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
