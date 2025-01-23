import React, { useEffect } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Hintergrundbild from "./assets/HintergrundbildHome.png";
import monkey from "./assets/monkey.png";
import line1 from "./assets/Line1.svg";

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
      <img
        src={Hintergrundbild}
        alt="Hintergrund"
        className="background-image"
      />
      <div className="overlay">
        {/* Sidebar */}
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
          <img src={line1} alt="Line Separator" className="line-separator" />
          <h3>EVENTS</h3>
          <ul>
            <li>
              <a href="#maps">Maps</a>
            </li>
            <li>
              <a href="/tour">View animals</a>
            </li>
          </ul>
        </div>

        {/* Hauptbereich */}
        <div className="main-content">
          <h4>Spotted in</h4>
          <h1 className="zoo-title">
            Zoo <br />
            Zürich
          </h1>
          <p>Explore exotic animals in our futuristic Tour</p>
          <div className="tourBtn">
            <Link to="/tourHome" className="HomeTourButton">
              Zum Home der Tour
            </Link>
          </div>
        </div>

        {/* Affen-Bild */}
        <img src={monkey} alt="Monkey" className="monkey-image" />

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
      </div>
    </section>
  );
}
