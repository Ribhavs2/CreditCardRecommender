import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: theme.spacing(2),
    width: '300px',
  },
  button: {
    margin: theme.spacing(2),
  },
  select: {
    margin: theme.spacing(2),
    width: '300px',
  },
}));

const AddCard = () => {
  const classes = useStyles();
  const [cardId, setCardId] = useState('');
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pre_existing_cards/', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        setCards(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch cards');
      }
    };

    fetchCards();
  }, [token]);

  const handleAddCard = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/add_card/', {
        user_id: user.id,
        card_id: cardId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      console.log(response.data);
      setSuccess('Card added successfully');
    } catch (error) {
      console.error(error);
      setError('Failed to add card');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Add Card</Typography>
      <form onSubmit={handleAddCard} className={classes.form}>
        <FormControl variant="outlined" className={classes.select}>
          <InputLabel>Card</InputLabel>
          <Select
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
            label="Card"
            required
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cards.map((card) => (
              <MenuItem key={card.id} value={card.id}>{card.card_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Add Card
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </form>
    </Container>
  );
};

export default AddCard;
