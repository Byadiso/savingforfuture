import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/Vocabulary.css";
import { listVocabularies } from "../firebase/getBlogs";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../firebase/Authentication";

function Vocabulary() {
  const [vocabularyList, setVocabularyList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // will redirect to login page if not logged in
  const navigate = useNavigate();

  console.log(vocabularyList);

  useEffect(() => {
    listVocabularies(setVocabularyList);
    isAuthenticated(setIsLoggedIn);
    if (!isLoggedIn) {
      navigate("/Login");
    } else {
      navigate("/Vocabulary");
    }

  }, [navigate, isLoggedIn]);
  return (
    <div>
      <Navbar />
      <div className="vocabulary_main">
        <div className="vocabulary_content">
          <div className="header_vocabulary">
            <h3>Vocabulary Lists</h3>
            <p>
              Explore our library of over
              {" " + vocabularyList.length} curated lists.
            </p>
            <div className="vocabulary_search">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search your world"
              />
              <button id="submit" className="submit">
                Search
              </button>
              <p id="error" style={{ color: "red" }}></p>
            </div>

            <div id="search_content" className="hide"></div>
          </div>

          <div className="vocabulary_item_content" id="vocabulary_item_content">
            {vocabularyList &&
              vocabularyList.map((vocabulary) => {
                <div className="vocabulary_box">
                  <div id="header_vocabulary">
                    <u>
                      <h4
                        className="vocabulary_header"
                        data-word={vocabulary.header}
                      >
                        {vocabulary.header}
                      </h4>{" "}
                    </u>
                    <FaTrash
                      className="fa fa-trash deleteButton"
                      data-uid={vocabulary.key}
                    />
                  </div>
                  <p className="vocabulary_paragraph">{vocabulary.content}</p>
                </div>;
              })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Vocabulary;
