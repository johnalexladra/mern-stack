/**
 * Formats a date string into a readable format.
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.toLocaleDateString(undefined, options);
};
