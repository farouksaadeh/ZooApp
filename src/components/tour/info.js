import React from "react";
import "./tour.css";
import "./info.css";
import { Link } from "react-router-dom";

function InfoZoo() {
  return (
    <div>
      <div className="header">
        <Link to="/tour">
          <button className="back-button">←</button>
        </Link>
        <h1>Zürich Zoo</h1>
        <div className="options-menu">•••</div>
      </div>
      {/* Hero Section */}
      <section className="hero-full">
        <div className="hero-overlay">
          <h1>Willkommen im Zürich Zoo</h1>
          <p>
            Erlebe Wildtiere hautnah und lerne über ihren Schutz und ihre
            Lebensräume.
          </p>
          <Link to="#info">
            <button className="scroll-down-button">⬇ Mehr erfahren</button>
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <main id="info" className="info-section">
        <h2>Über den Zoo</h2>
        <p>
          Ein Zoo stellt einen Ort dar, an dem Besucherinnen und Besucher
          Wildtiere aus nächster Nähe erleben und gleichzeitig etwas über
          Tierschutz und Artenvielfalt lernen können. Moderne Zoos bieten eine
          Vielzahl an sicheren und bereichernden Lebensräumen für Tiere aus
          aller Welt, von hoch aufragenden Giraffen bis hin zu bunten Papageien.
          Einige Zoos fokussieren sich auf den Schutz und die Aufklärung von
          Tieren und beteiligen sich an globalen Zuchtprogrammen zum Erhalt
          bedrohter Arten. Durch interaktive Ausstellungen, Tierbegegnungen und
          Bildungsprogramme werden Zoos zu einem unterhaltsamen und sinnvollen
          Ausflugsziel für Menschen aller Altersgruppen.
        </p>
      </main>
    </div>
  );
}

export default InfoZoo;
