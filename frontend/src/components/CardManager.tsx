import React, { useState } from 'react';
import CreditCard from './CreditCard';
import CardFormModal from './CardFormModal';
import { dummyCreditCardData, ICreditCard as CardType } from '../api/data/creditData';
import '../styles/CardManager.css'; 

const CardManager: React.FC = () => {
  const initialCard: CardType = { id: 0, cardNumber: '', expiryDate: '', cvc: '', cardType: 'visa' };
  const [cards, setCards] = useState<CardType[]>(dummyCreditCardData);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Form visibility state

  const handleAddCard = (card: CardType) => {
    const newCardData: CardType = {
      // id: Date.now(),
      ...card,
    };
    setCards([...cards, newCardData]);
  };

  const handleSaveEdit = (card: CardType) => {
    setCards(cards.map((c) => (c.id === editMode ? { ...card, id: editMode } : c)));
    setEditMode(null);
  };

  const handleEditCard = (id: number) => {
    const cardToEdit = cards.find((card) => card.id === id);
    if (cardToEdit) {
      setEditMode(id);
      setIsFormVisible(true); // Show form when editing
    }
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setIsFormVisible(false); // Hide form on cancel
  };

  return (
    <div className="card-manager">
      <h1>Card Manager</h1>
      {!isFormVisible && <button onClick={() => setIsFormVisible(true)}>Add New Card</button>}
      <CardFormModal
        initialCard={editMode !== null ? cards.find(card => card.id === editMode) || initialCard : initialCard}
        isVisible={isFormVisible}
        onSave={handleSaveEdit}
        onAdd={handleAddCard}
        onCancel={handleCancelEdit}
      />
      <div className="card-list">
        {cards.map((card) => (
          <CreditCard
            key={card.id}
            id={card.id}
            cardNumber={card.cardNumber}
            expiryDate={card.expiryDate}
            cvc={card.cvc}
            cardType={card.cardType}
            onEdit={() => handleEditCard(card.id)}
            onDelete={() => handleDeleteCard(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardManager;
