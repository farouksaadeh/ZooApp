import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Fehler bei der Registrierung!');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Registrieren</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">Vorname</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Vorname eingeben"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Nachname</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Nachname eingeben"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="E-Mail eingeben"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Passwort eingeben"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Registrieren</button>
        </form>
        <p>Haben Sie bereits ein Konto?</p>
        <Link to="/login" className="login-link">Login</Link>
      </div>
    </div>
  );
}
