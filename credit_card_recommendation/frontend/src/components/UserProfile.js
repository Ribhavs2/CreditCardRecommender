import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    maxWidth: 360,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user_cards/${user.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCards(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch cards');
      }
    };

    fetchCards();
  }, [user.id, token]);

  const handleDeleteCard = async (cardId) => {
    setError('');
    setSuccess('');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete_card/${cardId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCards(cards.filter((card) => card.id !== cardId));
      setSuccess('Card deleted successfully');
    } catch (error) {
      console.error(error);
      setError('Failed to delete card');
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>User Profile</Typography>
      <Typography variant="h6">Username: {user.username}</Typography>
      <Typography variant="h6">Email: {user.email}</Typography>
      <Typography variant="h5" gutterBottom>My Cards</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <List className={classes.list}>
        {cards.map((card) => (
          <ListItem key={card.id}>
            <ListItemText primary={card.pre_existing_card.card_name} />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => handleDeleteCard(card.id)}
              >
                Delete
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UserProfile;
