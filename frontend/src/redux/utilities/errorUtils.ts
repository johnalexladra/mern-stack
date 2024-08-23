import { AuthError } from "../slices/auth/authTypes";

export function extractErrorMessage(error: unknown): AuthError {
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: 'An unknown error occurred' };
}