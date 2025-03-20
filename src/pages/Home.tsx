import React, { useState, useEffect, useMemo } from "react";
import "../assets/styles/HomeStyle.css";
//import images
import LogoDasavena from "../assets/icons/LogoDasavena.png";
import sun from "../assets/images/sun.webp";
import moon from "../assets/images/moon.webp";
import falseSearchBlack from "../assets/images/falseSearchBlack.json";
import falseSearchWhite from "../assets/images/falseSearchWhite.json";
//Import components
import Card from "../components/cards/Card";
import appData from "../components/cards/cardsData";
//Import packages
import Lottie from "lottie-react";

interface App {
  title: string;
  description: string;
  isFavorite?: boolean;
}

const Home: React.FC = () => {
  const [favorites, setFavorites] = useState<App[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [apps] = useState<App[]>(appData);

  //Cargar estado inicial
  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      const storedDarkMode = JSON.parse(
        localStorage.getItem("dark-mode") || "false"
      );

      setFavorites(storedFavorites);
      setDarkMode(storedDarkMode);
    } catch (error) {
      console.error("Error al cargar datos de LocalStorage", error);
    }
  }, []);

  //Alternar Favoritos
  const toggleFavorite = (app: App) => {
    const updatedFavorites = favorites.some((fav) => fav.title === app.title)
      ? favorites.filter((fav) => fav.title !== app.title)
      : [...favorites, app];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  //Filtrar apps
  const filteredApps = useMemo(() => {
    const normalizedSearch = searchTerm
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return apps.filter(({ title, description }) => {
      const normalizedTitle = title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const normalizedDescription = description
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      return (
        (normalizedTitle.includes(normalizedSearch) ||
          normalizedDescription.includes(normalizedSearch)) &&
        !favorites.some((fav) => fav.title === title)
      );
    });
  }, [searchTerm, apps, favorites]);

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
        <img src={LogoDasavena} alt="LogoDasavena" />
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
          <img
            src={darkMode ? sun : moon}
            alt="Change Mode"
            width={35}
            height={35}
          />
        </button>
      </div>

      {favorites.length > 0 && (
        <div className="favorite-section">
          <h2>Favoritos</h2>
          <div className="grid">
            {favorites.map((app, index) => (
              <Card
                key={index}
                title={app.title}
                description={app.description}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(app)}
              />
            ))}
          </div>
        </div>
      )}

      {filteredApps.length > 0 ? (
        <div className="grid">
          {filteredApps.map((app, index) => (
            <Card
              key={index}
              title={app.title}
              description={app.description}
              isFavorite={favorites.some((fav) => fav.title === app.title)}
              onToggleFavorite={() => toggleFavorite(app)}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          {!darkMode ? (
            <Lottie
              animationData={falseSearchBlack}
              autoplay
              loop={false}
              style={{ height: "200px", width: "200px" }}
            />
          ) : (
            <Lottie
              animationData={falseSearchWhite}
              autoplay
              loop={false}
              style={{ height: "200px", width: "200px" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
