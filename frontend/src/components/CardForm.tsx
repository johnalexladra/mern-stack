import React, { useState, useEffect } from 'react';
import { ICreditCard as CardType } from '../data/creditData';
import '../styles/CardForm.css';

interface CardFormProps {
  initialCard: CardType;
  isVisible: boolean;
  onSave: (card: CardType) => void;
  onAdd: (card: CardType) => void;
  onCancel: () => void; // Todo: Add a callback for cancelling the form
}

const CardForm: React.FC<CardFormProps> = ({ initialCard, isVisible, onSave, onAdd, onCancel }) => {
  const [card, setCard] = useState<CardType>(initialCard);

  useEffect(() => {
    setCard(initialCard);
  }, [initialCard]);

  const handleSubmit = () => {
    if (initialCard.id === 0) { // Assuming id=0 means it's a new card
      onAdd(card);
    } else {
      onSave(card);
    }
    setCard({ id: 0, cardNumber: '', expiryDate: '', cvc: '', cardType: 'visa' }); // Reset form
    onCancel(); // Hide form
  };

  if (!isVisible) return null; // Render nothing if form is not visible

  return (
    <div className="card-form-container">
      <div className="card-form">
        <input
          type="text"
          value={card.cardNumber}
          onChange={(e) => setCard({ ...card, cardNumber: e.target.value })}
          placeholder="Card Number"
        />
        <input
          type="text"
          value={card.expiryDate}
          onChange={(e) => setCard({ ...card, expiryDate: e.target.value })}
          placeholder="Expiry Date (MM/YY)"
        />
        <input
          type="text"
          value={card.cvc}
          onChange={(e) => setCard({ ...card, cvc: e.target.value })}
          placeholder="CVC"
        />
        <select
          value={card.cardType}
          onChange={(e) => setCard({ ...card, cardType: e.target.value as 'visa' | 'mastercard' | 'jcb' })}
        >
          <option value="visa">Visa</option>
          <option value="mastercard">MasterCard</option>
          <option value="jcb">JCB</option>
        </select>
        <button onClick={handleSubmit}>{initialCard.id === 0 ? 'Add Card' : 'Save'}</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CardForm;
