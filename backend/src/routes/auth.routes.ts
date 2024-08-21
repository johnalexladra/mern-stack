import { Router } from 'express';
import { signup, signin, signout, refreshtoken, profile } from '../controllers/auth.controller';
import { validateRegistration, validateLogin } from '../validators/auth.validator';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Public route
router.post('/signup', validateRegistration, signup);
router.post('/signin', validateLogin, signin);
router.post('/signout', signout);

// Protected route
router.get('/profile', authenticateToken, profile);

// Refresh token route
router.post('/refresh-token', refreshtoken);

export default router;
