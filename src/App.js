import { useEffect, useState } from "react";
import { Route, Link, Switch, Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Stories from "./components/Stories.jsx";
import Blogs from "./components/ListBlogs.jsx";
import Dashboard from "./components/Dashboard.jsx";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import { listBlog, listVocabularies } from "./firebase/getBlogs.js";
// import { listVocabularies } from "./firebase/getVocabularies.js";

function App() {
  const [blogList, setBlogList] = useState([]);
  const [vocabularyList, setVocabularyList] = useState([]);

  useEffect(() => {
    const unsubscribe = () => {
      listBlog(setBlogList);
      listVocabularies(setVocabularyList);
    };
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <div>
        
          <Routes>
            <Route exact path="/" element={App} />
            <Route path="/Stories" element={Stories} />
            <Route path="/Blogs" element={Blogs} />
            <Route path="/Dashboard" element={Dashboard} />
          </Routes>
       
      </div>
      <Navbar />
      <LandingPage
        blogNumber={blogList.length}
        vocabularyNumber={vocabularyList.length}
      />
      <Footer />
    </div>
  );
}

export default App;
