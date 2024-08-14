// src/data/cards.ts

export interface Card {
  id: number;
  title: string;
  description: string;
}

export const dummyCards: Card[] = [
  { id: 1, title: 'Card 1', description: 'This is the description for Card 1.' },
  { id: 2, title: 'Card 2', description: 'This is the description for Card 2.' },
  { id: 3, title: 'Card 3', description: 'This is the description for Card 3.' },
];
