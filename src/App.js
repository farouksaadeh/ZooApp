import React from "react";
import "./App.css";
import Login from "./components/Login/Login.js"
import Home from "./components/home/home";
import Ticket from "./components/Ticket/Ticket";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

       < Route path="/Ticket" element={<Ticket />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;


