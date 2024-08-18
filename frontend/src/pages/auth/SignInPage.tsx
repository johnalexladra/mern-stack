import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { loginRequest, loginSuccess, loginFailure } from '../../redux/authSlice';
// import { login as reduxLogin } from '../../redux/authSlice';
// import useAuth from '../../hooks/useAuth';  // Import the custom hook
// import { signIn } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/slices/auth/authSlice';

const LoginPage: React.FC = () => {
  // const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);
  // const { login } = useAuth();

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(loginRequest());
  //   try {
  //     const { token } = await signIn(username, password);
  //     // dispatch(reduxLogin({ username, token }));
  //     login(username, token);
  //     dispatch(loginSuccess({ username }));
  //     navigate('/');
  //   } catch (err) {
  //     // setError('Invalid credentials');
  //     dispatch(loginFailure('Invalid credentials'));
  //     console.error(err);
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const credentials = { email, password };
    try {
      // Attempt to login with the provided credentials
      await dispatch(loginUser(credentials)).unwrap();
      // On successful login, navigate to the profile page
      navigate('/profile');
    } catch (err) {
      // Handle login error, e.g., display an error message
      console.log('Login error:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {/* {status === 'failed' && <p>Error: {error}</p>} */}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      <div className="mt-3">
        <p>
          Don't have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
