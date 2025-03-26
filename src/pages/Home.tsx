import React from "react";
import "../assets/styles/HomeStyle.css";
//import images
import LogoDasavena from "../assets/icons/LogoDasavena.png";
//Import Packages
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  //Navegacion
  const handleAddUser = () => {
    navigate("/manage-user");
  };

  return (
    <div className="container">
      <div className="title-container">
        <img src={LogoDasavena} alt="LogoDasavena" />
        <h1 className="title">Información de Producto terminado</h1>
      </div>

      <div className="input-container">
        <button className="user-btn" onClick={handleAddUser}>
          Administrar Usuarios
        </button>
      </div>
    </div>
  );
};

export default Home;
