import { useState, useCallback } from 'react';
import { sortByKey, sortByDate } from '../utilities/sortUtils';

// Define the type for the sorting function parameter
type SortKey = string;

// Define a generic type for the data array
type SortableItem = Record<string, unknown>;

// Define the type for the return value of the hook
interface UseSortResult<T> {
    data: T[];
    sortKey: SortKey | null;
    ascending: boolean;
    handleSort: (key: SortKey) => void;
}

/**
 * Custom hook to handle sorting of data.
 * @param {Array} initialData - The initial data to sort.
 * @returns {Object} - The sorted data, sort key, and sorting function.
 */
export const useSort = <T extends SortableItem>(initialData: T[]): UseSortResult<T> => {
    const [data, setData] = useState<T[]>(initialData);
    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [ascending, setAscending] = useState<boolean>(true);

    const handleSort = useCallback((key: SortKey) => {
        let sorted: T[];
        if (key.toLowerCase().includes('date')) {
            sorted = sortByDate(data, key, ascending);
        } else {
            sorted = sortByKey(data, key, ascending);
        }
        setData(sorted);
        setSortKey(key);
        setAscending(!ascending);
    }, [data, ascending]);

    return { data, sortKey, ascending, handleSort };
};
