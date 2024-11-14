import React from 'react';
import './home.css';

export default function Home() {
  return (
    <section className="hero-section">
      <div className="sidebar">
        <h2>ZÜRİ ZOO</h2>
        <ul>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <h3>EVENTS</h3>
        <ul>
          <li><a href="#maps">Maps</a></li>
          <li><a href="#view-animals">View animals</a></li>
        </ul>
      </div>
      <div className="main-content">
        <h4>Spotted in</h4>
        <h1>Zoo Zürich</h1>
        <p>Explore exotic animals in our futuristic Tour</p>
        <button className="purchase-button">PURCHASE TICKETS</button>
      </div>
    </section>
  );
}
