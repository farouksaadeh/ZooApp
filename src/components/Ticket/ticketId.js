const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");

const app = express();
const port = 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock-Datenbank (Ersetze dies durch eine echte Datenbank)
const ticketsDB = [];

// Nodemailer transporter konfigurieren
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "deine-email@gmail.com", // Deine Gmail-Adresse
    pass: "dein-app-passwort", // App-Passwort
  },
});

// Route zum Senden der E-Mail mit QR-Code
app.post("/send-email", async (req, res) => {
  const { email, firstName, lastName, tickets, total } = req.body;

  try {
    // Generiere QR-Codes für jedes Ticket
    const qrCodes = await Promise.all(
      tickets.map(async (ticket) => {
        const uniqueTicketId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const qrCodeUrl = await QRCode.toDataURL(`http://localhost:3000/ticket-info/${uniqueTicketId}`);

        // Speichere das Ticket in der "Datenbank"
        ticketsDB.push({
          uniqueTicketId,
          firstName,
          lastName,
          ...ticket,
        });

        return { ...ticket, uniqueTicketId, qrCodeUrl };
      })
    );

    // E-Mail-Inhalt
    const mailOptions = {
      from: "deine-email@gmail.com",
      to: email,
      subject: "Ihre Ticketbestellung",
      html: `
        <h1>Vielen Dank für Ihre Bestellung, ${firstName} ${lastName}!</h1>
        <p>Hier sind Ihre Tickets:</p>
        ${qrCodes
          .map(
            (ticket) => `
          <div>
            <p><strong>Ticket:</strong> ${ticket.type}</p>
            <p><strong>Anzahl:</strong> ${ticket.count}</p>
            <p><strong>Preis:</strong> CHF ${(ticket.price * ticket.count).toFixed(2)}</p>
            <img src="${ticket.qrCodeUrl}" alt="QR Code" />
          </div>
        `
          )
          .join("")}
        <p><strong>Gesamtsumme:</strong> CHF ${total}</p>
      `,
    };

    // E-Mail senden
    await transporter.sendMail(mailOptions);

    res.status(200).send("E-Mail erfolgreich gesendet.");
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    res.status(500).send("Fehler beim Senden der E-Mail.");
  }
});

// Route für die Ticketinformationen
app.get("/ticket-info/:ticketId", (req, res) => {
  const { ticketId } = req.params;

  // Suche das Ticket in der "Datenbank"
  const ticket = ticketsDB.find((t) => t.uniqueTicketId === ticketId);

  if (!ticket) {
    return res.status(404).send("Ticket nicht gefunden.");
  }

  res.json(ticket);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
