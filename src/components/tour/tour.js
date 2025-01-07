import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./tour.css";

function Tour() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

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

      <div className="map-container">
        <div className="map-view">
          <p>Map goes here</p>
        </div>
      </div>
    </div>
  );
}

export default Tour;
