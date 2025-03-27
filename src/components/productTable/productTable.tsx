import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Import Config
import { API_BASE_URL } from "../../utils/config";
//Import Styles
import "./productTableStyle.css";
//Import Icons
import * as TbIcons from "react-icons/tb";
import * as TiIcons from "react-icons/ti";

const productDataTable: React.FC = () => {
  interface Product {
    _id: string;
    nombre_producto: string;
    categoria: string;
    receta: string;
    presentacion: string;
    idioma: string;
    url_especificacion: string;
    url_etiqueta_general: string;
    url_esp_con_impresion: string;
    url_esp_sin_impresion: string;
    url_sprand: string;
    url_growlink: string;
  }

  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<String>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const response: Response = await fetch(
          `${API_BASE_URL}/products/dataProducts`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const productData: Product[] = await response.json();
        setProduct(productData);
      } catch (error: unknown) {
        console.log("Error: ", error);
        setError("No se pudieron cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoria</th>
            <th>Receta</th>
            <th>Presentación</th>
            <th>Idioma</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {product.length > 0 ? (
            product.map((product) => (
              <tr key={product._id}>
                <td>{product.nombre_producto}</td>
                <td>{product.categoria}</td>
                <td>{product.receta}</td>
                <td>{product.presentacion}</td>
                <td>{product.idioma}</td>
                <td>
                  <button className="edit-btn">
                    <TbIcons.TbUserEdit size={25} />
                  </button>

                  <button className="delete-btn">
                    <TiIcons.TiDelete size={25} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No hay Productos Registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default productDataTable;
