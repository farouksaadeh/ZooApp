import React from "react";
import "./tourHome.css";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix für Leaflet-Standard-Icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function TourHome() {
  const zooPosition = [47.3843, 8.5743]; // Zürich Zoo Koordinaten

  return (
    <div>
      <div className="header">
        <Link to="/">
          <button className="back-button">←</button>
        </Link>
        <h1>Zürich Zoo</h1>
        <div className="options-menu">•••</div>
      </div>

      <div className="map-container">
        <MapContainer
          center={zooPosition}
          zoom={16}
          className="map-view"
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={zooPosition}>
            <Popup>Zürich Zoo - Willkommen!</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="footer-menu">
        <Link to="/tour">
          <button className="menu-item">
            <div className="menu-icon guide-icon">
              <img src="./icons/shop-icon.png" alt="guide" />
            </div>
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
