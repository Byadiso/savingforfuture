import '../Style/LandingPage.css';
import React from "react";

function LandingPage() {
  return (
    <div>
      <div className="hero_section">
        <div>
          <h3>I am looking for...</h3>
        </div>

        <div className="hero_section_header">
          <div className="hero_section_header_blue">
            <p>
              A story to <strong>read</strong>
              <i className="fa fa-arrow-circle-down"></i>
            </p>
          </div>
          <div className="hero_section_header_red">
            <p>
              A story to <strong>Write</strong>
              <i className="fa fa-arrow-circle-down"></i>
            </p>
          </div>
          <div className="hero_section_header_green">
            <p>
              A vocabulary to <strong>read</strong>
              <i className="fa fa-arrow-circle-down"></i>
            </p>
          </div>
        </div>
      </div>

      <div className="main_content">
        <div>
          <p>
            "Unleash Brainy-Power! It's like a word carnival! Dive into a
            word-o-rama filled with definitions, examples, and surprises.
            Whether you're unraveling word mysteries or just exploring, join the
            word-party meant for language champs and the etymology-curious!"
          </p>
          <input type="button" value="Learn our vocabularies here" />
        </div>
        <div>
          <p>
            "Step into Storyland! Where tales grow like wildflowers (minus the
            pollen!). Get set for adventures that'll whisk you off to enchanted
            worlds. From epic quests to cozy tales, our stories are more
            gripping than a squirrel with a treasure map!"
          </p>
          <input type="button" value="Read our recent stories here" />
        </div>
      </div>

      <div className="main_who_static_section">
        <div className="statistic_section">
          <div className="stat_content">
            <span id="number_blog">0</span>
            <h4>Interesting Stories</h4>
          </div>
          <div className="stat_content stat_content_middle">
            <span id="number_books">0</span>
            <h4>New words</h4>
          </div>
          <div className="stat_content">
            <span id="number_users">2</span>
            <h4>We started recently</h4>
          </div>
        </div>

        <div className="who_section">
          <div className="main_who">
            {/* <!-- main who --> */}

            <div className="main_who_items">
              <img className="who_image" src="./images/tellstory.png" alt="book" />
              <div>
                <h2>Tell a story of your own...</h2>
                <p>Just a paragraph today, don't worry with the rest.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Services section --> */}

      <div className="service_section">
        <div className="Service_header">
          <h1>Check below your interest...</h1>
        </div>
        <div className="service_content">
          <div className="service_item">
            <div className="app_link banner_and_icon">
              <i className="fa-solid fa-pen-to-square"></i>
              <a href="./page/add_blog.html">
                <h5 className="service_title">Write English</h5>
              </a>
            </div>
          </div>
          <div className="service_item">
            <div className="app_link banner_and_icon">
              <i className="fa-solid fa-floppy-disk"></i>
              <a href="./page/vocabulary.html">
                <h5 className="service_title">New vocabularies</h5>
              </a>
            </div>
          </div>
          <div className="service_item">
            <div className="app_link banner_and_icon">
              <i className="fa-solid fa-book-open-reader"></i>
              <a href="./page/stories.html">
                <h5 className="service_title">Stories</h5>
              </a>
            </div>
          </div>
          <div className="service_item">
            <div className="app_link banner_and_icon">
              <i className="fa-solid fa-gamepad"></i>
              <a href="./page/games.html">
                <h5 className="service_title">Play games</h5>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
