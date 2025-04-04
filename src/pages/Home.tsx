import React, { useState } from "react";
import "../assets/styles/HomeStyle.css";
import LogoDasavena from "../assets/icons/LogoDasavena.png";
import { useNavigate } from "react-router-dom";
import { Categoria, Receta, Presentacion, Idioma } from "./Product/ProductList";
import { API_BASE_URL } from "../utils/config";
import * as SlIcon from "react-icons/sl";
import ProductModal from "./Product/ProductModal";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");

  interface Product {
    nombre_producto: string;
    categoria: string;
    receta: string;
    presentacion: string;
    idioma: string;
    url_especificacion: string;
    url_etiqueta_gral: string;
    url_esp_con_impresion: string;
    url_esp_sin_impresion: string;
    url_sprand: string;
    url_growlink: string;
  }

  const [productData, setProductData] = useState<Product>({
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

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getDescripcion = (
    lista: { value: string; description: string }[],
    value: string
  ): string => {
    const itemEncontrado = lista.find((item) => item.value === value);
    return itemEncontrado ? itemEncontrado.description : value;
  };

  const fetchFilteredProducts = async () => {
    const { categoria, receta, presentacion, idioma } = productData;
    const allSelectsFilled = [categoria, receta, presentacion, idioma].every(
      (value) => value.trim() !== ""
    );

    if (!allSelectsFilled) {
      alert("Por favor, selecciona una opción en todos los campos antes de buscar.");
      return;
    }

    try {
      const queryParams = new URLSearchParams(
        Object.entries(productData).filter(
          ([key, value]) => key !== "nombre_producto" || value.trim() !== ""
        )
      ).toString();

      const response = await fetch(`${API_BASE_URL}/products/filter?${queryParams}`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: Product[] = await response.json();

      if (data.length === 0) {
        alert("No se encontraron productos con los filtros seleccionados.");
      }

      setFilteredProducts(data);
    } catch (error) {
      console.error("Error: ", error);
      alert("Producto No Encontrado");
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
          <>
            <button className="user-btn" onClick={() => navigate("/manage-user")}>
              Administrar Usuarios
            </button>
            <button className="product-btn" onClick={() => navigate("/manage-product")}>
              Agregar Producto
            </button>
          </>
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
        {["categoria", "receta", "presentacion", "idioma"].map((campo, index) => (
          <div className="form-container" key={index}>
            <label htmlFor={campo}>{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
            <select
              name={campo}
              id={campo}
              value={productData[campo as keyof Product]}
              onChange={handleChangeData}
              required
            >
              <option value="">Selecciona una opción</option>
              {(campo === "categoria" ? Categoria : campo === "receta" ? Receta : campo === "presentacion" ? Presentacion : Idioma).map((item, idx) => (
                <option key={idx} value={item.value}>
                  {item.description}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button className="search-btn" onClick={fetchFilteredProducts}>Buscar</button>
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
                  <td>{getDescripcion(Categoria, producto.categoria)}</td>
                  <td>{getDescripcion(Receta, producto.receta)}</td>
                  <td>{getDescripcion(Presentacion, producto.presentacion)}</td>
                  <td>{getDescripcion(Idioma, producto.idioma)}</td>
                  <td>
                    <button className="view-btn" onClick={() => handleOpenModal(producto)}>
                      <SlIcon.SlEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
        {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
