import React from "react";
import "./Card.css";
import { HiStar, HiOutlineStar } from "react-icons/hi2";

interface CardProps {
  title: string;
  description: string;
  isFavorite: boolean;
  onToggleFavorite: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  isFavorite,
  onToggleFavorite,
}) => {
  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggleFavorite(event);
  };
  return (
    <div className="card">
      <div className="content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>

      <button className="favorite-btn" onClick={handleFavoriteClick}>
        {isFavorite ? <HiStar color="gold" /> : <HiOutlineStar color="gold" />}
      </button>
    </div>
  );
};

export default Card;
