import React from "react";
import "../../assets/styles/ProductModalStyle.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Categoria, Receta, Presentacion, Idioma } from "./ProductList";

interface ProductModalProps {
  product: {
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
  } | null;
  onClose: () => void;
}

const getEmbedUrl = (url: string) => {
  if (!url) return "";

  if (url.includes("sharepoint.com")) {
    return url.replace("/r/", "/") + "&web=1";
  } else if (url.includes("drive.google.com")) {
    return url.replace("/view?usp=sharing", "/preview");
  } else if (url.includes("dropbox.com")) {
    return url.replace("?dl=0", "?raw=1");
  }
  return url;
};



const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const openLink = (url: string) => {
    if (url) window.open(url, "_blank");
  };

  const getDescripcion = (
    lista: { value: string; description: string }[],
    value: string
  ): string => {
    const itemEncontrado = lista.find((item) => item.value === value);
    return itemEncontrado ? itemEncontrado.description : value; 
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>{product.nombre_producto}</h2>
        <p>
          <strong>Categoría:</strong> {getDescripcion(Categoria, product.categoria)}
        </p>
        <p>
          <strong>Receta:</strong> {getDescripcion(Receta, product.receta)}
        </p>
        <p>
          <strong>Presentación:</strong> {getDescripcion(Presentacion, product.presentacion)}
        </p>
        <p>
          <strong>Idioma:</strong> {getDescripcion(Idioma, product.idioma)}
        </p>

        {product.url_especificacion && (
          <iframe
            src={getEmbedUrl(product.url_especificacion)}
            title="Especificación"
            className="modal-iframe"
          ></iframe>
        )}

        <div className="modal-buttons">
          {product.url_etiqueta_gral && (
            <button className="url-btn" onClick={() => openLink(product.url_etiqueta_gral)}>
              Ver Etiqueta General
            </button>
          )}
          {product.url_esp_con_impresion && (
            <button className="url-btn" onClick={() => openLink(product.url_esp_con_impresion)}>
              Etiqueta con Impresión
            </button>
          )}
          {product.url_esp_sin_impresion && (
            <button className="url-btn" onClick={() => openLink(product.url_esp_sin_impresion)}>
              Etiqueta sin Impresión
            </button>
          )}
          {product.url_sprand && (
            <button className="url-btn" onClick={() => openLink(product.url_sprand)}>
              Etiqueta Sprand
            </button>
          )}
          {product.url_growlink && (
            <button className="url-btn" onClick={() => openLink(product.url_growlink)}>
              Etqiueta Growlink
            </button>
          )}
        </div>

        <button className="close-button" onClick={onClose}>
          <IoIosCloseCircleOutline />
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
