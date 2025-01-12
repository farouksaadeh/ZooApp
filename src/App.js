import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import UserAuth from "./components/Auth/userAuth";
import Tour from "./components/tour/tour.js";



function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <Router>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;