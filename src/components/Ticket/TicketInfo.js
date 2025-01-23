import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TicketInfo = () => {
  const { ticketId } = useParams(); // Extrahiere ticketId aus der URL
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ticketinformationen von der API abrufen
    axios.get(`http://localhost:5500/api/ticket-info/${ticketId}`)
      .then((response) => {
        setTicketData(response.data); // Setze die Ticketdaten
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Ticketinformationen:", error);
        setError("Ticketinformationen konnten nicht geladen werden.");
      });
  }, [ticketId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!ticketData) {
    return <div>Ticketinformationen werden geladen...</div>;
  }

  return (
    <div className="ticket-info-container">
      <h2>Ticketinformationen</h2>
      <p><strong>Inhaber:</strong> {ticketData.firstName} {ticketData.lastName}</p>
      <p><strong>E-Mail:</strong> {ticketData.email}</p>
      <p><strong>Tickets:</strong> {ticketData.tickets.map((t) => `${t.count}x ${t.type}`).join(", ")}</p>
      <p><strong>Gesamtsumme:</strong> CHF {ticketData.total}</p>
      <p><strong>Status:</strong> {ticketData.status || "Gültig"}</p>
    </div>
  );
};

export default TicketInfo;
