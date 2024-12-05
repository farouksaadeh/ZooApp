import React, { useState } from 'react';
import './Ticket.css'; 

const Ticket = () => {
  // Zustand für die Ticket-Auswahl
  const [selectedTicket, setSelectedTicket] = useState('adult'); // Standard: Erwachsene
  const [ticketCount, setTicketCount] = useState(1); // Standard: 1 Ticket
  const [cart, setCart] = useState([]); // Warenkorb

  // Preise für die verschiedenen Ticket-Arten
  const ticketPrices = {
    adult: 20, // Preis für Erwachsene
    child: 10, // Preis für Kinder
    senior: 15, // Preis für Senioren
  };

  // Funktion zur Aktualisierung der Ticket-Anzahl
  const handleTicketCountChange = (event) => {
    setTicketCount(Number(event.target.value));
  };

  // Funktion zur Auswahl des Ticket-Typs
  const handleTicketTypeChange = (event) => {
    setSelectedTicket(event.target.value);
  };

  // Funktion zum Hinzufügen des Tickets in den Warenkorb
  const addToCart = () => {
    const ticketPrice = ticketPrices[selectedTicket];
    const totalPrice = ticketPrice * ticketCount;

    // Füge das Ticket zum Warenkorb hinzu
    setCart([
      ...cart,
      {
        type: selectedTicket,
        count: ticketCount,
        price: totalPrice,
      },
    ]);
  };

  // Funktion zum Berechnen der Gesamtsumme im Warenkorb
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="ticket-container">
      <h2>Wählen Sie Ihr Ticket</h2>

      <form>
        <div>
          <label htmlFor="ticket-type">Ticket-Typ:</label>
          <select
            id="ticket-type"
            value={selectedTicket}
            onChange={handleTicketTypeChange}
          >
            <option value="adult">Erwachsene - 20€</option>
            <option value="child">Kinder - 10€</option>
            <option value="senior">Senioren - 15€</option>
          </select>
        </div>

        <div>
          <label htmlFor="ticket-count">Anzahl der Tickets:</label>
          <input
            type="number"
            id="ticket-count"
            value={ticketCount}
            onChange={handleTicketCountChange}
            min="1"
            max="10"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={addToCart}
            className="add-to-cart-button"
          >
            In den Warenkorb legen
          </button>
        </div>
      </form>

      <h3>Warenkorb</h3>
      <div>
        {cart.length === 0 ? (
          <p>Ihr Warenkorb ist leer.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.count} x {item.type.charAt(0).toUpperCase() + item.type.slice(1)} - {item.price}€
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h4>Gesamtsumme: {calculateTotal()}€</h4>
      </div>
    </div>
  );
};

export default Ticket;
