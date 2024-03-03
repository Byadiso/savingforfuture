import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/Vocabulary.css";
import { listVocabularies } from "../firebase/getBlogs";
import { FaTrash } from "react-icons/fa";
import { isAuthenticated } from "../firebase/Authentication";
import NoAccess from "./NoAccess";
import { Button } from "@mui/material";
import InputComponent from "./InputComonents/InputComponent";

function Vocabulary() {
  const [vocabularyList, setVocabularyList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[SearchTerm, setSearchTerm] = useState("")

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    console.log(e.target.value);
  };

  const handleSubmit =(e)=>{
    e.preventDefault();    
    console.log(SearchTerm);
    console.log("submitting something...");
  }

  useEffect(() => {
    listVocabularies(setVocabularyList);
    isAuthenticated(setIsLoggedIn);
  }, [isLoggedIn]);
  return (
    <div>
      <Navbar />
      {isLoggedIn ? (
        <div className="vocabulary_main">
          <div className="vocabulary_content">
            <div className="header_vocabulary">
              <h3>Vocabulary Lists</h3>
              <p>
                Explore our library of over
                {" " + vocabularyList.length} curated lists.
              </p>
              <div
                className="vocabulary_search"
                style={{
                  margin: "20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
               
                <InputComponent
                  placeholder="Search your world..."
                  name="search"
                  handleChange={(e)=>handleChange(e)}
                />
                <Button variant="contained" style={{marginLeft:"10px"}} onClick={handleSubmit}>Search</Button>
                <p id="error" style={{ color: "red" }}></p>
              </div>

              <div id="search_content" className="hide"></div>
            </div>

            <div
              className="vocabulary_item_content"
              id="vocabulary_item_content"
            >
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
      ) : (
        <NoAccess />
      )}
      <Footer />
    </div>
  );
}

export default Vocabulary;
