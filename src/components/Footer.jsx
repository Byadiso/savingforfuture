import React from "react";
import "../Style/Footer.css";
import { FaCopyright } from "react-icons/fa";

function Footer() {
  const currentdate = new Date();

  const year = currentdate.getFullYear();

  return (
    <div>
      <footer>
        <div className="copyright">
          <p>
            <FaCopyright className="fa fa-copyright" />
            {year}Ngana Tech
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
