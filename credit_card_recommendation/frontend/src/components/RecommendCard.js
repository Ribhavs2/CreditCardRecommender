import React, { useState } from 'react';
import { recommendCard } from '../services/api';

const RecommendCard = () => {
  const [userId, setUserId] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [priority, setPriority] = useState('max_points');
  const [recommendation, setRecommendation] = useState(null);

  const handleRecommendCard = async (e) => {
    e.preventDefault();
    try {
      const response = await recommendCard(userId, category, amount, priority);
      setRecommendation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleRecommendCard}>
      <div>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="max_points">Maximize Points</option>
          <option value="max_value">Maximize Value</option>
        </select>
      </div>
      <button type="submit">Recommend Card</button>
      {recommendation && (
        <div>
          <h3>Recommended Card</h3>
          <p>Card Name: {recommendation.card_name}</p>
          <p>Points/Value: {recommendation.points}</p>
        </div>
      )}
    </form>
  );
};

export default RecommendCard;
