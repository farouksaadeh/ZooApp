import React, { useState, useEffect } from "react";
import "./userAuth.css";
import Carousel1 from "./img/Carousel1.png";
import Carousel2 from "./img/Carousel2.png";
import Carousel3 from "./img/Carousel3.png";
import Carousel4 from "./img/Carousel4.png";
import darkLogo from "../../assets/DarkLogo.svg";
import { useNavigate } from "react-router-dom"; // Navigation hinzufügen

function UserAuth({ setLoggedInUser }) {
  // Zustand für eingeloggten Benutzer als Prop
  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [activeBullet, setActiveBullet] = useState(1);

  const images = [Carousel1, Carousel2, Carousel3, Carousel4];
  const textOptions = [
    "Wildnis in Zürich.",
    "Tiere hautnah.",
    "Abenteuer Zoo.",
    "Natur entdecken.",
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBullet((prev) => (prev % images.length) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleForm = () => {
    setIsSignUpMode((prevMode) => !prevMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password, name } = Object.fromEntries(formData.entries());

    const endpoint = `http://localhost:5000/customer`;

    try {
      if (isSignUpMode) {
        // Registrierung
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const customers = await response.json();
        const emailExists = customers.some((user) => user.email === email);

        if (emailExists) {
          alert("E-Mail ist bereits registriert.");
          return;
        }

        const registerResponse = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, role: "customer" }),
        });

        if (registerResponse.ok) {
          alert("Registrierung erfolgreich!");
          setLoggedInUser({ name, email, role: "customer" });
          navigate("/"); // Weiterleitung zur Startseite
        } else {
          alert("Ein Fehler ist aufgetreten. Bitte erneut versuchen.");
        }
      } else {
        // Login
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const users = await response.json();
        const user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          alert(
            `Willkommen zurück, ${user.name}! Sie sind ein ${
              user.role === "admin" ? "Admin" : "Kunde"
            }.`
          );
          setLoggedInUser(user); // Benutzer setzen
          navigate("/"); // Weiterleitung zur Startseite
        } else {
          alert("Ungültige Anmeldedaten.");
        }
      }
    } catch (error) {
      console.error("Fehler beim Senden der Daten:", error);
      alert("Ein Fehler ist aufgetreten. Bitte erneut versuchen.");
    }
  };

  return (
    <main className={`auth-main ${isSignUpMode ? "auth-sign-up-mode" : ""}`}>
      <div className="auth-box">
        <div className="auth-inner-box">
          <div className="auth-forms-wrap">
            {/* Login-Formular */}
            <form
              onSubmit={handleSubmit}
              className="auth-form auth-sign-in-form"
            >
              <div className="auth-logo" onClick={() => navigate("/")}>
                <img src={darkLogo} alt="easyclass" />
                <h4>Zoo Züri</h4>
              </div>

              <div className="auth-heading">
                <h2>Willkommen!</h2>
                <h6>Noch kein Konto?</h6>
                <a
                  href="#"
                  className="auth-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleForm();
                  }}
                >
                  Registrieren
                </a>
              </div>
              <div className="auth-input-wrap">
                <input
                  type="email"
                  className="auth-input-field"
                  placeholder="E-Mail"
                  name="email"
                  required
                />
              </div>
              <div className="auth-input-wrap">
                <input
                  type="password"
                  className="auth-input-field"
                  placeholder="Passwort"
                  name="password"
                  required
                />
              </div>
              <button type="submit" className="auth-sign-btn">
                Anmelden
              </button>
            </form>

            {/* Registrierungs-Formular */}
            <form
              className="auth-form auth-sign-up-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-logo" onClick={() => navigate("/")}>
                <img src={darkLogo} alt="easyclass" />
                <h4>Zoo Züri</h4>
              </div>
              <div className="auth-heading">
                <h2>Jetzt registrieren!</h2>
                <h6>Bereits ein Konto?</h6>
                <a
                  href="#"
                  className="auth-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleForm();
                  }}
                >
                  Anmelden
                </a>
              </div>
              <div className="auth-input-wrap">
                <input
                  type="text"
                  className="auth-input-field"
                  placeholder="Name"
                  name="name"
                  required
                />
              </div>
              <div className="auth-input-wrap">
                <input
                  type="email"
                  className="auth-input-field"
                  placeholder="E-Mail"
                  name="email"
                  required
                />
              </div>
              <div className="auth-input-wrap">
                <input
                  type="password"
                  className="auth-input-field"
                  placeholder="Passwort"
                  name="password"
                  required
                />
              </div>
              <button type="submit" className="auth-sign-btn">
                Registrieren
              </button>
            </form>
          </div>

          {/* Carousel */}
          <div className="auth-carousel">
            <div className="auth-images-wrapper">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`auth-image ${
                    activeBullet === index + 1 ? "show" : ""
                  }`}
                  alt={`Slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="auth-text-slider">
              <div className="auth-text-wrap">
                <div
                  className="auth-text-group"
                  style={{
                    transform: `translateY(${-(activeBullet - 1) * 2.2}rem)`,
                  }}
                >
                  {textOptions.map((text, index) => (
                    <h2 key={index}>{text}</h2>
                  ))}
                </div>
              </div>
              <div className="auth-bullets">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={activeBullet === index + 1 ? "active" : ""}
                    onClick={() => setActiveBullet(index + 1)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UserAuth;
