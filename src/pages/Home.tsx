import React, { useState } from "react";
import "../assets/styles/HomeStyle.css";
//import images
import LogoDasavena from "../assets/icons/LogoDasavena.png";
//Import Packages
import { useNavigate } from "react-router-dom";
//import Data
import { Categoria, Receta, Presentacion, Idioma } from "./Product/ProductList";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  const [productData, setProductData] = useState({
    nombre_producto: "",
    categoria: "",
    receta: "",
    presentacion: "",
    idioma: "",
    url_especificacion: "",
    url_etiqueta_gral: "",
    url_esp_con_impresion: "",
    url_esp_sin_impresion: "",
    url_sprand: "",
    url_growlink: "",
  });

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

      <div>
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

      <div className="container-filter">
        <h2>Buscar Producto</h2>
        <div className="form-container">
          <label htmlFor="categoria">Categoría</label>
          <select
            name="categoria"
            id="categoria"
            value={productData.categoria}
            onChange={handleChangeData}
            required
          >
            <option value="">Selecciona una Categoría</option>
            {Categoria.map((item, index) => (
              <option key={index} value={item.value}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-container">
          <label htmlFor="receta">Receta</label>
          <select
            name="receta"
            id="receta"
            value={productData.receta}
            onChange={handleChangeData}
            required
          >
            <option value="">Selecciona una Receta</option>
            {Receta.map((item, index) => (
              <option key={index} value={item.value}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-container">
          <label htmlFor="presentacion">Presentación</label>
          <select
            name="presentacion"
            id="presentacion"
            value={productData.presentacion}
            onChange={handleChangeData}
            required
          >
            <option value="">Selecciona una Presentación</option>
            {Presentacion.map((item, index) => (
              <option key={index} value={item.value}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-container">
          <label htmlFor="idioma">Idioma</label>
          <select
            name="idioma"
            id="idioma"
            value={productData.idioma}
            onChange={handleChangeData}
            required
          >
            <option value="">Selecciona una Idioma</option>
            {Idioma.map((item, index) => (
              <option key={index} value={item.value}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <button className="search-btn">Buscar</button>
      </div>
    </div>
  );
};

export default Home;
