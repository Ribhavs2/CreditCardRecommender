// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { TextField, Button, Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// // import { makeStyles } from '@mui/styles';

// // const useStyles = makeStyles((theme) => ({
// //   form: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //   },
// //   input: {
// //     margin: theme.spacing(2),
// //     width: '300px',
// //   },
// //   button: {
// //     margin: theme.spacing(2),
// //   },
// //   select: {
// //     margin: theme.spacing(2),
// //     width: '300px',
// //   },
// // }));

// // const RecommendCard = () => {
// //   const classes = useStyles();
// //   const [category, setCategory] = useState('');
// //   const [amount, setAmount] = useState('');
// //   const [priority, setPriority] = useState('max_points');
// //   const [recommendation, setRecommendation] = useState(null);
// //   const user = JSON.parse(localStorage.getItem('user'));

// //   const handleRecommendCard = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://127.0.0.1:8000/api/recommend_card/', {
// //         user_id: user.id,
// //         category,
// //         amount,
// //         priority,
// //       });
// //       setRecommendation(response.data);
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <Container>
// //       <Typography variant="h4" gutterBottom>Recommend Card</Typography>
// //       <form onSubmit={handleRecommendCard} className={classes.form}>
// //         <TextField
// //           label="Category"
// //           variant="outlined"
// //           className={classes.input}
// //           value={category}
// //           onChange={(e) => setCategory(e.target.value)}
// //           required
// //         />
// //         <TextField
// //           label="Amount"
// //           variant="outlined"
// //           type="number"
// //           className={classes.input}
// //           value={amount}
// //           onChange={(e) => setAmount(e.target.value)}
// //           required
// //         />
// //         <FormControl variant="outlined" className={classes.select}>
// //           <InputLabel>Priority</InputLabel>
// //           <Select
// //             value={priority}
// //             onChange={(e) => setPriority(e.target.value)}
// //             label="Priority"
// //             required
// //           >
// //             <MenuItem value="max_points">Maximize Points</MenuItem>
// //             <MenuItem value="max_value">Maximize Value</MenuItem>
// //           </Select>
// //         </FormControl>
// //         <Button
// //           type="submit"
// //           variant="contained"
// //           color="primary"
// //           className={classes.button}
// //         >
// //           Recommend Card
// //         </Button>
// //         {recommendation && (
// //           <Container>
// //             <Typography variant="h5" gutterBottom>Recommended Card</Typography>
// //             <Typography variant="body1">Card Name: {recommendation.card_name}</Typography>
// //             <Typography variant="body1">Points/Value: {recommendation.points}</Typography>
// //           </Container>
// //         )}
// //       </form>
// //     </Container>
// //   );
// // };

// // export default RecommendCard;

// import React, { useState } from 'react';
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
//     margin: theme.spacing(2),
//     width: '300px',
//   },
//   button: {
//     margin: theme.spacing(2),
//   },
//   select: {
//     margin: theme.spacing(2),
//     width: '300px',
//   },
// }));

// const RecommendCard = () => {
//   const classes = useStyles();
//   const [category, setCategory] = useState('');
//   const [amount, setAmount] = useState('');
//   const [priority, setPriority] = useState('max_points');
//   const [recommendation, setRecommendation] = useState(null);
//   const [error, setError] = useState('');
//   const user = JSON.parse(localStorage.getItem('user'));
//   const token = localStorage.getItem('token');

//   const handleRecommendCard = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/recommend_card/', {
//         user_id: user.id,
//         category,
//         amount: parseFloat(amount), // Ensure amount is sent as a number
//         priority,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setRecommendation(response.data);
//       setError('');
//     } catch (error) {
//       console.error(error);
//       setError('Failed to get recommendation');
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Recommend Card</Typography>
//       <form onSubmit={handleRecommendCard} className={classes.form}>
//         <TextField
//           label="Category"
//           variant="outlined"
//           className={classes.input}
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />
//         <TextField
//           label="Amount"
//           variant="outlined"
//           type="number"
//           className={classes.input}
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           required
//         />
//         <FormControl variant="outlined" className={classes.select}>
//           <InputLabel>Priority</InputLabel>
//           <Select
//             value={priority}
//             onChange={(e) => setPriority(e.target.value)}
//             label="Priority"
//             required
//           >
//             <MenuItem value="max_points">Maximize Points</MenuItem>
//             <MenuItem value="max_value">Maximize Value</MenuItem>
//           </Select>
//         </FormControl>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           className={classes.button}
//         >
//           Recommend Card
//         </Button>
//         {error && <Typography color="error">{error}</Typography>}
//         {recommendation && (
//           <Container>
//             <Typography variant="h5" gutterBottom>Recommended Card</Typography>
//             <Typography variant="body1">Card Name: {recommendation.card_name}</Typography>
//             <Typography variant="body1">Points/Value: {recommendation.points}</Typography>
//           </Container>
//         )}
//       </form>
//     </Container>
//   );
// };

// export default RecommendCard;
import React, { useState } from 'react';
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

const RecommendCard = () => {
  const classes = useStyles();
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [priority, setPriority] = useState('max_points');
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const handleRecommendCard = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/recommend_card/', {
        user_id: user.id,
        category,
        amount: parseFloat(amount), // Ensure amount is sent as a number
        priority,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecommendation(response.data);
      setSuccess('Recommendation received successfully');
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to get recommendation');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Recommend Card</Typography>
      <form onSubmit={handleRecommendCard} className={classes.form}>
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
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
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
