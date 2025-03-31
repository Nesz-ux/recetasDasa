import React from "react";
import "../assets/styles/HomeStyle.css";
//import images
import LogoDasavena from "../assets/icons/LogoDasavena.png";
//Import Packages
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  //Navegacion
  const handleAddUser = () => {
    navigate("/manage-user");
  };
  const handleAddProduct = () => {
    navigate("/manage-product");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="title-container">
        <img src={LogoDasavena} alt="LogoDasavena" />
        <h1 className="title">Información de Producto terminado</h1>
      </div>
      {rol === "Administrador" && (
        <button className="user-btn" onClick={handleAddUser}>
          Administrar Usuarios
        </button>
      )}
      {rol === "Administrador" && (
        <button className="product-btn" onClick={handleAddProduct}>
          Agregar Producto
        </button>
      )}
      <button className="close-btn" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Home;
