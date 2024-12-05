import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" placeholder="E-Mail eingeben" required />
          
          <label htmlFor="password">Passwort</label>
          <input type="password" id="password" placeholder="Passwort eingeben" required />
          
          <button type="submit">Login</button>
        </form>
        <p>Haben Sie noch kein Konto?</p>
        <Link to="/register" className="register-button">Registrieren</Link>
      </div>
    </div>
  );
}