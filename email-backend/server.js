const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter konfigurieren (hier für Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fabio.fr.russo@gmail.com", // Deine Gmail-Adresse
    pass: "nbsi wjnm iren acrg", // Dein App-Passwort
  },
});

// Route zum Versenden der E-Mail
app.post("/send-email", (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: "fabio.fr.russo@gmail.com", // Deine Gmail-Adresse
    to: email, // Die E-Mail-Adresse des Nutzers
    subject: "Ticketbestellung Bestätigung",
    text: "Test: Vielen Dank für deine Ticketbestellung!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Fehler beim Senden der E-Mail.");
    } else {
      return res.status(200).send("E-Mail erfolgreich gesendet.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
