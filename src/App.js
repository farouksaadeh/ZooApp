import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Komponenten-Importe
import Home from "./components/home/home";
import Tour from "./components/tour/tour.js";
import TourHome from "./components/tour/tourHome.js";
import InfoZoo from "./components/tour/info.js";
import Ticket from "./components/Ticket/Ticket.js";
import UserAuth from "./components/Auth/userAuth";
import TicketInfo from "./components/Ticket/TicketInfo"; // TicketInfo-Seite importieren

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <div className="App">
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

          {/* Ticket Page */}
          <Route path="/ticket" element={<Ticket />} />

          {/* UserAuth Page */}
          <Route
            path="/auth"
            element={<UserAuth setLoggedInUser={setLoggedInUser} />}
          />

          {/* Tour Pages */}
          <Route path="/tour" element={<Tour />} />
          <Route path="/tourHome" element={<TourHome />} />
          <Route path="/info" element={<InfoZoo />} />

          {/* TicketInfo Page */}
          <Route path="/ticket-info/:ticketId" element={<TicketInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
