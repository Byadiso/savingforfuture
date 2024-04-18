import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage.jsx";

import Login from "./components/Login.jsx";
import NoMatch from "./components/NoMatch.jsx";
import Logout from "./components/Logout.jsx";
import Register from "./components/RegisterComponent.jsx";
import Navbar from "./components/Navbar.jsx";
import AddRecord from "./components/AddRecord.jsx";
import SuperBet from "./components/SuperBet.jsx";
import Benefits from "./components/Benefits.jsx";
import Motivation from "./components/Motivation.jsx";
import Planning from "./components/Planning.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="https://byadiso.github.io/budgeto/" element={<LandingPage />} />
          
          <Route path="/Plan" element={<Planning />} />             

          <Route path="/bugdeto" element={<LandingPage />} />                         

          <Route path="/Dashboard" element={<Navbar />} />

          <Route path="/Benefits" element={<Benefits />} />
          <Route path="/Add" element={<AddRecord />} />
          <Route path="/Reports" element={<Benefits />} />

          <Route path="/Motivation" element={<Motivation />} />

          

          <Route path="/Super" element={<SuperBet />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/Logout" element={<Logout />} />
          {/* routes when no match */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
