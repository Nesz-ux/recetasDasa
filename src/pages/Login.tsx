import React, { useState } from "react";
import LogoDasavena from "../assets/images/LogoDasavena.png";
import "../assets/styles/LoginStyle.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="login-container">
      <img src={LogoDasavena} className="logo-user" />
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form>
          <div className="input-container">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu Contraseña"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
