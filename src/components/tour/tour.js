import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./tour.css";

function Tour() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  // Koordinaten und Beschreibungen für die Map
  const zooPosition = [47.3855, 8.5736]; // Zürich Zoo Koordinaten
  const otherPoints = [
    { position: [47.3845, 8.5756], description: "Elefantenhaus", type: "animals" },
    { position: [47.3865, 8.5726], description: "Löwengehege", type: "animals" },
    { position: [47.3875, 8.5746], description: "Pinguinanlage", type: "animals" },
    { position: [47.3850, 8.5730], description: "Restaurant", type: "food" },
    { position: [47.3860, 8.5735], description: "Shop", type: "shop" },
  ];

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <Link to="/tourHome">
          <button className="back-button">←</button>
        </Link>
        <h1>Zürich Zoo</h1>
        <div className="options-menu">•••</div>
      </div>

      {/* Filter Section */}
      <div className={`filter-section ${isFilterExpanded ? "expanded" : "collapsed"}`}>
        <div className="filter-header" onClick={toggleFilter}>
          <p>Filter</p>
          <button className="toggle-button">{isFilterExpanded ? "▲" : "▼"}</button>
        </div>
        {isFilterExpanded && (
          <div className="filter-buttons">
            <button
              className={`filter-button ${selectedFilter === "attraction" ? "active" : ""}`}
              onClick={() => handleFilterClick("attraction")}
            >
              Attraction
            </button>
            <button
              className={`filter-button ${selectedFilter === "toilet" ? "active" : ""}`}
              onClick={() => handleFilterClick("toilet")}
            >
              Toilet
            </button>
            <button
              className={`filter-button ${selectedFilter === "shop" ? "active" : ""}`}
              onClick={() => handleFilterClick("shop")}
            >
              Shop
            </button>
            <button
              className={`filter-button ${selectedFilter === "park" ? "active" : ""}`}
              onClick={() => handleFilterClick("park")}
            >
              Park
            </button>
            <button
              className={`filter-button ${selectedFilter === "food" ? "active" : ""}`}
              onClick={() => handleFilterClick("food")}
            >
              Food
            </button>
            <button
              className={`filter-button ${selectedFilter === "animals" ? "active" : ""}`}
              onClick={() => handleFilterClick("animals")}
            >
              Animals
            </button>
            <button
              className={`filter-button ${selectedFilter === "service_point" ? "active" : ""}`}
              onClick={() => handleFilterClick("service_point")}
            >
              Service Point
            </button>
          </div>
        )}
      </div>

      {/* Map Section */}
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

          {/* Zusätzliche Marker basierend auf Filter */}
          {otherPoints
            .filter((point) => selectedFilter === "" || point.type === selectedFilter)
            .map((point, index) => (
              <Marker key={index} position={point.position}>
                <Popup>{point.description}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Tour;
