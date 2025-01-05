import React, { useState } from 'react';
import TicketForm from './TicketForm';
import TicketSummary from './TicketSummary';
import TicketInfo from './TicketInfo';

const TicketPage = () => {
  const [selectedTickets, setSelectedTickets] = useState([]);

  return (
    <div className="ticket-page">
      <h1>Tickets kaufen</h1>
      <TicketForm setSelectedTickets={setSelectedTickets} />
      <TicketSummary selectedTickets={selectedTickets} />
      <TicketInfo />
    </div>
  );
};

export default TicketPage;
