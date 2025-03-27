import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/ManageUser.css";

const ManageProduct: React.FC = () => {
  const navigate = useNavigate();

  //Navegacion
  const handleAddProduct = () => {
    navigate("/add-product");
  };
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <div className="manage-users">
      <h2 className="title-user">Productos</h2>
      <div className="header-section">
        <button className="back-button" onClick={() => handleBack()}>
          Regresar
        </button>
        <button className="add-user-button" onClick={() => handleAddProduct()}>
          Agregar Producto
        </button>
      </div>
      <div className="datatable-section"></div>
    </div>
  );
};

export default ManageProduct;
