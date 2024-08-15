import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ICreditCard as CardType } from '../api/data/creditData';
import '../styles/CardForm.css';

interface CardFormProps {
  initialCard: CardType;
  isVisible: boolean;
  onSave: (card: CardType) => void;
  onAdd: (card: CardType) => void;
  onCancel: () => void; // Todo: Add a callback for cancelling the form
}

const CardFormModal: React.FC<CardFormProps> = ({ initialCard, isVisible, onSave, onAdd, onCancel }) => {
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

  return (
    <Modal show={isVisible} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialCard.id === 0 ? 'Add Card' : 'Edit Card'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="cardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              value={card.cardNumber}
              onChange={(e) => setCard({ ...card, cardNumber: e.target.value })}
              placeholder="Card Number"
            />
          </Form.Group>
          <Form.Group controlId="expiryDate">
            <Form.Label>Expiry Date (MM/YY)</Form.Label>
            <Form.Control
              type="text"
              value={card.expiryDate}
              onChange={(e) => setCard({ ...card, expiryDate: e.target.value })}
              placeholder="Expiry Date (MM/YY)"
            />
          </Form.Group>
          <Form.Group controlId="cvc">
            <Form.Label>CVC</Form.Label>
            <Form.Control
              type="text"
              value={card.cvc}
              onChange={(e) => setCard({ ...card, cvc: e.target.value })}
              placeholder="CVC"
            />
          </Form.Group>
          <Form.Group controlId="cardType">
            <Form.Label>Card Type</Form.Label>
            <Form.Control
              as="select"
              value={card.cardType}
              onChange={(e) => setCard({ ...card, cardType: e.target.value as 'visa' | 'mastercard' | 'jcb' })}
            >
              <option value="visa">Visa</option>
              <option value="mastercard">MasterCard</option>
              <option value="jcb">JCB</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {initialCard.id === 0 ? 'Add Card' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardFormModal;
