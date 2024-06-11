// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   input: {
//     margin: theme.spacing(1),
//     width: '300px',
//   },
//   button: {
//     margin: theme.spacing(2),
//   },
//   select: {
//     margin: theme.spacing(1),
//     width: '300px',
//   },
// }));

// const AddCard = () => {
//   const classes = useStyles();
//   const [userId, setUserId] = useState('');
//   const [cardId, setCardId] = useState('');
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/pre_existing_cards/');
//         setCards(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchCards();
//   }, []);

//   const handleAddCard = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/add_card/', {
//         user_id: userId,
//         card_id: cardId,
//       });
//       console.log(response.data);
//       alert('Card added successfully');
//     } catch (error) {
//       console.error(error);
//       alert('Failed to add card');
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Add Card</Typography>
//       <form onSubmit={handleAddCard} className={classes.form}>
//         <TextField
//           label="User ID"
//           variant="outlined"
//           className={classes.input}
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//           required
//         />
//         <FormControl variant="outlined" className={classes.select}>
//           <InputLabel>Card</InputLabel>
//           <Select
//             value={cardId}
//             onChange={(e) => setCardId(e.target.value)}
//             label="Card"
//             required
//           >
//             <MenuItem value="">
//               <em>None</em>
//             </MenuItem>
//             {cards.map((card) => (
//               <MenuItem key={card.id} value={card.id}>{card.card_name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           className={classes.button}
//         >
//           Add Card
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default AddCard;

import React, { useState, useEffect } from 'react';
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
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/pre_existing_cards/');
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
      const response = await axios.post('http://127.0.0.1:8000/api/add_card/', {
        user_id: user.id,
        card_id: cardId,
      });
      console.log(response.data);
      alert('Card added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add card');
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
      </form>
    </Container>
  );
};

export default AddCard;
