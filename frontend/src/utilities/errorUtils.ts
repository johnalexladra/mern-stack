/**
 * Extracts a human-readable error message from an error object.
 * Handles various possible error structures to provide a meaningful message.
 *
 * @param error - The error object, which could be an instance of `Error`, an object with a `response` property, or any other type.
 * @returns A string containing a descriptive error message.
 *
 * @example
 * ```typescript
 * try {
 *   // some code that may throw an error
 * } catch (error) {
 *   const errorMessage = extractErrorMessage(error);
 *   console.error(errorMessage);
 * }
 * ```
 */
export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // If the error is a standard Error object, return its message.
    return error.message;
  }
  
  if (typeof error === 'object' && error !== null) {
    // If the error is an object with a `response` property, attempt to extract the message from `response.data`.
    const err = error as { response?: { data?: string } };
    return err.response?.data ?? 'An unexpected error occurred';
  }

  // For all other types or if the error is not an object, return a generic error message.
  return 'An unexpected error occurred';
}
