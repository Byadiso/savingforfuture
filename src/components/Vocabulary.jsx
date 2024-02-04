import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../Style/Vocabulary.css';

function Vocabulary() {
  return (
    <div>
      <Navbar />
      <section>
        <div class="vocabulary_main">
          <div class="vocabulary_content">
            <div class="header_vocabulary">
              <h3>Vocabulary Lists</h3>
              <p>
                Explore our library of over
                <span id="number_of_vocabulary">0</span> curated lists.
              </p>
              <div class="vocabulary_search">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search your world"
                />
                <button id="submit" class="submit">
                  Search
                </button>
            <p id="error" style={{"color":"red"}}></p>
              </div>

              <div id="search_content" class="hide"></div>
            </div>

            <div class="vocabulary_item_content" id="vocabulary_item_content">
              {/* <!-- vocabulary will go here --> */}
            </div>

            <div class="sample_vocabulary_header">
              <div>
                <h1>September Sample</h1>
                <p>Vocabulary for this month, Occassions, and Events</p>
              </div>
              <div class="buton">
                <button>Explore collection</button>
              </div>
            </div>
            <div class="sample_vocabulary_content">
              <div>
                <img src="../images/blog.jpg" width="100px" alt="" />
              </div>
              <div class="card_vocabulary">
                <div class="card_vocabulary_container">
                  <div class="card_vocabulary_header">
                    <p>title</p>
                  </div>
                  <div class="card_vocabulary_body">
                    <p>yes it is content</p>
                  </div>
                </div>
                <div class="card_vocabulary_container">
                  <div class="card_vocabulary_header">
                    <p>title</p>
                  </div>
                  <div class="card_vocabulary_body">
                    <p>yes it is content</p>
                  </div>
                </div>
                <div class="card_vocabulary_container">
                  <div class="card_vocabulary_header">
                    <p>title</p>
                  </div>
                  <div class="card_vocabulary_body">
                    <p>yes it is content</p>
                  </div>
                </div>
                <div class="card_vocabulary_container">
                  <div class="card_vocabulary_header">
                    <p>title</p>
                  </div>
                  <div class="card_vocabulary_body">
                    <p>yes it is content</p>
                  </div>
                </div>
                <div class="card_vocabulary_container">
                  <div class="card_vocabulary_header">
                    <p>title</p>
                  </div>
                  <div class="card_vocabulary_body">
                    <p>yes it is content</p>
                  </div>
                </div>
                <div class="card_vocabulary_container">
                  <div class="card_vocabulary_header">
                    <p>title</p>
                  </div>
                  <div class="card_vocabulary_body">
                    <p>yes it is content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Vocabulary;
