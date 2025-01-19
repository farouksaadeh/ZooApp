const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const port = 5500;

app.use(cors());
app.use(bodyParser.json());

// Dummy-Ticket-Daten (normalerweise würdest du hier eine Datenbank verwenden)
const tickets = [
  {
    ticketId: '12345',
    firstName: 'Fabio',
    lastName: 'Russo',
    tickets: [
      { type: 'Erwachsener', count: 2, price: 27 },
      { type: 'Kind', count: 1, price: 14 },
    ],
    total: 68,
  },
  // Weitere Tickets hier ...
];

// Nodemailer transporter konfigurieren (hier für Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fabio.fr.russo@gmail.com', // Deine Gmail-Adresse
    pass: 'slqr qbwl frhj pujo', // Dein App-Passwort
  },
});

// API-Endpunkt, um Ticketinformationen zu holen
app.get('/api/ticket-info/:ticketId', (req, res) => {
  const { ticketId } = req.params;

  const ticketInfo = tickets.find(ticket => ticket.ticketId === ticketId);

  if (!ticketInfo) {
    return res.status(404).send("Ticket nicht gefunden.");
  }

  res.json(ticketInfo); // Ticketdaten als JSON zurückgeben
});

// Route zum Versenden der E-Mail
app.post('/send-email', (req, res) => {
  const { email, firstName, lastName, tickets, total, ticketId } = req.body;

  // Erstelle den QR-Code mit der URL zur Ticket-Info-Seite
  const ticketInfoUrl = `http://localhost:3000/ticket-info/${ticketId}`; // URL zum Frontend-Ticketinfo
  QRCode.toDataURL(ticketInfoUrl, (err, qrCodeUrl) => {
    if (err) return res.status(500).send("Fehler bei der QR-Code-Erstellung");

    // Mail-Optionen
    const mailOptions = {
      from: 'fabio.fr.russo@gmail.com',
      to: email,
      subject: 'Ticketbestellung Bestätigung',
      html: `
        <h2>Vielen Dank für Ihre Bestellung, ${firstName} ${lastName}!</h2>
        <p>Hier sind die Details Ihrer Bestellung:</p>
        <ul>
          ${tickets.map(ticket => `<li>${ticket.count} x ${ticket.type} - CHF ${(ticket.count * ticket.price).toFixed(2)}</li>`).join('')}
        </ul>
        <p><strong>Gesamtsumme: CHF ${total}</strong></p>
        <p>QR-Code für Ihr Ticket:</p>
        <img src="${qrCodeUrl}" alt="QR-Code" />
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send("Fehler beim Senden der E-Mail.");
      } else {
        return res.status(200).send("E-Mail erfolgreich gesendet.");
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
