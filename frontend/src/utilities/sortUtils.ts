/**
 * Sorts an array of objects by a specified key.
 * @param {Array} array - The array to sort.
 * @param {string} key - The key to sort by.
 * @param {boolean} [ascending=true] - Whether to sort in ascending order.
 * @returns {Array} - The sorted array.
 */
export const sortByKey = <T extends Record<string, unknown>>(
  array: T[],
  key: keyof T,
  ascending: boolean = true
): T[] => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
};

/**
* Sorts an array of objects by date fields.
* @param {Array} array - The array to sort.
* @param {string} dateKey - The key that contains the date field.
* @param {boolean} [ascending=true] - Whether to sort in ascending order.
* @returns {Array} - The sorted array.
*/
export const sortByDate = <T extends Record<string, unknown>>(
  array: T[],
  dateKey: keyof T,
  ascending: boolean = true
): T[] => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateKey] as unknown as string);
    const dateB = new Date(b[dateKey] as unknown as string);
    return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });
};
