// src/routes/index.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/error/NotFoundPage';
import Layout from '../containers/Layout';
import authRoutes from './authRoutes';
import profileRoutes from './profileRoutes';
import CardListPage from '../pages/CardListPage';

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cards" element={<CardListPage />} />
        {authRoutes}
        {profileRoutes}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
