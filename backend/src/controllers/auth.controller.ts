import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../models/auth.model';
import { hashPassword, comparePassword, generateToken } from '../utilities/auth';

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

  const token = generateToken(user.username);
  res.status(200).json({ token });
};

export const signout = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Signed out successfully' });
};