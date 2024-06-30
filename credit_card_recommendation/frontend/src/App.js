// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import AddCard from './components/AddCard';
// import RecommendCard from './components/RecommendCard';
// import Navbar from './components/Navbar';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<h1>Welcome to Credit Card Recommendation System</h1>} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/add-card" element={<AddCard />} />
//           <Route path="/recommend-card" element={<RecommendCard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddCard from './components/AddCard';
import RecommendCard from './components/RecommendCard';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<h1>Welcome to Credit Card Recommendation System</h1>} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/add-card" element={<PrivateRoute><AddCard /></PrivateRoute>} />
//           <Route path="/recommend-card" element={<PrivateRoute><RecommendCard /></PrivateRoute>} />
//           <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<h1>Welcome to Credit Card Recommendation System</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-card" element={<PrivateRoute><AddCard /></PrivateRoute>} />
          <Route path="/recommend-card" element={<PrivateRoute><RecommendCard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;