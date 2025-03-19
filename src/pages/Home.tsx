import React, { useState, useEffect, useMemo } from "react";
import "../assets/styles/HomeStyle.css";
//import images
import LogoDasavena from "../assets/images/LogoDasavena.png";
import sun from "../assets/images/sun.webp";
import moon from "../assets/images/moon.webp";

interface App {
  title: string;
  description: string;
  image: string;
  url: string;
  isFavorite: boolean;
}

const Home: React.FC = () => {
  const [favorites, setFavorites] = useState<App[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  //Manejar la busqueda
  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  //Cambiar el tema
  const handleChangeTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("dark-mode", JSON.stringify(newMode));
  };

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="title-container">
        <img src={LogoDasavena} alt="Logo Da Savena" className="logo" />
        <h1 className="title">Recetas Dasavena</h1>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Buscar receta"
          value={searchTerm}
          onChange={handleSearchTerm}
          className="search-bar"
        />
        <button className="btn-change-mode" onClick={handleChangeTheme}>
          <img src={darkMode ? sun : moon} 
            alt="Change Mode"
            width={35}
            height={35}
          />
        </button>
      </div>

      {favorites.length > 0 && (
        <div className="favorite-section">
            <h2>Favoritos</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
