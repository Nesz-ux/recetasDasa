import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddUserForm from "./pages/Users/AddUserForm";
import ManageUsers from "./pages/Users/ManageUsers";
import EditUser from "./pages/Users/EditUser";
import ManageProduct from "./pages/Product/ManageProduct";
import AddProduct from "./pages/Product/AddProduct";
import EditProduct from "./pages/Product/EditProduct";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [rol, setRole] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const currentState = location.state;
    if (currentState && currentState.rol) {
      setRole(currentState.rol);
    } else {
      const storedRole = localStorage.getItem("rol");
      setRole(storedRole);
    }
  }, [location]);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to={"/"} replace />}
        />
        {rol === "Administrador" && (
          <Route
            path="/manage-user"
            element={token ? <ManageUsers /> : <Navigate to={"/"} replace />}
          />
        )}
        <Route
          path="/add-user"
          element={token ? <AddUserForm /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/edit-user"
          element={token ? <EditUser /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/manage-product"
          element={token ? <ManageProduct /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/add-product"
          element={token ? <AddProduct /> : <Navigate to={"/"} replace />}
        />
        <Route
          path="/edit-product"
          element={token ? <EditProduct /> : <Navigate to={"/"} replace />}
        />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
