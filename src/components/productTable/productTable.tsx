import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Import Config
import { API_BASE_URL } from "../../utils/config";
//Import Styles
import "./productTableStyle.css";
//Import Icons
import * as TbIcons from "react-icons/tb";
import * as TiIcons from "react-icons/ti";
import {
  Categoria,
  Receta,
  Presentacion,
  Idioma,
} from "../../pages/Product/ProductList";

const ProductDataTable: React.FC = () => {
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
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const getDescripcion = (
    lista: { value: string; description: string }[],
    value: string
  ): string => {
    const itemEncontrado = lista.find((item) => item.value === value);
    return itemEncontrado ? itemEncontrado.description : value; // Si no encuentra, devuelve el valor original
  };

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

  const handleEditProduct = (product: Product) => {
    navigate("/edit-product", { state: { product } });
  };

  const token = localStorage.getItem("token");

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estas seguro de que deseas eliminar este usuario?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/products/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProduct((prevProduct) =>
          prevProduct.filter((product) => product._id !== id)
        );
        alert("Producto eliminado exitosamente");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
      alert("No se pudo eliminar el producto. Intenta de nuevo más tarde");
    }
  };

  if (loading) {
    return <p>Cargando Productos ...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
                <td>{getDescripcion(Categoria, product.categoria)}</td>
                <td>{getDescripcion(Receta, product.receta)}</td>
                <td>{getDescripcion(Presentacion, product.presentacion)}</td>
                <td>{getDescripcion(Idioma, product.idioma)}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditProduct(product)}
                  >
                    <TbIcons.TbUserEdit size={25} />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
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

export default ProductDataTable;
