import React, { useState } from "react";
import LogoDasavena from "../assets/images/LogoDasavena.png";
import "../assets/styles/LoginStyle.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/config";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();


  //Llamada a Servidor y BD
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        //Guardamos el token y el rol en el localstorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("rol", data.rol);

        navigate("/home");
      } else {
        alert(data.message || "Error al Iniciar Sesion");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor: ", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <img src={LogoDasavena} alt="Logo" className="logo-user" />
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label className="label-login" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              className="input-login"
              required
            />
          </div>

          <div className="input-container">
            <label className="label-login" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu Contraseña"
              className="input-login"
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
