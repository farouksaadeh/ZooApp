const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());

const cors = require("cors"); // CORS importieren
app.use(cors({ origin: "http://localhost:3000" })); // CORS aktivieren


app.post("/send-email", async (req, res) => {
  const { email, firstName, lastName, tickets, total, qrCode } = req.body;

  

  try {
    // Nodemailer-Transport konfigurieren
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "fabio.fr.russo@gmail.com", // Ersetze mit deiner E-Mail
        pass: "slqr qbwl frhj pujo", // Ersetze mit deinem Passwort
      },
    });

    // E-Mail-HTML-Inhalt mit eingebettetem QR-Code
    const mailOptions = {
      from: "fabio.fr.russo@gmail.com",
      to: email,
      subject: "Deine Tickets",
      html: `
        <h3>Hallo ${firstName} ${lastName},</h3>
        <p>Vielen Dank für Ihren Kauf. Hier sind Ihre Ticketdetails:</p>
        <ul>
          ${tickets
            .map((ticket) => `<li>${ticket.count} x ${ticket.type}</li>`)
            .join("")}
        </ul>
        <p>Gesamtsumme: CHF ${total}</p>
        <p>Ihr QR-Code:</p>
        <img src="${qrCode}" alt="QR Code" />
        <p>Vielen Dank!</p>
      `,
    };

    // E-Mail senden
    await transporter.sendMail(mailOptions);
    res.status(200).send("E-Mail gesendet.");
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail:", error);
    res.status(500).send("Fehler beim Senden der E-Mail.");
  }
});

app.listen(5500, () => {
  console.log("Server läuft auf Port 5500");
});
