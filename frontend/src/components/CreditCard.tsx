import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faCcJcb } from '@fortawesome/free-brands-svg-icons';
import '../styles/CreditCard.css';

// Define the CreditCardProps to include id and action handlers
interface CreditCardProps {
  id: number;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardType: 'visa' | 'mastercard' | 'jcb'; // Define card types
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const cardIcons = {
  visa: faCcVisa,
  mastercard: faCcMastercard,
  jcb: faCcJcb,
};

const CreditCard: React.FC<CreditCardProps> = ({ id, cardNumber, expiryDate, cvc, cardType, onEdit, onDelete }) => {
  const [isCvcVisible, setIsCvcVisible] = useState(false);

  const toggleCvcVisibility = () => {
    setIsCvcVisible(!isCvcVisible);
  };

  return (
    <div className="credit-card">
      <div className="card-background">
        {/* Bank logo placeholder */}
        <div className="bank-logo">Bank Logo</div>
      </div>
      <div className="card-content">
        <FontAwesomeIcon icon={cardIcons[cardType]} className="card-logo" />
        <div className="card-number">
          <span>{cardNumber}</span>
        </div>
        <div className="card-details">
          <div className="expiry-date">
            <span>Expires</span>
            <span>{expiryDate}</span>
          </div>
          <div className="cvc">
            <span>CVC</span>
            <div className="cvc-container">
              <span>{isCvcVisible ? cvc : '000'}</span>
              <button onClick={toggleCvcVisibility} className="toggle-cvc">
                <FontAwesomeIcon icon={isCvcVisible ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
        </div>
        <div className="card-actions">
          <button onClick={() => onEdit(id)} className="action-button edit-button">
            Edit <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => onDelete(id)} className="action-button delete-button">
            Delete <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
