import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Import Config
import { API_BASE_URL } from "../../utils/config";
//Import Styles
import "./userTableStyle.css";
//Import icons
import * as TbUser from "react-icons/tb";
import * as TiIcons from "react-icons/ti";

const UserDatatable: React.FC = () => {
  interface User {
    _id: string;
    username: string;
    email: string;
    rol: string;
    departamento: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/user/dataUser`);
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error: ", error);
        setError("No se pudieron cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const token = localStorage.getItem("token");

  const handleDeleteUser = async (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estas seguro de que deseas eliminar este usuario?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        alert("Usuario eliminado exitosamente");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el usuario");
      }
    } catch (error) {
      console.error("Error al eliminar el usuario: ", error);
      alert("No se pudo eliminarel usuario. Intenta de nuevo");
    }
  };

  const handleEdit = (user: User) => {
    navigate("/edit-user", { state: { user } });
  };

  if (loading) {
    return <p>Cargando Usuarios</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.rol}</td>
                <td>{user.departamento}</td>
                <td>
                  <button
                    className="edit-buton"
                    onClick={() => handleEdit(user)}
                  >
                    <TbUser.TbUserEdit size={25} />
                  </button>

                  <button
                    className="delete-buton"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <TiIcons.TiDelete size={25} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No hay Usuarios Disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDatatable;
