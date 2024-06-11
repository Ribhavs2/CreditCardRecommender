import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    margin: theme.spacing(1),
    width: '300px',
  },
  button: {
    margin: theme.spacing(2),
  },
  select: {
    margin: theme.spacing(1),
    width: '300px',
  },
}));

const RecommendCard = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [priority, setPriority] = useState('max_points');
  const [recommendation, setRecommendation] = useState(null);

  const handleRecommendCard = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/recommend_card/', {
        user_id: userId,
        category,
        amount,
        priority,
      });
      setRecommendation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Recommend Card</Typography>
      <form onSubmit={handleRecommendCard} className={classes.form}>
        <TextField
          label="User ID"
          variant="outlined"
          className={classes.input}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <TextField
          label="Category"
          variant="outlined"
          className={classes.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          className={classes.input}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <FormControl variant="outlined" className={classes.select}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
            required
          >
            <MenuItem value="max_points">Maximize Points</MenuItem>
            <MenuItem value="max_value">Maximize Value</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Recommend Card
        </Button>
        {recommendation && (
          <Container>
            <Typography variant="h5" gutterBottom>Recommended Card</Typography>
            <Typography variant="body1">Card Name: {recommendation.card_name}</Typography>
            <Typography variant="body1">Points/Value: {recommendation.points}</Typography>
          </Container>
        )}
      </form>
    </Container>
  );
};

export default RecommendCard;
