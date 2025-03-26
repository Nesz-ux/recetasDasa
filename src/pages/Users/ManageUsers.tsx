import React from "react";
import UserDatatable from "../../components/userTable/userTable";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/ManageUser.css";

const ManageUsers: React.FC = () => {
  const navigate = useNavigate();
  const handleAdduser = () => {
    navigate("/add-user");
  };

  const handleBack = () => {
    navigate("/home");
  };
  return (
    <div className="manage-users">
      <h2 className="title-user">Usuarios</h2>
      <div className="header-section">
        <button className="back-button" onClick={() => handleBack()}>
          Regresar
        </button>
        <button className="add-user-button" onClick={() => handleAdduser()}>
          Agregar Usuario
        </button>
      </div>
      <div className="datatable-section">
        <UserDatatable />
      </div>
    </div>
  );
};

export default ManageUsers;
