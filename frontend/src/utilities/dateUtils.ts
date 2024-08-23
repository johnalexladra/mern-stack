/**
 * Formats a date string into a readable format.
 * 
 * @param {string} dateString - The date string to format. It should be a valid date string recognized by the `Date` constructor.
 * @returns {string} - The formatted date string in "Month Day, Year" format. If the date string is invalid, it returns the original string.
 * 
 * @example
 * // Example with a valid date string
 * const formattedDate1 = formatDate('2024-08-23');
 * console.log(formattedDate1); // Output: "Aug 23, 2024" (or similar, depending on locale)
 * 
 * @example
 * // Example with an invalid date string
 * const formattedDate2 = formatDate('invalid-date');
 * console.log(formattedDate2); // Output: "invalid-date"
 * 
 * @example
 * // Example with a different date format
 * const formattedDate3 = formatDate('2024/08/23');
 * console.log(formattedDate3); // Output: "Aug 23, 2024" (or similar, depending on locale)
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? dateString : date.toLocaleDateString(undefined, options);
};
