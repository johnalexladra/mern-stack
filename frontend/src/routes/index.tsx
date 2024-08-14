import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/error/NotFoundPage';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import authRoutes from './AuthRoutes';
import profileRoutes from './ProfileRoutes';
import CardListPage from '../pages/CardListPage';

// Create a component to wrap routes with AuthLayout
const AuthRoutesWrapper: React.FC = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

// Create a component to wrap routes with MainLayout
const MainRoutesWrapper: React.FC = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainRoutesWrapper />}>
        <Route index element={<HomePage />} />
        <Route path="/cards" element={<CardListPage />} />
        {profileRoutes}
        {/* Handle other routes under MainLayout */}
      </Route>

      <Route element={<AuthRoutesWrapper />}>
        {authRoutes}
        {/* Handle routes under AuthLayout */}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
