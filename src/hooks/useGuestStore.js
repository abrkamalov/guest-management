import { useState, useEffect } from 'react';
import { getGuests, saveGuests } from '../utils/storage';

export const useGuestStore = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    setGuests(getGuests());
  }, []);

  const updateGuests = (newGuests) => {
    saveGuests(newGuests);
    setGuests(newGuests);
  };

  return [guests, updateGuests];
};
