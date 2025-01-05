import React from "react";
import "./App.css";
import Login from "./components/Login/Login.js"
import Home from "./components/home/home";
import Tour from "./components/tour/tour.js";
import TourHome from "./components/tour/tourHome.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InfoZoo from "./components/tour/info.js";
import Ticket from "./components/Ticket/Ticket.js";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define Routes for navigation */}
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/tourHome" element={<TourHome />} />
          <Route path="/info" element={<InfoZoo />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


