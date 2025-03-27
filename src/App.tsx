import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddUserForm from "./pages/Users/AddUserForm";
import ManageUsers from "./pages/Users/ManageUsers";
import EditUser from "./pages/Users/EditUser";
import ManageProduct from "./pages/Product/ManageProduct";
import AddProduct from "./pages/Product/AddProduct";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  //Cargar estado inicial
  useEffect(() => {
    try {
      const storedDarkMode = JSON.parse(
        localStorage.getItem("dark-mode") || "false"
      );

      setDarkMode(storedDarkMode);
    } catch (error) {
      console.error("Error al cargar datos de LocalStorage", error);
    }
  }, []);

  return (
    <Router>
      <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/manage-user" element={<ManageUsers />} />
          <Route path="/add-user" element={<AddUserForm />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/manage-product" element={<ManageProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
