import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { useGuestStore } from './useGuestStore';

export function useGuestDetail(id) {
  const navigate = useNavigate();
  const [guests, setGuests] = useGuestStore();
  const [guest, setGuest] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const foundGuest = guests.find((g) => g.id === id);
    if (foundGuest) {
      setGuest(foundGuest);
      setError('');
    } else {
      setGuest(null);
      setError('Guest not found.');
    }
  }, [id, guests]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => navigate(ROUTES.HOME), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  const handleUpdateGuest = (updatedData) => {
    const updatedGuests = guests.map((g) => g.id === id ? { ...g, ...updatedData } : g);
    setGuests(updatedGuests);
    setGuest({ ...guest, ...updatedData });
    setIsEditing(false);
  };

  return { guest, error, isEditing, setIsEditing, handleUpdateGuest };
}
