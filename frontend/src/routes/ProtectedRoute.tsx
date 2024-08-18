import React from 'react';
import { Navigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

// Define the type for the props
interface ProtectedRouteProps {
    // element: React.ReactNode; // [2] JSX.Element
    element: React.ReactElement; // JSX.Element is an alias for React.ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  // const { token } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
