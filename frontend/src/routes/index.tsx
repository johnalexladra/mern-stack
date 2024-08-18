import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/error/NotFoundPage';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import authRoutes from './AuthRoutes';
// import profileRoutes from './ProfileRoutes';
import CardListPage from '../pages/CardListPage';
import ProtectedRoute from './ProtectedRoute';
import ProfilePage from '../pages/ProfilePage';

// Wrapper components for layouts
const AuthRoutesWrapper: React.FC = () => (
  <AuthLayout>
    <Outlet />
  </AuthLayout>
);

const MainRoutesWrapper: React.FC = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const AppRoutes: React.FC = () => (
  <Routes>
    <Route element={<MainRoutesWrapper />}>
      <Route index element={<HomePage />} />
      <Route path="/cards" element={<ProtectedRoute element={<CardListPage />} />} />
      <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
      {/* {profileRoutes} */} {/* You can use this instead */}
      {/* Handle other routes under MainLayout */}
    </Route>

    <Route element={<AuthRoutesWrapper />}>
      {authRoutes}
      {/* Handle routes under AuthLayout */}
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
