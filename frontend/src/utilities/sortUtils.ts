/**
 * Sorts an array of objects by a specified key.
 * 
 * @param {Array<T>} array - The array to sort. It should be an array of objects where each object has the specified key.
 * @param {keyof T} key - The key to sort by. This should be a key that exists on the objects in the array.
 * @param {boolean} [ascending=true] - Whether to sort in ascending order. Defaults to `true`.
 * @returns {Array<T>} - The sorted array.
 * 
 * @example
 * // Example with numbers
 * const items = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 }];
 * const sortedItems = sortByKey(items, 'age');
 * console.log(sortedItems); 
 * // Output: [{ name: 'Bob', age: 25 }, { name: 'Alice', age: 30 }, { name: 'Charlie', age: 35 }]
 * 
 * @example
 * // Example with strings
 * const items = [{ name: 'Charlie' }, { name: 'Alice' }, { name: 'Bob' }];
 * const sortedItems = sortByKey(items, 'name', false);
 * console.log(sortedItems);
 * // Output: [{ name: 'Charlie' }, { name: 'Bob' }, { name: 'Alice' }]
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
 * 
 * @param {Array<T>} array - The array to sort. It should be an array of objects where each object has the specified date field.
 * @param {keyof T} dateKey - The key that contains the date field. The value of this key should be a valid date string.
 * @param {boolean} [ascending=true] - Whether to sort in ascending order. Defaults to `true`.
 * @returns {Array<T>} - The sorted array.
 * 
 * @example
 * // Example with date strings
 * const items = [{ name: 'Event A', date: '2024-08-23' }, { name: 'Event B', date: '2023-12-15' }, { name: 'Event C', date: '2024-01-10' }];
 * const sortedItems = sortByDate(items, 'date');
 * console.log(sortedItems);
 * // Output: [{ name: 'Event B', date: '2023-12-15' }, { name: 'Event C', date: '2024-01-10' }, { name: 'Event A', date: '2024-08-23' }]
 * 
 * @example
 * // Example with invalid date strings
 * const items = [{ name: 'Event A', date: 'invalid-date' }, { name: 'Event B', date: '2023-12-15' }];
 * const sortedItems = sortByDate(items, 'date', false);
 * console.log(sortedItems);
 * // Output: [{ name: 'Event B', date: '2023-12-15' }, { name: 'Event A', date: 'invalid-date' }]
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
