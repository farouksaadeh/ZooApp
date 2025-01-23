import React, { useState, useEffect } from "react";
import './Ticket.css';

const Ticket = () => {
  const [ticketCount, setTicketCount] = useState(1);
  const [cart, setCart] = useState([]);

  const ticketPrices = [
    { _id: 1, name: 'Erwachsene (ab 21 Jahren)', onlinePrice: 27, kioskPrice: 28 },
    { _id: 2, name: 'Jugendliche (16-20 Jahre)', onlinePrice: 22, kioskPrice: 23 },
    { _id: 3, name: 'Kinder (6-15 Jahre)', onlinePrice: 14, kioskPrice: 15 },
  ];

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (ticket) => {
    const existingItemIndex = cart.findIndex((item) => item.type === ticket.name);

    if (existingItemIndex > -1) {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].count += 1;
        return updatedCart;
      });
    } else {
      setCart((prevCart) => [
        ...prevCart,
        { type: ticket.name, count: 1, price: ticket.onlinePrice },
      ]);
    }
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <div className="ticket-container">
      <h2 class="ticketh2">Nebensaison (November – Februar)</h2>
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
              <button
                className="remove-button"
                onClick={() => removeFromCart(index)}
              >
                Entfernen
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total">
        <h4>Gesamtsumme: CHF {calculateTotal().toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default Ticket;
