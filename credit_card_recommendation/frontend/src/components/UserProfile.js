// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Typography, Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Alert } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   list: {
//     width: '100%',
//     maxWidth: 360,
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     maxWidth: 360,
//     marginBottom: theme.spacing(2),
//   },
//   input: {
//     margin: theme.spacing(1),
//     width: '100%',
//   },
// }));

// const UserProfile = () => {
//   const classes = useStyles();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
//   const [username, setUsername] = useState(user.username);
//   const [email, setEmail] = useState(user.email);
//   const [cards, setCards] = useState([]);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/user_cards/${user.id}/`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCards(response.data);
//       } catch (error) {
//         console.error(error);
//         setError('Failed to fetch cards');
//       }
//     };

//     fetchCards();
//   }, [user.id, token]);

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     try {
//       const response = await axios.put(`http://127.0.0.1:8000/api/update_profile/${user.id}/`, {
//         username,
//         email,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUser(response.data);
//       localStorage.setItem('user', JSON.stringify(response.data));
//       setSuccess('Profile updated successfully');
//     } catch (error) {
//       console.error(error);
//       setError('Failed to update profile');
//     }
//   };

//   const handleDeleteCard = async (cardId) => {
//     setError('');
//     setSuccess('');
//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/delete_card/${cardId}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCards(cards.filter((card) => card.id !== cardId));
//       setSuccess('Card deleted successfully');
//     } catch (error) {
//       console.error(error);
//       setError('Failed to delete card');
//     }
//   };

//   return (
//     <Container className={classes.container}>
//       <Typography variant="h4" gutterBottom>User Profile</Typography>
//       <form onSubmit={handleUpdateProfile} className={classes.form}>
//         <TextField
//           label="Username"
//           variant="outlined"
//           className={classes.input}
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <TextField
//           label="Email"
//           variant="outlined"
//           className={classes.input}
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           className={classes.button}
//         >
//           Update Profile
//         </Button>
//       </form>
//       {error && <Alert severity="error">{error}</Alert>}
//       {success && <Alert severity="success">{success}</Alert>}
//       <Typography variant="h5" gutterBottom>My Cards</Typography>
//       <List className={classes.list}>
//         {cards.map((card) => (
//           <ListItem key={card.id}>
//             <ListItemText primary={card.pre_existing_card.card_name} />
//             <ListItemSecondaryAction>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 className={classes.button}
//                 onClick={() => handleDeleteCard(card.id)}
//               >
//                 Delete
//               </Button>
//             </ListItemSecondaryAction>
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    marginBottom: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1),
    width: '100%',
  },
  select: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [cardId, setCardId] = useState('');
  const [availableCards, setAvailableCards] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Fetch user's cards
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

    const fetchAvailableCards = async () => {
      try {
        // Fetch available pre-existing cards
        const response = await axios.get('http://127.0.0.1:8000/api/pre_existing_cards/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailableCards(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch available cards');
      }
    };

    fetchCards();
    fetchAvailableCards();
  }, [user.id, token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Update user profile
      const response = await axios.put(`http://127.0.0.1:8000/api/update_profile/${user.id}/`, {
        username,
        email,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setSuccess('Profile updated successfully');
    } catch (error) {
      console.error(error);
      setError('Failed to update profile');
    }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Add new card to user's account
      const response = await axios.post('http://127.0.0.1:8000/api/add_card/', {
        user_id: user.id,
        card_id: cardId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCards([...cards, response.data]);
      setSuccess('Card added successfully');
    } catch (error) {
      console.error(error);
      setError('Failed to add card');
    }
  };

  const handleDeleteCard = async (cardId) => {
    setError('');
    setSuccess('');
    try {
      // Delete card from user's account
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
      <form onSubmit={handleUpdateProfile} className={classes.form}>
        <TextField
          label="Username"
          variant="outlined"
          className={classes.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          className={classes.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Update Profile
        </Button>
      </form>
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
            {availableCards.map((card) => (
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
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Typography variant="h5" gutterBottom>My Cards</Typography>
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
