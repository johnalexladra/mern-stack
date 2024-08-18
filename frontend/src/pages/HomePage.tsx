import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import useAuth from '../hooks/useAuth';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/auth/authSlice';

const HomePage: React.FC = () => {
  // const { token, logout } = useAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="container mt-4">
      <h1>Homepage</h1>
      <p>Welcome to the homepage!</p>
      {user ? (
        <Button variant="dark" onClick={() => dispatch(logout())}>Sign Out</Button>
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
