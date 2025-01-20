import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TicketInfo = () => {
  const { ticketId } = useParams(); // Hole die ticketId aus der URL
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    // Hole die Ticketinformationen vom Backend
    axios.get(`http://localhost:5500/ticket-info/${ticketId}`)
      .then(response => {
        setTicketInfo(response.data);
      })
      .catch(error => {
        console.error("Fehler beim Laden der Ticketdaten:", error);
      });
  }, [ticketId]);

  if (!ticketInfo) {
    return <div>Wird geladen...</div>;
  }

  return (
    <div className="ticket-info-container">
      <h2>Vielen Dank, dass Sie den Zoo besucht haben!</h2>
      <p>Ticketinhaber: {ticketInfo.firstName} {ticketInfo.lastName}</p>
      <p>Bestellübersicht:</p>
      <ul>
        {ticketInfo.tickets.map((ticket, index) => (
          <li key={index}>{ticket.count} x {ticket.type} - CHF {(ticket.count * ticket.price).toFixed(2)}</li>
        ))}
      </ul>
      <p><strong>Gesamtsumme: CHF {ticketInfo.total}</strong></p>
    </div>
  );
};

export default TicketInfo;
