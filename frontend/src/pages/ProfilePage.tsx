// src/pages/ProfilePage.tsx

import React from 'react';
import useAuth from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
    const { username, token } = useAuth();

    // Optionally check if token is valid or if username exists
    if (!token || !username) {
        return <div>Loading...</div>; // Show a loading state or redirect to login
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Token:</strong> {token}</p>
            {/* Add more profile details as needed */}
        </div>
    );
};

export default ProfilePage;
