import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TicketInfo = () => {
  const { ticketId } = useParams(); // Hole die ticketId aus der URL
  const [ticketInfo, setTicketInfo] = useState(null);

  useEffect(() => {
    // Hole die Ticketinformationen vom Backend
    axios.get(`http://192.168.43.1:5500/ticket-info/${ticketId}`)  // Deine öffentliche IP-Adresse hier
      .then((response) => {
        setTicketInfo(response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Ticketdaten:", error);
      });
  }, [ticketId]);

  if (!ticketInfo) {
    return <div>Wird geladen...</div>;
  }

  return (
    <div className="ticket-info-container">
      <h2>Ticketdetails für {ticketInfo.firstName} {ticketInfo.lastName}</h2>
      <p><strong>Ticketnummer:</strong> {ticketInfo.uniqueTicketId}</p>
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
