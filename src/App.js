import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage.jsx";

import ListBlogs from "./components/ListBlogs";
import Vocabulary from "./components/Vocabulary.jsx";
import Login from "./components/Login.jsx";
import NoMatch from "./components/NoMatch.jsx";
import SingleBlog from "./components/SingleBlog.jsx";
import Logout from "./components/Logout.jsx";
import User from "./components/UserProfile.jsx";
import Register from "./components/RegisterComponent.jsx";
import AddBlog from "./components/AddBlog.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/learnByWritingV3" element={<LandingPage />} />

          {/* routes for Blogs */}
          <Route path="/Blogs" element={<ListBlogs />} />
          <Route path="/Blogs/:id" element={<SingleBlog />} />
          <Route path="/Add_blog" element={<AddBlog />} />

          
          <Route path="/Vocabulary" element={<Vocabulary />} />

          <Route path="/Dashboard" element={<Dashboard />} />
{/* routes for stories */}
         
          <Route path="/User" element={<User />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/Logout" element={<Logout />} />
          {/* routes when no match */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
