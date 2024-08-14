import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as reduxLogin } from '../../redux/authSlice';
import useAuth from '../../hooks/useAuth';  // Import the custom hook
import { signIn } from '../../api/api';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await signIn(username, password);
      dispatch(reduxLogin({ username, token }));
      login(username, token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <Button variant="primary" type="submit">
          Login
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
