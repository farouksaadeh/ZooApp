import React from "react";
import "./tourHome.css";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


function TourHome() {
  const zooPosition = [47.3855, 8.5736]; // Zürich Zoo Koordinaten
  const otherPoints = [
    { position: [47.3845, 8.5756], description: "Elefantenhaus"},
    { position: [47.3865, 8.5726], description: "Löwengehege"},
    { position: [47.3875, 8.5746], description: "Pinguinanlage"},
  ];

  return (
    <div className="tour-home">
      <div className="header">
        <Link to="/">
          <button className="back-button">←</button>
        </Link>
        <h1>Zürich Zoo</h1>
        <div className="options-menu">•••</div>
      </div>

      <div className="map-container">
        <MapContainer center={zooPosition} zoom={15} className="map-view" scrollWheelZoom={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Hauptmarker für den Zoo */}
          <Marker position={zooPosition}>
            <Popup>Zürich Zoo - Willkommen!</Popup>
          </Marker>

          {/* Zusätzliche Marker */}
          {otherPoints.map((point, index) => (
            <Marker key={index} position={point.position} icon={point.icon}>
              <Popup>{point.description}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="footer-menu">
        <Link to="/tour">
          <button className="menu-item">
            <div className="menu-icon guide-icon"></div>
            <span>Guide</span>
          </button>
        </Link>
        <Link to="/tour">
          <button className="menu-item">
            <div className="menu-icon animals-icon"></div>
            <span>Animals</span>
          </button>
        </Link>
        <Link to="/info">
          <button className="menu-item">
            <div className="menu-icon info-icon"></div>
            <span>Info</span>
          </button>
        </Link>
        <Link to="/ticket">
          <button className="menu-item">
            <div className="menu-icon ticket-icon"></div>
            <span>Ticket</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TourHome;
