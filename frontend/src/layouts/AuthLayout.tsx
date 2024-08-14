import React from 'react';
import { Container } from 'react-bootstrap';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        {children}
      </div>
    </Container>
  );
};

export default AuthLayout;
