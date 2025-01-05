import React from "react";
import "./TicketOverview.css"; // CSS-Datei importieren

const TicketOverview = ({ cart }) => {
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="ticket-overview-container">
      <h2>Warenkorb Übersicht</h2>
      {cart.length === 0 ? (
        <p>Ihr Warenkorb ist leer.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.count} x {item.type} - {item.price}€
              </li>
            ))}
          </ul>
          <h4>Gesamtsumme: {calculateTotal()}€</h4>
        </div>
      )}
    </div>
  );
};

export default TicketOverview;
