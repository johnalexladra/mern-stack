// import React from 'react';
import { Route } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from './ProtectedRoute';

const profileRoutes = (
  <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
);

export default profileRoutes;
