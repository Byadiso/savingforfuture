import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/pages/LandingPage.jsx";

import Login from "./components/pages/UserAuth/Login.jsx";
import NoMatch from "./components/pages/ErrorComponents/NoMatch.jsx";
import Logout from "./components/pages/UserAuth/Logout.jsx";
import Register from "./components/pages/UserAuth/RegisterComponent.jsx";
import Navbar from "./components/pages/Layouts/Navbar.jsx";
import AddRecord from "./components/pages/AddRecord.jsx";
import Planning from "./components/pages/Planning.jsx";
import Transaction from "./components/pages/Transaction.jsx";
import CurrentTransaction from "./components/pages/CurrentTransaction.jsx";
import Reports from "./components/pages/Reports.jsx";
import UserSettings from "./components/pages/UserSettings.jsx";
import MemberList from "./components/pages/Member_list.jsx";
import LastMonths from "./components/pages/LastMonths.jsx";
import ViewAddAndBankCharges from "./components/pages/ViewAddAndBankCharges.jsx";
import DataDashboard from "./components/pages/DataDashboard.jsx";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="https://byadiso.github.io/savingforthefuture/" element={<LandingPage />} />
          
          <Route path="/Add Notes" element={<Planning />} />             

          <Route path="/bugdeto" element={<LandingPage />} />                         

          <Route path="/Dashboard" element={<Navbar />} />
          <Route path="/Members list" element={<MemberList />} />

          <Route path="/Add" element={<AddRecord />} />
          <Route path="/Reports" element={<Reports />} />
         
          <Route path="/Transaction/:id" element={<Transaction />} />

          <Route path="/Last_Months" element={<LastMonths />} />
          <Route path="/CurrentTransaction" element={<CurrentTransaction />} />     

          
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/UserSettings" element={<UserSettings />} />

          <Route path="/Add-ons & Charges" element={<ViewAddAndBankCharges />} />
          <Route path="/Data & Documents" element={<DataDashboard />} />



          

          <Route path="/Logout" element={<Logout />} />
          {/* routes when no match */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
