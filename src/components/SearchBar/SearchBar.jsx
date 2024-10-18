import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search guests..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.input}
        aria-label="Search guests"
      />
      <Search className={styles.icon} size={20} />
    </div>
  );
}

export default SearchBar;
