// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Typography, CircularProgress, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   container: {
//     marginTop: theme.spacing(4),
//   },
//   card: {
//     marginBottom: theme.spacing(2),
//   },
//   cardContent: {
//     paddingBottom: `${theme.spacing(2)}px !important`,
//   },
//   title: {
//     marginBottom: theme.spacing(2),
//   },
//   listItem: {
//     paddingTop: 0,
//     paddingBottom: 0,
//   },
//   categoryTitle: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
// }));

// const UserProfile = () => {
//   const classes = useStyles();
//   const [cards, setCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const user = JSON.parse(localStorage.getItem('user'));
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
//         alert('Error', 'Failed to fetch cards');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCards();
//   }, [user.id, token]);

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Container className={classes.container}>
//       <Typography variant="h4" className={classes.title}>User Profile</Typography>
//       {cards.length > 0 ? cards.map((card) => (
//         <Card key={card.id} className={classes.card}>
//           <CardContent className={classes.cardContent}>
//             <Typography variant="h6">{card.card_name || "Card name is missing"}</Typography>
//             <Typography>Value per Point: {card.value_per_point}</Typography>
//             <Divider className={classes.categoryTitle} />
//             <Typography variant="subtitle1">Categories:</Typography>
//             <List>
//               {card.categories.map((category, index) => (
//                 <ListItem key={index} className={classes.listItem}>
//                   <ListItemText
//                     primary={`Category: ${category.category_name}`}
//                     secondary={`Points per Dollar: ${category.points_per_dollar}`}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </CardContent>
//         </Card>
//       )) : (
//         <Typography>No cards found.</Typography>
//       )}
//     </Container>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress, Card, CardContent, List, ListItem, ListItemText, Divider, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    paddingBottom: `${theme.spacing(2)}px !important`,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  categoryTitle: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user_cards/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCards(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch cards');
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [token]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>User Profile</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {cards.length > 0 ? cards.map((card) => (
        <Card key={card.id} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6">{card.card_name || "Card name is missing"}</Typography>
            <Typography>Value per Point: {card.value_per_point}</Typography>
            <Divider className={classes.categoryTitle} />
            <Typography variant="subtitle1">Categories:</Typography>
            <List>
              {card.categories.map((category, index) => (
                <ListItem key={index} className={classes.listItem}>
                  <ListItemText
                    primary={`Category: ${category.category_name}`}
                    secondary={`Points per Dollar: ${category.points_per_dollar}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )) : (
        <Typography>No cards found.</Typography>
      )}
    </Container>
  );
};

export default UserProfile;
