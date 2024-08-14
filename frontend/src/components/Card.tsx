import React from 'react';
import { Card as CardType } from '../data/cardData';
import '../styles/Card.css'; 

interface CardProps {
  card: CardType;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ card, onEdit, onDelete }) => {
  return (
    <div className="card">
      <h2 className="card-title">{card.title}</h2>
      <p className="card-description">{card.description}</p>
      <div className="card-actions">
        <button className="card-button" onClick={() => onEdit(card.id)}>Edit</button>
        <button className="card-button" onClick={() => onDelete(card.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Card;
