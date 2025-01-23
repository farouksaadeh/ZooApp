import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode"; // QR-Code-Modul importieren
import './Ticket.css';

const Ticket = () => {
  const [cart, setCart] = useState([]);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [qrCodes, setQRCodes] = useState([]); // Array für mehrere QR-Codes
  const [error, setError] = useState(null);

  const ticketPrices = [
    { _id: 1, name: 'Erwachsener (ab 21 Jahren)', onlinePrice: 27 },
    { _id: 2, name: 'Jugendlicher (16-20 Jahre)', onlinePrice: 22 },
    { _id: 3, name: 'Kind (6-15 Jahre)', onlinePrice: 14 },
  ];

  const addToCart = (ticket) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.type === ticket.name
      );

      let updatedCart;
      if (existingItemIndex > -1) {
        updatedCart = prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...prevCart,
          { type: ticket.name, count: 1, price: ticket.onlinePrice },
        ];
      }

      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  const handlePurchase = () => {
    if (cart.length === 0) {
      setError('Bitte wählen Sie mindestens ein Ticket aus.');
    } else {
      setShowEmailForm(true);
      setError(null);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (userEmail && userFirstName && userLastName) {
      try {
        const generatedQRCodes = []; // Array für QR-Code-URLs

        // Für jedes Ticket in der Bestellung QR-Codes generieren
        for (const item of cart) {
          for (let i = 0; i < item.count; i++) {
            const qrData = {
              name: `${userFirstName} ${userLastName}`,
              email: userEmail,
              ticketType: item.type,
              ticketNumber: `${i + 1}/${item.count}`, // Ticketnummer anzeigen
              total: `CHF ${calculateTotal().toFixed(2)}`,
            };

            const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(qrData));
            generatedQRCodes.push({ url: qrCodeUrl, type: item.type }); // QR-Code mit Ticketart speichern
          }
        }

        setQRCodes(generatedQRCodes); // QR-Codes für das Frontend setzen

        // Anfrage an das Backend senden (für die E-Mail)
        await axios.post("http://localhost:5500/send-email", {
          email: userEmail,
          firstName: userFirstName,
          lastName: userLastName,
          tickets: cart,
          total: calculateTotal().toFixed(2),
          qrCodes: generatedQRCodes, // Alle QR-Codes senden
        });

        alert(`Tickets und QR-Codes wurden an ${userEmail} gesendet.`);
        setCart([]); // Warenkorb leeren
        setShowEmailForm(false); // E-Mail-Formular ausblenden
        setError(null);
      } catch (error) {
        console.error("Fehler beim Senden der E-Mail:", error);
        alert("Fehler beim Senden der E-Mail.");
      }
    } else {
      setError('Bitte füllen Sie alle Felder aus.');
    }
  };

  return (
    <div className="ticket-page">
      <div className="ticket-wrapper">
        <div className="ticket-container">
          <h2 className="ticketh2">Nebensaison (November – Februar)</h2>
          <div className="ticket-list">
            {ticketPrices.map((ticket) => (
              <div key={ticket._id} className="ticket-item">
                <div className="ticket-info">
                  <h3>{ticket.name}</h3>
                  <p>Online: CHF {ticket.onlinePrice.toFixed(2)}</p>
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
                  {item.count} x {item.type} - CHF{" "}
                  {(item.price * item.count).toFixed(2)}
                </li>
              ))}
            </ul>
          )}

          <div className="cart-total">
            <h4>Gesamtsumme: CHF {calculateTotal().toFixed(2)}</h4>
          </div>

          <button onClick={handlePurchase} className="add-to-cart-button">
            Kaufen
          </button>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {showEmailForm && (
            <div className="email-form">
              <h3>Bitte geben Sie Ihre Daten ein</h3>
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="text"
                  placeholder="Vorname"
                  value={userFirstName}
                  onChange={(e) => setUserFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Nachname"
                  value={userLastName}
                  onChange={(e) => setUserLastName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="E-Mail-Adresse"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
                <button type="submit">Bestätigen</button>
              </form>
            </div>
          )}

          {qrCodes.length > 0 && (
            <div className="qr-code-container">
              <h3>Ihre QR-Codes</h3>
              <div className="qr-code-row">
                {qrCodes.map((qr, index) => (
                  <div key={index} className="qr-code-item">
                    <img src={qr.url} alt={`QR Code für ${qr.type}`} />
                    <p>{qr.type}</p>
                  </div>
                ))}
              </div>
              <p>Speichern Sie diese QR-Codes für Ihren Ticketzugang.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
