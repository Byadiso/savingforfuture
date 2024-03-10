import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Style/Vocabulary.css";
import { listVocabularies } from "../firebase/Vocabulary";
import { isAuthenticated } from "../firebase/Authentication";
import NoAccess from "./NoAccess";
import { Box, Button, Grid } from "@mui/material";
import InputComponent from "./InputComonents/InputComponent";
import VocabularyBlock from "./VocabularyBlock";
import { getWord } from "../firebase/APIs";
import { waitToLoad } from "../firebase/Helpers";

function Vocabulary() {
  const [vocabularyList, setVocabularyList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [SearchTerm, setSearchTerm] = useState("");
  const [wordList, setWordList] = useState([]);
  const [error, setError] = useState("");
  const [checkingVocabulary, setCheckingVocabulary] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setError("");
    setCheckingVocabulary(false);
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!SearchTerm) {
      setError("Please enter a search term");
    } else {
      setCheckingVocabulary(true);
      getWord(SearchTerm).then((word) => {
        if(!word){
          console.log(word)
        }else{
          setWordList(word.results);
        }
        
      });
    }
  };

  useEffect(() => {
    isAuthenticated(setIsLoggedIn);
    listVocabularies(setVocabularyList);
    //waiting for data to load after 4seconds
    waitToLoad(setLoading);
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
                  name="search"
                  handleChange={(e) => handleChange(e)}
                />
                <Button
                  variant="contained"
                  style={{ marginLeft: "10px" }}
                  onClick={handleSubmit}
                >
                  Search
                </Button>
              </div>
              <p
                style={{ color: "red", fontSize: "13px", marginLeft: "-100px" }}
              >
                {error}
              </p>

              {checkingVocabulary &&
                wordList.length !== 0 &&
                wordList.map((word, key) => (
                  <p key={key} id="search_content">
                    <strong>{SearchTerm + " : "}</strong>
                    {word.definition}
                  </p>
                ))}
            </div>

            <div
              className="vocabulary_item_content"
              id="vocabulary_item_content"
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                  style={{
                    paddingTop: "20px",
                    marginBottom: "100px",
                  }}
                >
                  {!checkingVocabulary &&
                    vocabularyList &&
                    vocabularyList.map((vocabulary, index) => (
                      <Grid item xs={4} sm={3} md={4} key={index}>
                        <VocabularyBlock
                          key={index}
                          header={vocabulary.header}
                          uid={vocabulary.uid_key}
                          content={vocabulary.content}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      ) : (
        !loading && <NoAccess />
      )}
      <Footer />
    </div>
  );
}

export default Vocabulary;
