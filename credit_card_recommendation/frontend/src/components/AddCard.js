import React, { useState, useEffect } from 'react';
import { addCard, getPreExistingCards } from '../services/api';

const AddCard = () => {
  const [userId, setUserId] = useState('');
  const [cardId, setCardId] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getPreExistingCards();
        setCards(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, []);

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const response = await addCard(userId, cardId);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleAddCard}>
      <div>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <label>Card:</label>
        <select value={cardId} onChange={(e) => setCardId(e.target.value)}>
          <option value="">Select a card</option>
          {cards.map((card) => (
            <option key={card.id} value={card.id}>{card.card_name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Add Card</button>
    </form>
  );
};

export default AddCard;
