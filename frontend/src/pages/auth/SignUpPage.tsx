import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../api/api';
import { Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(username, password);
      navigate('/signin');
    } catch (err) {
      setError('Registration failed');
      console.log(err);
    }
  };

  return (
    <Container className="mt-4">
      <h1>Register</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <div className="mt-3">
        <p>
          Already have an account? <Link to="/signin">Log in here</Link>
        </p>
      </div>
    </Container>
  );
};

export default SignUpPage;
