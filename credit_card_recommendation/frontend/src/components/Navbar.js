import React from 'react';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

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

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Credit Card Recommender
        </Typography>
        <Button color="inherit">
          <Link to="/" className={classes.link}>Home</Link>
        </Button>
        <Button color="inherit">
          <Link to="/register" className={classes.link}>Register</Link>
        </Button>
        <Button color="inherit">
          <Link to="/login" className={classes.link}>Login</Link>
        </Button>
        <Button color="inherit">
          <Link to="/add-card" className={classes.link}>Add Card</Link>
        </Button>
        <Button color="inherit">
          <Link to="/recommend-card" className={classes.link}>Recommend Card</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
