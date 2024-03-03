import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import "../Style/Style.css";
import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <div>
      <Navbar />
      
      <div className='not_found' style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
      <p style={{color: "black"}}> 404 No Match found!</p>
      <Link to="/"><p style={{color: "black"}}>Return to Home Page</p></Link>
      </div>     

      <Footer />
      
      </div>
  )
}

export default NoMatch