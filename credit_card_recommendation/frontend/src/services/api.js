import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const registerUser = (username, password) => {
  return axios.post(`${API_URL}/register/`, { username, password });
};

export const loginUser = (username, password) => {
  return axios.post(`${API_URL}/login/`, { username, password });
};

export const addCard = (user_id, card_id) => {
  return axios.post(`${API_URL}/add_card/`, { user_id, card_id });
};

export const getPreExistingCards = () => {
  return axios.get(`${API_URL}/pre_existing_cards/`);
};

export const recommendCard = (user_id, category, amount, priority) => {
  return axios.post(`${API_URL}/recommend_card/`, { user_id, category, amount, priority });
};
