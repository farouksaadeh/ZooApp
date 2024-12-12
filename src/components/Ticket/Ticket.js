import React, { useState } from 'react';
import './Ticket.css'; 

const Ticket = () => {
  // Zustand für die Ticket-Auswahl
  const [selectedTicket, setSelectedTicket] = useState(1); // Standard: Erwachsene (ID 1)
  const [ticketCount, setTicketCount] = useState(1); // Standard: 1 Ticket
  const [cart, setCart] = useState([]); // Warenkorb

  // Preise für die verschiedenen Ticket-Arten
  const ticketPrices = [
    {
      _id: 1,
      name: "Kind",
      preis: 10,
    },
    {
      _id: 2,
      name: "Jugendlicher",
      preis: 15,
    },
    {
      _id: 3,
      name: "Erwachsener",
      preis: 20,
    },
  ];

  // Funktion zur Aktualisierung der Ticket-Anzahl
  const handleTicketCountChange = (event) => {
    setTicketCount(Number(event.target.value));
  };

  // Funktion zur Auswahl des Ticket-Typs
  const handleTicketTypeChange = (event) => {
    setSelectedTicket(Number(event.target.value));
  };

  // Funktion zum Hinzufügen des Tickets in den Warenkorb
  const addToCart = () => {
    const selectedTicketInfo = ticketPrices.find(ticket => ticket._id === selectedTicket);
    if (selectedTicketInfo) {
      const existingItemIndex = cart.findIndex(item => item.type === selectedTicketInfo.name);
      
      if (existingItemIndex > -1) {
        // Wenn das Ticket bereits im Warenkorb ist, aktualisiere die Anzahl und den Preis
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].count += ticketCount;
        updatedCart[existingItemIndex].price += selectedTicketInfo.preis * ticketCount;
        setCart(updatedCart);
      } else {
        // Neues Ticket in den Warenkorb hinzufügen
        setCart([
          ...cart,
          {
            type: selectedTicketInfo.name,
            count: ticketCount,
            price: selectedTicketInfo.preis * ticketCount,
          },
        ]);
      }
    }
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
            {ticketPrices.map((ticket) => (
              <option key={ticket._id} value={ticket._id}>
                {ticket.name} - {ticket.preis}€
              </option>
            ))}
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
                {item.count} x {item.type} - {item.price}€
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
