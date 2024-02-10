// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import Footer from "./components/Footer";
import Stories from "./components/Stories";
// import Blogs from "./components/ListBlogs";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage.jsx";
// import Navbar from "./components/Navbar.jsx";
// import { listBlog, listVocabularies } from "./firebase/getBlogs.js";
import ListBlogs from "./components/ListBlogs";
import Vocabulary from "./components/Vocabulary.jsx";
import Login from "./components/Login.jsx";
import NoMatch from "./components/NoMatch.jsx";
import SingleBlog from "./components/SingleBlog.jsx";
import Logout from "./components/Logout.jsx";
import User from "./components/UserProfile.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Stories" element={<Stories />} />
          <Route path="/Blogs" element={<ListBlogs />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Vocabulary" element={<Vocabulary />} />
          <Route path="/User" element={<User />} />
          
          <Route path="/Blogs/:id" element={<SingleBlog />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>

      {/* </div> */}
    </div>
  );
}

export default App;
