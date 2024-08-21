import { Request, Response } from 'express';
import { createUser, findUserByEmail, findUserByUsername } from '../models/auth.model';
import { 
  hashPassword, 
  comparePassword, 
  generateAccessToken, 
  generateRefreshToken, 
  verifyRefreshToken
} from '../utilities/auth';

export const signup = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await hashPassword(password);
  await createUser(email, username, hashedPassword);
  res.status(201).json({ message: 'User registered successfully' });
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await findUserByEmail(email);
  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // const token = generateToken(user.username);
  // res.status(200).json({ token });

  const accessToken = generateAccessToken({ username: user.username });
  const refreshToken = generateRefreshToken(user);
  
  res.status(200).json({ accessToken, refreshToken });
};

export const signout = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Signed out successfully' });
};

export const refreshtoken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const user = await verifyRefreshToken(token);
    const accessToken = generateAccessToken(user as { username: string });

    res.json({ accessToken });
  } catch {
    res.sendStatus(403);
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    // TODO: create the profile model and fetch the profile data
    res.json(null);
  } catch {
    res.sendStatus(403);
  }
};