import React from "react";
import UserDatatable from "../../components/userTable/userTable";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/ManageUser.css"

const ManageUsers: React.FC = () => {
  const navigate = useNavigate();
  const handleAdduser = () => {
    navigate("/add-user");
  };
  return (
    <div className="manage-users">
      <div className="header-section">
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
