import React, { useState } from "react";
import "../assets/styles/HomeStyle.css";
import LogoDasavena from "../assets/icons/LogoDasavena.png";
import { useNavigate } from "react-router-dom";
import { Categoria, Receta, Presentacion, Idioma } from "./Product/ProductList";
import { API_BASE_URL } from "../utils/config";
import * as SlIcon from "react-icons/sl";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  const [productData, setProductData] = useState({
    nombre_producto: "",
    categoria: "",
    receta: "",
    presentacion: "",
    idioma: "",
  });

  const [filteredProducts, setFilteredProducts] = useState<
    {
      nombre_producto: string;
      categoria: string;
      receta: string;
      presentacion: string;
      idioma: string;
    }[]
  >([]);

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchFilteredProducts = async () => {
    try {
      const queryParams = new URLSearchParams(
        Object.entries(productData).filter(([, value]) => value) // Filtrar valores vacíos
      ).toString();

      const response = await fetch(
        `${API_BASE_URL}/products/filter?${queryParams}`
      );

      console.log("Respuesta de la API:", response);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error al obtener productos: ", error);
    }
  };

  return (
    <div className="container">
      <div className="title-container">
        <img src={LogoDasavena} alt="LogoDasavena" />
        <h1 className="title">Información de Producto terminado</h1>
      </div>

      <div>
        {rol === "Administrador" && (
          <button className="user-btn" onClick={() => navigate("/manage-user")}>
            Administrar Usuarios
          </button>
        )}
        {rol === "Administrador" && (
          <button
            className="product-btn"
            onClick={() => navigate("/manage-product")}
          >
            Agregar Producto
          </button>
        )}
        <button
          className="close-btn"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("rol");
            navigate("/");
          }}
        >
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
          >
            <option value="">Selecciona un Idioma</option>
            {Idioma.map((item, index) => (
              <option key={index} value={item.value}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <button className="search-btn" onClick={fetchFilteredProducts}>
          Buscar
        </button>

        <h2>Resultados</h2>

        <div className="results-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Receta</th>
                <th>Presentación</th>
                <th>Idioma</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre_producto}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.receta}</td>
                  <td>{producto.presentacion}</td>
                  <td>{producto.idioma}</td>
                  <td>
                    <button className="view-btn">
                      <SlIcon.SlEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
