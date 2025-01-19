import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import otherPoints from "./otherpoints.js";
import "./tour.css";

function Tour() {
  const [selectedFilter, setSelectedFilter] = useState(true);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  const zooPosition = [47.3843, 8.5743]; // Zürich Zoo Coordinates

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  const handleGoClick = (destination) => {
    const [destLat, destLng] = destination;
    const [zooLat, zooLng] = zooPosition;
    const routeUrl = `https://www.google.com/maps/dir/${zooLat},${zooLng}/${destLat},${destLng}`;
    window.open(routeUrl, "_blank");
  };

  return (
    <div>
      <div className="header">
        <Link to="/tourHome">
          <button className="back-button">←</button>
        </Link>
        <h1>Zürich Zoo</h1>
        <div className="options-menu">•••</div>
      </div>

      <div
        className={`filter-section ${
          isFilterExpanded ? "expanded" : "collapsed"
        }`}
      >
        <div className="filter-header" onClick={toggleFilter}>
          <p>Filter</p>
          <button className="toggle-button">
            {isFilterExpanded ? "▲" : "▼"}
          </button>
        </div>
        {isFilterExpanded && (
          <div className="filter-buttons">
            <button
              className={`filter-button ${
                selectedFilter === "animals" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("animals")}
            >
              Animals
            </button>
            <button
              className={`filter-button ${
                selectedFilter === "toilet" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("toilet")}
            >
              Toilet
            </button>
            <button
              className={`filter-button ${
                selectedFilter === "shop" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("shop")}
            >
              Shop
            </button>
            <button
              className={`filter-button ${
                selectedFilter === "food" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("food")}
            >
              Food
            </button>
            <button
              className={`filter-button ${
                selectedFilter === "park" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("park")}
            >
              Park
            </button>
            <button
              className={`filter-button ${
                selectedFilter === "service_point" ? "active" : ""
              }`}
              onClick={() => handleFilterClick("service_point")}
            >
              Service Point
            </button>
          </div>
        )}
      </div>

      <div className="map-container">
        <MapContainer
          center={zooPosition}
          zoom={16.4}
          className="map-view"
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {otherPoints
            .filter(
              (point) =>
                selectedFilter === false || point.type === selectedFilter
            )
            .map((point, index) => (
              <Marker key={index} position={point.position} icon={point.icon}>
                <Popup>
                  <div className="popup-content">
                    <h3>{point.description}</h3>
                    <p>Distance: {point.distance}</p>
                    <div className="popup-actions">
                      <button
                        className="popup-button"
                        onClick={() => handleGoClick(point.position)}
                      >
                        Go
                      </button>
                      <button className="popup-button">See Details</button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Tour;
