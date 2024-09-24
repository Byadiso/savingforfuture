import React, { useEffect, useState } from 'react';
import { readArchivedPlans } from '../firebase/ArchiveLogics';
import { isAuthenticatedDetails } from '../firebase/Authentication';
import { Link } from 'react-router-dom';
import "../Style/Archive.css";

// Archived Component
const ArchiveCard = () => {
  const [archives, setArchives] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Store the user ID

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
    {archives ? isLoggedIn && archives.map((archive, index) => (
      <div key={index} className="archive-card">
        <h3>Total amount for the month</h3>
        <div className='card'>
        <h5>{archive.month}</h5>
        <p>Amount: {archive.amount}</p>
        </div>
        
      </div>
    )) : (
      <div className="archive-card">
        <h3>No plan archived for this user</h3>
      </div>
    )}
  </div>
</div>

  );
};

export default ArchiveCard;
