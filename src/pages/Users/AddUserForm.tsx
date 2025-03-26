import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/AddUserStyle.css";
import { API_BASE_URL } from "../../utils/config";

const AddUserForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rol: "",
    departamento: "",
  });

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      alert("No tienes un token. Inicia Sesión para continuar.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Usuario creado exitosamente");
        alert("Usuario creado exitosamente");
        navigate("/manage-user")
      } else {
        const errorData = await response.json();
        console.error("Error al crear el usuario: ", errorData);
        alert(errorData.message || "Error al crear el usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="create-user">
      <h2>Crear Nuevo Usuario</h2>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChangeData}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electronico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChangeData}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChangeData}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol</label>
          <select
            name="rol"
            id="rol"
            value={formData.rol}
            onChange={handleChangeData}
          >
            <option value="Empleado">Empleado</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="departamento">Departamento</label>
          <input
            type="text"
            id="departamento"
            name="departamento"
            value={formData.departamento}
            onChange={handleChangeData}
            required
          />

          <button type="submit" className="submit-buton">
            Crear Usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
