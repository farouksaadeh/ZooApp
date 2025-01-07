import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./components/Login/Login.js"
import Home from "./components/home/home";
import UserAuth from "./components/Auth/userAuth";
import Tour from "./components/tour/tour.js";
import TourHome from "./components/tour/tourHome.js";
import InfoZoo from "./components/tour/info.js";
import Ticket from "./components/Ticket/Ticket.js";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <div className="App">
        {/* Define Routes for navigation */}
      <div>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <Home
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
          {/* Authentication Page */}
          <Route
            path="/auth"
            element={<UserAuth setLoggedInUser={setLoggedInUser} />}
          />
          {/* Tour Page */}
          <Route path="/tour" element={<Tour />} />
          {/* Tour Home Page */}
          <Route path="/tourHome" element={<TourHome />} />
          {/* Info Page */}
          <Route path="/info" element={<InfoZoo />} />
          {/* Ticket Page */}
          <Route path="/ticket" element={<Ticket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
