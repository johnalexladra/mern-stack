import React from 'react';
import { Container } from 'react-bootstrap';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container className="mt-4">
      {children}
    </Container>
  );
};

export default MainLayout;
