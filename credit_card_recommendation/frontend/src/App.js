import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddCard from './components/AddCard';
import RecommendCard from './components/RecommendCard';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/add-card">Add Card</Link></li>
            <li><Link to="/recommend-card">Recommend Card</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to Credit Card Recommendation System</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-card" element={<AddCard />} />
          <Route path="/recommend-card" element={<RecommendCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
