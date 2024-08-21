import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'your_access_token_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_token_secret';
const JWT_ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '1h';
const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '1h';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

// Deprecate soon...
export const generateToken = (username: string) => {
  return jwt.sign({ username }, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
};

export const generateAccessToken = (user: { username: string }) => {
  return jwt.sign(user, JWT_ACCESS_SECRET, { expiresIn: JWT_ACCESS_EXPIRATION });
};

export const generateRefreshToken = (user: { username: string }) => {
  return jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET) as { username: string };
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_REFRESH_SECRET, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};
