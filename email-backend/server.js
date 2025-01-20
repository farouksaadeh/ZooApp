const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors"); // Importiere CORS
const app = express();

app.use(cors());  // CORS für alle Routen aktivieren
app.use(express.json());

app.use(express.json());

// Transporter für E-Mail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fabio.fr.russo@gmail.com", // Dein Benutzername
    pass: "slqr qbwl frhj pujo", // Dein tatsächliches Passwort hier (oder App-Passwort)
  },
});

// Vorab definierte QR-Codes für Ticketarten (der vollständige Pfad zu den Bildern)
const qrCodes = {
  "1_Erwachsener": "frame.png",  // Bild im selben Verzeichnis wie server.js
  "1_Erwachsener_1_Kind": "1_Erwachsener_1_Kind.png",
  "2_Kinder": "2_Kinder.png",
  "3_Erwachsene": "3_Erwachsene.png",
  "2_Erwachsene": "2_Erwachsene.png",
  // Weitere QR-Codes können hier hinzugefügt werden
};

// Route zum Versenden der E-Mail
app.post("/send-email", async (req, res) => {
  const { email, firstName, lastName, tickets, total } = req.body;

  // Auswahl des passenden QR-Codes
  let selectedQRCodes = [];

  // Prüfe, welche Tickets ausgewählt wurden und finde den passenden QR-Code
  tickets.forEach((ticket) => {
    // Hier wird der QR-Code basierend auf dem Ticket-Typ ausgewählt
    const ticketKey = `${ticket.count}_${ticket.type.replace(" ", "_")}`;
    if (qrCodes[ticketKey]) {
      selectedQRCodes.push(qrCodes[ticketKey]);
    }
  });

  try {
    // E-Mail-Inhalt (Ohne das Bild inline anzuzeigen)
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
            <p><strong>Ticket:</strong> ${ticket.count} x ${ticket.type}</p>
            <p><strong>Anzahl:</strong> ${ticket.count}</p>
            <p><strong>Preis:</strong> CHF ${ticket.price}</p>
          </div>`
          )
          .join("")}
        <p><strong>Gesamtsumme:</strong> CHF ${total}</p>
        <p>Der QR-Code mit Ihren Details ist als Anhang enthalten.</p>
      `,
      attachments: selectedQRCodes.map((qrCodeFileName, index) => ({
        filename: `ticket_${index + 1}.png`, // Benennt die Anhänge (ticket_1.png, ticket_2.png, ...)
        path: path.join(__dirname, qrCodeFileName),  // Bild direkt im gleichen Verzeichnis wie server.js
      })),
    };

    // E-Mail senden
    await transporter.sendMail(mailOptions);

    res.status(200).send("E-Mail erfolgreich gesendet.");
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    res.status(500).send("Fehler beim Senden der E-Mail.");
  }
});

// Server starten
const port = 5500;
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
