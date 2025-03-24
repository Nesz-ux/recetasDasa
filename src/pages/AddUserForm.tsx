import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/AddUserStyle.css";
import { API_BASE_URL } from "../utils/config";

const AddUserForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rol: "",
    departamento: "",
  });

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Agregar Usuario</h1>
    </div>
  );
};

export default AddUserForm;
