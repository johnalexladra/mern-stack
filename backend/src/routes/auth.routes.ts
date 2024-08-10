import { Router } from 'express';
import { signup, signin, signout } from '../controllers/auth.controller';
import { validateRegistration, validateLogin } from '../validators/auth.validator';

const router = Router();

router.post('/signup', validateRegistration, signup);
router.post('/signin', validateLogin, signin);
router.post('/signout', signout);

export default router;
