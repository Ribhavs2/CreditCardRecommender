// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Typography, Grid, Paper, Button, Alert } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

// const Dashboard = () => {
//   const classes = useStyles();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
//   const [cards, setCards] = useState([]);
//   const [error, setError] = useState('');
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

//   return (
//     <Container className={classes.container}>
//       <Typography variant="h4" gutterBottom>Dashboard</Typography>
//       {error && <Alert severity="error">{error}</Alert>}
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6}>
//           <Paper className={classes.paper}>
//             <Typography variant="h6">Welcome, {user.username}!</Typography>
//             <Typography variant="body1">Email: {user.email}</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper className={classes.paper}>
//             <Typography variant="h6">Your Cards</Typography>
//             <Typography variant="body1">You have {cards.length} card(s).</Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               className={classes.button}
//               href="/add-card"
//             >
//               Add New Card
//             </Button>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Paper, Button, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [cards, setCards] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user_cards/`, {
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
  }, [token]);

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Welcome, {user.username}!</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Your Cards</Typography>
            <Typography variant="body1">You have {cards.length} card(s).</Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="/add-card"
            >
              Add New Card
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
