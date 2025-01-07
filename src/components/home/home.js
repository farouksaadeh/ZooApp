import React, { useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home({ loggedInUser, setLoggedInUser }) {
  // Funktion für Logout
  const handleLogout = () => {
    setLoggedInUser(null); // Benutzer-Status zurücksetzen
    localStorage.removeItem("loggedInUser"); // Benutzer aus localStorage entfernen
    alert("Erfolgreich ausgeloggt!"); // Popup anzeigen
  };

  // Effekt: Wenn `loggedInUser` existiert, speichern in `localStorage`
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      const savedUser = localStorage.getItem("loggedInUser");
      if (savedUser) {
        setLoggedInUser(JSON.parse(savedUser)); // Benutzer aus localStorage setzen
      }
    }
  }, [loggedInUser, setLoggedInUser]);

  useEffect(() => {
    document.title = "Home | Züri Zoo";
  }, []);

  return (
    <section className="home-section">
      <div className="sidebar">
        <h2>ZÜRI ZOO</h2>
        <ul>
          <li>
            <a href="#faq">FAQ</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <h3>EVENTS</h3>
        <ul>
          <li>
            <Link to="/tourHome">Map</Link>
          </li>
          <li>
            <Link to="/tourHome">View Animals</Link>
          </li>
          <li>
          <Link to="/ticket" >
            Tickets
          </Link>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <h4>Spotted in</h4>
        <h1>Zoo Zürich</h1>
        <p>Explore exotic animals in our futuristic Tour</p>
        <div className="tourBtn">
          <Link to="tour" className="purchase-button">
            Zur Tour
          </Link>
        </div>
      </div>

      {/* Login/Logout Button */}
      <div className="user-section">
        {loggedInUser ? (
          <div className="logged-in-info">
            <span className="user-name">
              Welcome, <span className="bold-name">{loggedInUser.name}</span>!
            </span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth" className="login-button">
            Login
          </Link>
        )}
      </div>
    </section>
  );
}
