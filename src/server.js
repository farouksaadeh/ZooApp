const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // CORS-Modul für Cross-Origin-Anfragen

const app = express();
const PORT = 5000;

// Pfad zur JSON-Datei, die Benutzerdaten speichert
const usersFile = path.join(__dirname, 'users.json');

// Middleware
app.use(cors()); // Erlaubt Anfragen von anderen Domains (z.B. React-Frontend)
app.use(bodyParser.json()); // Verarbeitet JSON-Daten in den Anfragen

// Helper-Funktion: Benutzer aus JSON-Datei lesen
const readUsers = () => {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([])); // Erstellt die Datei, falls nicht vorhanden
  }
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
};

// Helper-Funktion: Benutzer in JSON-Datei schreiben
const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// API-Route: Registrierung
app.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validierung
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Alle Felder sind erforderlich!' });
  }

  const users = readUsers();
  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: 'E-Mail ist bereits registriert!' });
  }

  // Neuen Benutzer hinzufügen
  users.push({ firstName, lastName, email, password });
  writeUsers(users);

  res.status(201).json({ message: 'Registrierung erfolgreich!' });
});

// API-Route: Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validierung
  if (!email || !password) {
    return res.status(400).json({ message: 'E-Mail und Passwort erforderlich!' });
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Ungültige Anmeldedaten!' });
  }

  res.status(200).json({ message: `Willkommen, ${user.firstName} ${user.lastName}!` });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
