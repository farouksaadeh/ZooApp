const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fabio.fr.russo@gmail.com", 
    pass: "slqr qbwl frhj pujo", 
  },
});


app.post("/send-email", async (req, res) => {
  const { email, firstName, lastName, tickets, total } = req.body;

  try {

    const qrCodeFilePath = path.join(__dirname, "qrcode.png");
    await QRCode.toFile(qrCodeFilePath, `http://localhost:5500/ticket-info/${Date.now()}`);

    // E-Mail-Inhalt anpassen
    const mailOptions = {
      from: "fabio.fr.russo@gmail.com",
      to: email,
      subject: "Ihre Ticketbestellung",
      html: `
        <h1>Vielen Dank für Ihre Bestellung, ${firstName} ${lastName}!</h1>
        <p>Hier sind Ihre Tickets:</p>
        ${tickets
          .map(
            (ticket) => `
          <div>
            <p><strong>Ticket:</strong> ${ticket.type}</p>
            <p><strong>Anzahl:</strong> ${ticket.count}</p>
            <p><strong>Preis:</strong> CHF ${(ticket.price * ticket.count).toFixed(2)}</p>
          </div>
        `
          )
          .join("")}
        <p><strong>Gesamtsumme:</strong> CHF ${total}</p>
      `,
      attachments: [
        {
          filename: "qrcode.png",
          path: qrCodeFilePath, // Füge den QR-Code als PNG hinzu
          cid: "qrcode", // Wird in HTML referenziert
        },
      ],
    };

    // E-Mail senden
    await transporter.sendMail(mailOptions);

    // Entferne die temporäre QR-Code-Datei
    fs.unlinkSync(qrCodeFilePath);

    res.status(200).send("E-Mail erfolgreich gesendet.");
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    res.status(500).send("Fehler beim Senden der E-Mail.");
  }
});

// Route für die Ticketinformationen
app.get("/ticket-info/:ticketId", (req, res) => {
  const { ticketId } = req.params;

  // Hier könntest du die Ticketdetails aus einer echten Datenbank abfragen
  const ticket = { ticketId, type: "Standard Ticket", price: 14 };

  res.json(ticket);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
