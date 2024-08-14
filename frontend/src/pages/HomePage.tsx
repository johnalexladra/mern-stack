import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const { token, logout } = useAuth();

  return (
    <div className="container mt-4">
      <h1>Homepage</h1>
      <p>Welcome to the homepage!</p>
      {token ? (
        <Button variant="dark" onClick={logout}>Sign Out</Button>
      ) : (
        <>
          <Link to="/signin" className="btn btn-primary">Login</Link>
          <Link to="/signup" className="btn btn-secondary ms-2">Register</Link>
        </>
      )}
    </div>
  );
};

export default HomePage;
