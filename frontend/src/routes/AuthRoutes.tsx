// src/routes/authRoutes.tsx

import React from 'react';
import { Route } from 'react-router-dom';
import SignInPage from '../pages/auth/SignInPage';
import SignUpPage from '../pages/auth/SignUpPage';

const authRoutes = (
  <>
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/signup" element={<SignUpPage />} />
  </>
);

export default authRoutes;
