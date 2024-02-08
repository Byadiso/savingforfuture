import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Stories from "./components/Stories";
import Blogs from "./components/ListBlogs";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { listBlog, listVocabularies } from "./firebase/getBlogs.js";
import ListBlogs from "./components/ListBlogs";
import Vocabulary from "./components/Vocabulary.jsx";
import Login from "./components/Login.jsx";
import NoMatch from "./components/NoMatch.jsx";
// import { listVocabularies } from "./firebase/getVocabularies.js";

function App() {
  // const [blogList, setBlogList] = useState([]);
  // const [vocabularyList, setVocabularyList] = useState([]);

  // console.log(blogList);

  // useEffect(() => {
  //   // const unsubscribe = () => {
  //     listBlog(setBlogList);
  //     listVocabularies(setVocabularyList);
  //   // };
  //   // return () => unsubscribe();
  // }, []);

  return (
    <div className="App">
      {/* <Navbar />
      <LandingPage
        blogNumber={blogList.length}
        vocabularyNumber={vocabularyList.length}
      /> */}
      {/* <Footer /> */}
      {/* <div> */}

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Stories" element={<Stories />} />
          <Route path="/Blogs" element={<ListBlogs />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Vocabulary" element={<Vocabulary />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>

      {/* </div> */}
    </div>
  );
}

export default App;
