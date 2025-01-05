import React from "react";
import "./tourHome.css";
import {Link} from "react-router-dom";

function TourHome() {
  return (
    <div>
      <div className="header">
        <Link to="/"><button className="back-button">←</button></Link>
        <h1>Zürich Zoo</h1>
        <div className="options-menu">•••</div>
      </div>

      <div className="map-container">
        <div className="map-view">
          <p>Map goes here</p>
        </div>
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
