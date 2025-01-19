// TicketInfo.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketInfo = () => {
  const { ticketId } = useParams(); // Holt die ticketId aus der URL
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    // API-Anfrage an das Backend, um die Ticketdaten zu holen
    axios.get(`http://localhost:5500/api/ticket-info/${ticketId}`)
      .then((response) => {
        setTicketInfo(response.data); // Speichert die Ticketdaten im State
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Ticketdaten:", error);
      });
  }, [ticketId]); // Lädt die Daten bei Änderung der ticketId

  if (!ticketInfo) {
    return <div>Lädt...</div>; // Zeige Ladeanzeige an
  }

  return (
    <div className="ticket-info-container">
      <h2>Vielen Dank für Ihren Besuch im Zoo!</h2>
      <p>Ticketinhaber: {ticketInfo.firstName} {ticketInfo.lastName}</p>
      <p>Bestellübersicht:</p>
      <ul>
        {ticketInfo.tickets.map((ticket, index) => (
          <li key={index}>
            {ticket.count} x {ticket.type} - CHF {(ticket.count * ticket.price).toFixed(2)}
          </li>
        ))}
      </ul>
      <p><strong>Gesamtsumme: CHF {ticketInfo.total.toFixed(2)}</strong></p>
    </div>
  );
};

export default TicketInfo;
