import React from "react";
import "./tour.css";
import "./info.css";
import {Link} from "react-router-dom";
import logo from "../../assets/transparantLogo/BG-removed.png";


function InfoZoo() {
  return (
    <div>
      <div className="header">
        <Link to="/tourHome">
          <button className="back-button">←</button>
        </Link>
        <h1>Zürich Zoo</h1>
        <div className="options-menu">•••</div>
      </div>
      <section className="hero-full">
        <div className="hero-overlay">
          <h1>Willkommen im Zürich Zoo</h1>
          <p>
            Erlebe Wildtiere hautnah und lerne über ihren Schutz und ihre
            Lebensräume.
          </p>
          <button
            className="scroll-down-button"
            onClick={() =>
              document
                .getElementById("info")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            ⬇ Mehr erfahren
          </button>
        </div>
      </section>

      <main id="info" className="info-section">
        <h2>Über den Zoo</h2>
        <p>
          Der Zürich Zoo ist nicht nur ein Ort, an dem Tiere bestaunt werden
          können, es ist ein Tor zu den faszinierendsten Lebensräumen unseres
          Planeten. Tauchen Sie ein in die dichten, tropischen Regenwälder,
          hören Sie das Rauschen der Savanne und spüren Sie die eisige Kälte der
          Antarktis. Jedes Gehege erzählt eine eigene Geschichte und lässt Sie
          in die Heimat der Tiere eintauchen.
        </p>
        <p>
          Mit über <strong>400 Tierarten</strong> aus der ganzen Welt setzen wir
          uns aktiv für den Schutz bedrohter Arten und die Erhaltung ihres
          natürlichen Lebensraums ein. Der Masoala-Regenwald ist unser
          Herzstück, ein lebendes Ökosystem, das Sie auf eine unvergessliche
          Reise in die Biodiversität Madagaskars mitnimmt. Lassen Sie sich von
          leuchtenden Chamäleons, kletternden Lemuren und flatternden
          Schmetterlingen verzaubern.
        </p>
        <p>
          Erleben Sie die spannende Verbindung von Bildung und Abenteuer,
          während Sie nicht nur die Schönheit, sondern auch die
          Herausforderungen unserer Tierwelt kennenlernen. Der Zürich Zoo ist
          mehr als ein Ausflugsziel, er ist eine Mission für die Zukunft unseres
          Planeten.
        </p>
        <img src={logo} alt="Zoo Zuerich Logo" width="35%"></img>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Kontakt</h4>
            <p>Zürich Zoo</p>
            <p>Adresse: Zürichbergstrasse 221, 8044 Zürich</p>
            <p>Telefon: +41 44 123 45 67</p>
            <p>Email: info@zoo.ch</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="https://www.zoo.ch" target="_blank" rel="noreferrer">
                  Offizielle Website
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Öffnungszeiten</h4>
            <p>Montag - Sonntag: 09:00 - 18:00</p>
            <p>Feiertage: 10:00 - 16:00</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Zürich Zoo. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default InfoZoo;
