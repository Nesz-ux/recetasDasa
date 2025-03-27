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
  const handleAddProduct = () => {
    navigate("/manage-product");
  };

  return (
    <div className="container">
      <div className="title-container">
        <img src={LogoDasavena} alt="LogoDasavena" />
        <h1 className="title">Información de Producto terminado</h1>
      </div>
      <button className="user-btn" onClick={handleAddUser}>
          Administrar Usuarios
        </button>
      <button className="product-btn" onClick={handleAddProduct}>
          Agregar Producto
        </button>
    </div>
  );
};

export default Home;
