// import React from 'react';
// import { AppBar, Toolbar, Typography, Button } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
//   link: {
//     color: 'inherit',
//     textDecoration: 'none',
//   },
// }));

// const Navbar = () => {
//   const classes = useStyles();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   const isAuthenticated = !!localStorage.getItem('token');

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" className={classes.title}>
//           Credit Card Recommender
//         </Typography>
//         <Button color="inherit">
//           <Link to="/" className={classes.link}>Home</Link>
//         </Button>
//         {!isAuthenticated ? (
//           <>
//             <Button color="inherit">
//               <Link to="/register" className={classes.link}>Register</Link>
//             </Button>
//             <Button color="inherit">
//               <Link to="/login" className={classes.link}>Login</Link>
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button color="inherit">
//               <Link to="/add-card" className={classes.link}>Add Card</Link>
//             </Button>
//             <Button color="inherit">
//               <Link to="/recommend-card" className={classes.link}>Recommend Card</Link>
//             </Button>
//             <Button color="inherit" onClick={handleLogout}>Logout</Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // Logout function to clear user data and navigate to the login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Check if the user is authenticated by verifying the presence of the token
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Credit Card Recommender
        </Typography>
        <Button color="inherit">
          <Link to="/" className={classes.link}>Home</Link>
        </Button>
        {!isAuthenticated ? (
          // Links displayed for non-authenticated users
          <>
            <Button color="inherit">
              <Link to="/register" className={classes.link}>Register</Link>
            </Button>
            <Button color="inherit">
              <Link to="/login" className={classes.link}>Login</Link>
            </Button>
          </>
        ) : (
          // Links displayed for authenticated users
          <>
            <Button color="inherit">
              <Link to="/add-card" className={classes.link}>Add Card</Link>
            </Button>
            <Button color="inherit">
              <Link to="/recommend-card" className={classes.link}>Recommend Card</Link>
            </Button>
            <Button color="inherit">
              <Link to="/profile" className={classes.link}>Profile</Link>
            </Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
