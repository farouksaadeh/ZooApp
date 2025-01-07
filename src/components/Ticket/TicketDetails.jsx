import React from "react";
import "./TicketDetails.css"; // CSS-Datei importieren

const TicketDetail = ({ ticket }) => {
  if (!ticket) {
    return <p>Bitte wählen Sie ein Ticket aus, um Details anzuzeigen.</p>;
  }

  return (
    <div className="ticket-detail-container">
      <h2>Ticket Details</h2>
      <p><strong>Typ:</strong> {ticket.type}</p>
      <p><strong>Anzahl:</strong> {ticket.count}</p>
      <p><strong>Preis:</strong> {ticket.price}€</p>
    </div>
  );
};

export default TicketDetail;
