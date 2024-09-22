import React, { useEffect, useState } from 'react';
import { readArchivedPlans } from '../firebase/ArchiveLogics';
import { isAuthenticatedDetails } from '../firebase/Authentication';
import { Link } from 'react-router-dom';
import "../Style/Archive.css";

// Archived Component
const CurrentTransaction = () => {
  const [archives, setArchives] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Store the user ID

  console.log(archives, userId);
  

  useEffect(() => {
   
    isAuthenticatedDetails(setIsLoggedIn, setUserId);  
    if (userId) {
      fetchArchivedData(userId)
    }
    
  }, [userId]);

  const fetchArchivedData = async (userId) => {
    const data = await readArchivedPlans(userId);    
    const archiveArray = Object.keys(data).map(key => ({
      id: key,
      ...data[key],
    }));
    setArchives(archiveArray);    
  };

  return (
    <div className="archive-container">
  <div style={{ paddingTop: "20px", margin: "20px" }}>
    <Link to="/Dashboard"> Go back</Link>
  </div>
  <div
    className="bugdet_summary"
    style={{ display: "flex", flexDirection: "row", alignItems: "center", margin:"10" }} /* Updated */
  >
   <h1> Welcome to Current month transactions dashboard </h1>
  </div>
</div>

  );
};

export default CurrentTransaction;
