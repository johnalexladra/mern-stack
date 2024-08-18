import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
// import useAuth from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
    // const { token } = useAuth();
    const { user } = useSelector((state: RootState) => state.auth); 
    // Optionally check if token is valid or if username exists
    if (!user) {
        return <div>Loading...</div>; // Show a loading state or redirect to login
    }

    return (
        <div>
            <h1>Profile Page</h1>
            {/* <p><strong>Username:</strong> {username}</p> */}
            <p><strong>Token:</strong> {user.token}</p>
            {/* Add more profile details as needed */}
        </div>
    );
};

export default ProfilePage;
