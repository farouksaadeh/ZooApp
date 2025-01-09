import React, { useState, useEffect } from "react";
import './Ticket.css';

const Ticket = () => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const ticketPrices = [
    { _id: 1, name: 'Erwachsene (ab 21 Jahren)', onlinePrice: 27, kioskPrice: 28 },
    { _id: 2, name: 'Jugendliche (16-20 Jahre)', onlinePrice: 22, kioskPrice: 23 },
    { _id: 3, name: 'Kinder (6-15 Jahre)', onlinePrice: 14, kioskPrice: 15 },
  ];

  // Lade den Warenkorb aus dem LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Speichere den Warenkorb im LocalStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Ticket zum Warenkorb hinzufügen
  const addToCart = (ticket) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.type === ticket.name
      );

      let updatedCart;
      if (existingItemIndex > -1) {
        // Wenn das Ticket bereits im Warenkorb ist, wird die Anzahl erhöht
        updatedCart = prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        // Wenn das Ticket noch nicht im Warenkorb ist, wird es hinzugefügt
        updatedCart = [
          ...prevCart,
          { type: ticket.name, count: 1, price: ticket.onlinePrice },
        ];
      }

      return updatedCart;
    });
  };

  // Anzahl der Tickets im Warenkorb aktualisieren
  const updateTicketCount = (index, delta) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item, idx) =>
        idx === index
          ? {
              ...item,
              count: Math.max(item.count + delta, 0), // Stellen sicher, dass die Anzahl nicht negativ wird
            }
          : item
      );
      // Entferne das Ticket, wenn die Anzahl auf 0 reduziert wurde
      return updatedCart.filter((item) => item.count > 0);
    });
  };

  // Gesamtsumme berechnen
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  // Handle den Kauf
  const handlePurchase = () => {
    setShowModal(true);
    setCart([]); // Warenkorb leeren
    localStorage.removeItem("cart"); // Leere auch den LocalStorage
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
              <div>
                <button onClick={() => updateTicketCount(index, -1)}>-</button>
                <button onClick={() => updateTicketCount(index, 1)}>+</button>
              </div>
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

      {showModal && (
        <div className="modal">
          <p>Danke für Ihren Einkauf!</p>
          <button onClick={() => setShowModal(false)}>Schließen</button>
        </div>
      )}
    </div>
  );
};

export default Ticket;
