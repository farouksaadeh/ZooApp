import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/home/home";
import Tour from "./components/tour/tour.js";
import TourHome from "./components/tour/tourHome.js";
import InfoZoo from "./components/tour/info.js";
import Ticket from "./components/Ticket/Ticket.js";
import UserAuth from "./components/Auth/userAuth";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <div className="App">
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
