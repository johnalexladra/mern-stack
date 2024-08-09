import { Request } from 'express';

interface IUser {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
}

export interface IAuthRequest extends Request {
  user?: IUser;
}