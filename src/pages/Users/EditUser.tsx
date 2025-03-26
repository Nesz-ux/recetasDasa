import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../utils/config";
import "../../assets/styles/EditUserStyle.css";
import "../../assets/styles/AddUserStyle.css"

const EditUser: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;

  const [formEditUser, setFormEditUser] = useState({
    username: user.username,
    email: user.email,
    password: "",
    rol: user.rol,
    departamento: user.departamento,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormEditUser({
      ...formEditUser,
      [event.target.name]: event.target.value,
    });
  };

  const token = localStorage.getItem("token");

  const handleUpdateProfile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formEditUser),
      });

      if (response.ok) {
        console.log("Usuario actualizado exitosamente");
        alert("Usuario actualizado exitosamente");
        navigate("/manage-user");
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar el usuario: ", errorData);
        alert(errorData.message || "Error al actualizar el usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error);
      alert("Error al conectar con el servidor");
    }
  };
  return (
    <div className="edit-user">
      <h2>Editar Usuario: {user.username}</h2>
      <form onSubmit={handleUpdateProfile} className="edit-user-form">
        <div className="form-group">
          <label htmlFor="username">Nombre</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formEditUser.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formEditUser.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formEditUser.password}
            onChange={handleChange}
            placeholder="Opcional"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rol">Rol</label>
          <select
            name="rol"
            id="rol"
            value={formEditUser.rol}
            onChange={handleChange}
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
            value={formEditUser.departamento}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="update-btn">
          Actualizar Usuario
        </button>
      </form>
    </div>
  );
};

export default EditUser;
