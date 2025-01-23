import React from "react";
import "./App.css";
import Home from "./components/home/home";
import Tour from "./components/tour/tour.js";
import TourHome from "./components/tour/tourHome.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InfoZoo from "./components/tour/info.js";
import Ticket from "./components/Ticket/Ticket.js";
import React, { useState } from "react";
import UserAuth from "./components/Auth/userAuth";



function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <div className="App">
        {/* Define Routes for navigation */}
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          {/* Login Page */}
          <Route path="/login" element={<Login />} />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
          <Route
            path="/auth"
            element={<UserAuth setLoggedInUser={setLoggedInUser} />}
          />
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