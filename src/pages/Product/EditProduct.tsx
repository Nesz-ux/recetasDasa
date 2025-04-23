import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../utils/config";
import "../../assets/styles/EditProductStyle.css";
import { Categoria, Idioma, Presentacion} from "./ProductList";
import { RecetasPorCategoria } from "./ProductList";

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state;

  const [recetasFiltradas, setRecetasFiltradas] = useState(
    RecetasPorCategoria[product.categoria] || []
  );

  const [formEditProduct, setFormEditProduct] = useState({
    nombre_producto: product.nombre_producto,
    categoria: product.categoria,
    receta: product.receta,
    presentacion: product.presentacion,
    idioma: product.idioma,
    url_especificacion: product.url_especificacion,
    url_etiqueta_gral: product.url_etiqueta_gral,
    url_esp_con_impresion: product.url_esp_con_impresion,
    url_esp_sin_impresion: product.url_esp_sin_impresion,
    url_sprand: product.url_sprand,
    url_growlink: product.url_growlink,
  });

  
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "categoria") {
      setRecetasFiltradas(RecetasPorCategoria[value] || []);
      setFormEditProduct((prev) => ({
        ...prev,
        categoria: value,
        receta: "",
      }));
    } else {
      setFormEditProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const token = localStorage.getItem("token");

  const handleUpdateProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/products/update-product/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formEditProduct),
        }
      );

      if (response.ok) {
        console.log("Producto Actualizado Exitosamente");
        alert("Producto Actualizado Exitosamente");
        navigate("/manage-product");
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar el producto: ", errorData);
        alert(errorData.message || "Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="edit-product">
      <h2>Editar Producto: {product.nombre_producto}</h2>
      <form onSubmit={handleUpdateProduct} className="edit-product-form">
        <div className="form-group">
          <label htmlFor="nombre_producto">Nombre del Producto</label>
          <input
            type="text"
            id="nombre_producto"
            name="nombre_producto"
            value={formEditProduct.nombre_producto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría</label>
          <select
            name="categoria"
            id="categoria"
            value={formEditProduct.categoria}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            {(Categoria || []).map((item, index) => (
              <option key={index} value={item.value}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="receta">Receta</label>
          <select
            name="receta"
            id="receta"
            value={formEditProduct.receta}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            {recetasFiltradas.map((item, index) => (
              <option key={index} value={item.value}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="presentacion">Presentación</label>
          <select
            name="presentacion"
            id="presentacion"
            value={formEditProduct.presentacion}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            {(Presentacion || []).map((item, index) => (
              <option key={index} value={item.value}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="idioma">Idioma</label>
          <select
            name="idioma"
            id="idioma"
            value={formEditProduct.idioma}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            {(Idioma || []).map((item, index) => (
              <option key={index} value={item.value}>
                {item.description}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="url_especificacion">URL Especificación</label>
          <input
            type="text"
            id="url_especificacion"
            name="url_especificacion"
            value={formEditProduct.url_especificacion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url_etiqueta_gral">URL Etiqueta General</label>
          <input
            type="text"
            id="url_etiqueta_gral"
            name="url_etiqueta_gral"
            value={formEditProduct.url_etiqueta_gral}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url_esp_con_impresion">URL Con Impresión</label>
          <input
            type="text"
            id="url_esp_con_impresion"
            name="url_esp_con_impresion"
            value={formEditProduct.url_esp_con_impresion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url_esp_sin_impresion">URL Sin Impresión</label>
          <input
            type="text"
            id="url_esp_sin_impresion"
            name="url_esp_sin_impresion"
            value={formEditProduct.url_esp_sin_impresion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url_sprand">URL Sprand</label>
          <input
            type="text"
            id="url_sprand"
            name="url_sprand"
            value={formEditProduct.url_sprand}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url_growlink">URL Growlink</label>
          <input
            type="text"
            id="url_growlink"
            name="url_growlink"
            value={formEditProduct.url_growlink}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="update-btn">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
