import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import "../Style/Style.css";

function NoMatch() {
  return (
    <div>
      <Navbar />
      
      <div className='not_found'>
      <p > 404 No Match found!</p>
      </div>     

      <Footer />
      
      </div>
  )
}

export default NoMatch