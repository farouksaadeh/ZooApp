import React from "react";
import "./tour.css";
import {Link} from "react-router-dom";

function Tour() {
  return (
    <div>
      <div className="header">
        <Link to="/"><button className="back-button">←</button></Link>
        <h1>Zürich Zoo</h1>
        <div className="options-menu">•••</div>
      </div>
      <div className="footer-menu">
        <button className="menu-item">
          <div className="menu-icon guide-icon"></div>
          <span>Guide</span>
        </button>
        <button className="menu-item">
          <div className="menu-icon animals-icon"></div>
          <span>Animals</span>
        </button>
        <Link to="/info"> 
          <button className="menu-item">
          <div className="menu-icon info-icon"></div>
          <span>Info</span>
        </button>
        </Link>
        <button className="menu-item">
          <div className="menu-icon ticket-icon"></div>
          <span>Ticket</span>
        </button>
      </div>
    </div>
  );
}

export default Tour;
