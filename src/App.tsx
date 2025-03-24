import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddUserForm from "./pages/AddUserForm";
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
          <Route path="/add-user" element={<AddUserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
