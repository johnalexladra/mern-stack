import React, { ReactNode } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/auth/authSlice';

// Define the type for the props
interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const APP_NAME = import.meta.env.VITE_APP_NAME || 'App Name';
    // const { token, logout } = useAuth();

    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand as={Link} to="/">{APP_NAME}</Navbar.Brand>
                <Nav className="mr-auto">
                    {user ? (
                        <>
                            <Nav.Link as={Link} to="/cards">Card List</Nav.Link>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            {/* <Button variant="outline-light" onClick={logout}>Sign Out</Button> */}
                            <Button variant="outline-light" onClick={() => dispatch(logout())}>Sign Out</Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar>
            <Container className="mt-4">
                {children}
            </Container>
        </div>
    );
};

export default MainLayout;
