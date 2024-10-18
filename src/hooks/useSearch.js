import { useState, useCallback } from 'react';
import { filterGuests } from '../utils/guest';

export function useSearch(guests) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredGuests = filterGuests(guests, searchTerm);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  return { searchTerm, filteredGuests, handleSearchChange };
}

