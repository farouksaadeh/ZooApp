import React, { useState } from "react";
import axios from "axios";
import './Ticket.css';

const Ticket = () => {
  const [cart, setCart] = useState([]);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const ticketPrices = [
    { _id: 1, name: 'Erwachsene (ab 21 Jahren)', onlinePrice: 27, kioskPrice: 28 },
    { _id: 2, name: 'Jugendliche (16-20 Jahre)', onlinePrice: 22, kioskPrice: 23 },
    { _id: 3, name: 'Kinder (6-15 Jahre)', onlinePrice: 14, kioskPrice: 15 },
  ];

  // Ticket zum Warenkorb hinzufügen
  const addToCart = (ticket) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.type === ticket.name
      );

      let updatedCart;
      if (existingItemIndex > -1) {
        updatedCart = prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...prevCart,
          { type: ticket.name, count: 1, price: ticket.onlinePrice },
        ];
      }

      return updatedCart;
    });
  };

  // Gesamtsumme berechnen
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  // Kauf abschließen, zeige E-Mail-Formular an
  const handlePurchase = () => {
    setShowEmailForm(true); // Zeigt das E-Mail Formular an
  };

  // E-Mail-Adresse speichern und an Backend senden
  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (userEmail) {
      // E-Mail an Backend senden
      axios.post("http://localhost:5500/send-email", {
        email: userEmail,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(`Tickets werden an ${userEmail} gesendet.`);
          setCart([]); // Leere den Warenkorb
          setShowConfirmation(true); // Bestätigung anzeigen
          setShowEmailForm(false); // E-Mail-Formular ausblenden
        }
      })
      .catch((error) => {
        console.error("Fehler beim Senden der E-Mail:", error);
        alert("Fehler beim Senden der E-Mail.");
      });
    } else {
      alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
    }
  };

  return (
    <div className="ticket-container">
      <h2>Nebensaison (November – Februar)</h2>
      <div className="ticket-list">
        {ticketPrices.map((ticket) => (
          <div key={ticket._id} className="ticket-item">
            <div className="ticket-info">
              <h3>{ticket.name}</h3>
              <p>
                Online: CHF {ticket.onlinePrice.toFixed(2)} /
                Kasse: CHF {ticket.kioskPrice.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => addToCart(ticket)}
              className="add-to-cart-button"
            >
              Ticket kaufen
            </button>
          </div>
        ))}
      </div>

      <h3>Warenkorb</h3>
      {cart.length === 0 ? (
        <p>Ihr Warenkorb ist leer.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              {item.count} x {item.type} - CHF {(item.price * item.count).toFixed(2)}
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total">
        <h4>Gesamtsumme: CHF {calculateTotal().toFixed(2)}</h4>
      </div>

      <button onClick={handlePurchase} className="add-to-cart-button">
        Kaufen
      </button>

      {showEmailForm && (
        <div className="email-form">
          <h3>Bitte geben Sie Ihre E-Mail-Adresse ein</h3>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="E-Mail-Adresse"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <button type="submit">Bestätigen</button>
          </form>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-message">
          <h4>Vielen Dank! Deine Tickets werden an die angegebene E-Mail-Adresse gesendet.</h4>
        </div>
      )}
    </div>
  );
};

export default Ticket;
