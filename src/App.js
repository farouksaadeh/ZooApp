import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Ticket from "./components/Ticket/Ticket.js";  // Ticket importieren
import UserAuth from "./components/Auth/userAuth";
import Tour from "./components/tour/tour.js";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
      <div className="App">
        {/* Define Routes for navigation */}
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
          <Route path="/ticket" element={<Ticket />} /> {/* Hier die Ticket-Seite */}
          {/* UserAuth Page */}
          <Route
            path="/auth"
            element={<UserAuth setLoggedInUser={setLoggedInUser} />}
          />
          {/* Tour Page */}
          <Route path="/tour" element={<Tour />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
