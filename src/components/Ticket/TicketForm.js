import React, { useState } from 'react';

const TicketForm = ({ setSelectedTickets }) => {
  const [category, setCategory] = useState('Erwachsene');
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState('');

  const handleAddTicket = () => {
    const newTicket = { category, quantity, date };
    setSelectedTickets(prev => [...prev, newTicket]);
  };

  return (
    <div className="ticket-form">
      <label>
        Kategorie:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Erwachsene">Erwachsene (ab 21 Jahren)</option>
          <option value="Jugendliche">Jugendliche (16–20 Jahre)</option>
          <option value="Kinder">Kinder (6–15 Jahre)</option>
        </select>
      </label>
      <label>
        Anzahl:
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <label>
        Besuchsdatum:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <button onClick={handleAddTicket}>Ticket hinzufügen</button>
    </div>
  );
};

export default TicketForm;
