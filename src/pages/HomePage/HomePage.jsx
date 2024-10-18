import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import GuestList from '../../components/GuestList/GuestList';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useGuestStore } from '../../hooks/useGuestStore';
import { useSearch } from '../../hooks/useSearch';
import Button from '../../components/Button/Button';
import styles from './HomePage.module.css';
import { ROUTES } from '../../utils/constants';

function HomePage() {
  const [guests, setGuests] = useGuestStore();
  const { searchTerm, filteredGuests, handleSearchChange } = useSearch(guests);
  const navigate = useNavigate();

  const handleAddNewGuest = () => {
    navigate(ROUTES.ADD_GUEST);
  };

  const handleRemoveGuest = (idToRemove) => {
    const updatedGuests = guests.filter(guest => guest.id !== idToRemove);
    setGuests(updatedGuests);
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Guest List</h1>
        <Button 
          onClick={handleAddNewGuest} 
          className={styles.addButton}
          aria-label="Add new guest"
        >
          <Plus size={18} />
          Add New Guest
        </Button>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <div className={styles.guestListContainer}>
        <GuestList guests={filteredGuests} onRemoveGuest={handleRemoveGuest} />
      </div>
    </div>
  );
}

export default HomePage;
