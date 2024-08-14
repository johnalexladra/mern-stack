// src/data/dummyCreditCardData.ts

export interface ICreditCard {
  id: number;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardType: 'visa' | 'mastercard' | 'jcb'; // Define card types
}

export const dummyCreditCardData: ICreditCard[]  = [
  {
    id: 1,
    cardNumber: '1234 5678 9012 3456',
    expiryDate: '12/24',
    cvc: '123',
    cardType: 'visa',
  },
  {
    id: 2,
    cardNumber: '2345 6789 0123 4567',
    expiryDate: '11/23',
    cvc: '456',
    cardType: 'mastercard',
  },
  {
    id: 3,
    cardNumber: '3456 7890 1234 5678',
    expiryDate: '10/25',
    cvc: '789',
    cardType: 'jcb',
  },
  {
    id: 4,
    cardNumber: '4111 1111 1111 1111', // Example Visa card number
    expiryDate: '12/25', // Expiration date
    cvc: '123', // Card verification code
    cardType: 'visa' as 'visa' | 'mastercard' | 'jcb', // Card type
  },
  {
    id: 5,
    cardNumber: '5500 0000 0000 0004', // Example MasterCard number
    expiryDate: '01/26', // Expiration date
    cvc: '456', // Card verification code
    cardType: 'mastercard' as 'visa' | 'mastercard' | 'jcb', // Card type
  },
  {
    id: 6,
    cardNumber: '3566 1111 1111 1113', // Example JCB number
    expiryDate: '07/24', // Expiration date
    cvc: '789', // Card verification code
    cardType: 'jcb' as 'visa' | 'mastercard' | 'jcb', // Card type
  },
];
