import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Define the type for the props
interface ProtectedRouteProps {
    element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { token } = useAuth();
    return token ? <>{element}</> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
