import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1>Homepage</h1>
      <p>Welcome to the homepage!</p>
      <Link to="/login" className="btn btn-primary">Login</Link>
      <Link to="/register" className="btn btn-secondary ms-2">Register</Link>
    </div>
  );
};

export default HomePage;
