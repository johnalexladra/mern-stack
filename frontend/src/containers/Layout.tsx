import React, { ReactNode } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Define the type for the props
interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const APP_NAME = import.meta.env.VITE_APP_NAME || 'App Name';
    const { token, logout } = useAuth();

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to="/">{APP_NAME}</Navbar.Brand>
                <Nav className="mr-auto">
                    {token ? (
                        <>
                            <Nav.Link as={Link} to="/cards">Card List</Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            <Button variant="outline-light" onClick={logout}>Sign Out</Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar>
            <Container>
                {children}
            </Container>
        </div>
    );
};

export default Layout;
