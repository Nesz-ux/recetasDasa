import React, { useState, useEffect } from "react";
import "../assets/styles/HomeStyle.css";
//import images
import LogoDasavena from "../assets/icons/LogoDasavena.png";
import sun from "../assets/images/sun.webp";
import moon from "../assets/images/moon.webp";
//Import Packages
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

  //Cargar estado inicial
  useEffect(() => {
    try {
      const storedDarkMode = JSON.parse(
        localStorage.getItem("dark-mode") || "false"
      );

      setDarkMode(storedDarkMode);
    } catch (error) {
      console.error("Error al cargar datos de LocalStorage", error);
    }
  }, []);

  //Navegacion
  const handleAddUser = () => {
    navigate("/add-user");
  }

  //Cambiar el tema
  const handleChangeTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("dark-mode", JSON.stringify(newMode));
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="title-container">
        <img src={LogoDasavena} alt="LogoDasavena" />
        <h1 className="title">Información de Producto terminado</h1>
        <button className="btn-change-mode" onClick={handleChangeTheme}>
          <img
            src={darkMode ? sun : moon}
            alt="Change Mode"
            width={35}
            height={35}
          />
        </button>
      </div>

      <div className="input-container">
        <button className="add-user" onClick={handleAddUser}>Agregar Usuario</button>
      </div>
    </div>
  );
};

export default Home;
