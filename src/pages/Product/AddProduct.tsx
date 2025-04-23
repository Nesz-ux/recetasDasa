import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/AddUserStyle.css";
import { Categoria, Receta, Presentacion, Idioma } from "./ProductList";
import { RecetasPorCategoria } from "./ProductList";
import { API_BASE_URL } from "../../utils/config";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const [recetasFiltradas, setRecetasFiltradas] = useState<{ value: string; description: string }[]>([]);

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
    if (name === "categoria") {
      setRecetasFiltradas(RecetasPorCategoria[value] || []);
      setProductData((prevData) => ({
        ...prevData,
        categoria: value,
        receta: "",
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const token = localStorage.getItem("token");

  const handleSubmitProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!token) {
      alert("Vuelve a Iniciar Sesión");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/products/register-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        console.log("Producto creado exitosamente");
        alert("Producto Creado Exitosamente");
        navigate("/manage-product");
      } else {
        const errorData = await response.json();
        console.error("Error al crear el producto: ", errorData);
        alert(errorData.message || "Error al crear el producto");
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="container-product">
      <div className="create-product">
        <h2>Crear Nuevo Producto</h2>
        <form className="create-user-form" onSubmit={handleSubmitProduct}>
          <div className="form-group">
            <label htmlFor="nombre_producto">Nombre del Producto</label>
            <input
              type="text"
              id="nombre_producto"
              name="nombre_producto"
              value={productData.nombre_producto}
              onChange={handleChangeData}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoria</label>
            <select
              name="categoria"
              id="categoria"
              value={productData.categoria}
              onChange={handleChangeData}
              required
            >
              <option value="">Selecciona una Categoria</option>
              {Categoria.map((item, index) => (
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
              value={productData.receta}
              onChange={handleChangeData}
              required
            >
              <option value="">Selecciona una Receta</option>
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

          <div className="form-group">
            <label htmlFor="idioma">Idioma</label>
            <select
              name="idioma"
              id="idioma"
              value={productData.idioma}
              onChange={handleChangeData}
              required
            >
              <option value="">Selecciona un Idioma</option>
              {Idioma.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.description}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="url_especificacion">URL de la Especificación</label>
            <input
              type="text"
              id="url_especificacion"
              name="url_especificacion"
              value={productData.url_especificacion}
              onChange={handleChangeData}
            />
          </div>

          <div className="form-group">
            <label htmlFor="url_etiqueta_gral">Etiqueta General</label>
            <input
              type="text"
              id="url_etiqueta_gral"
              name="url_etiqueta_gral"
              value={productData.url_etiqueta_gral}
              onChange={handleChangeData}
            />
          </div>

          <div className="form-group">
            <label htmlFor="url_esp_con_impresion">URL Con Impresión</label>
            <input
              type="text"
              id="url_esp_con_impresion"
              name="url_esp_con_impresion"
              value={productData.url_esp_con_impresion}
              onChange={handleChangeData}
            />
          </div>

          <div className="form-group">
            <label htmlFor="url_esp_sin_impresion">
              URL Etiqueta Sin Impresión
            </label>
            <input
              type="text"
              id="url_esp_sin_impresion"
              name="url_esp_sin_impresion"
              value={productData.url_esp_sin_impresion}
              onChange={handleChangeData}
            />
          </div>

          <div className="form-group">
            <label htmlFor="url_sprand">URL Etiqueta Sprand</label>
            <input
              type="text"
              id="url_sprand"
              name="url_sprand"
              value={productData.url_sprand}
              onChange={handleChangeData}
            />
          </div>

          <div className="form-group">
            <label htmlFor="url_growlink">URL Etiqueta Growlink</label>
            <input
              type="text"
              id="url_growlink"
              name="url_growlink"
              value={productData.url_growlink}
              onChange={handleChangeData}
            />
          </div>

          <button className="submit-buton" type="submit">
            Agregar Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
