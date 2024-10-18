import React from 'react';
import { X } from 'lucide-react';
import styles from './FormField.module.css';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function FormField({ label, type, value, onChange, error, onRemove, showRemoveButton, placeholder }) {
  const id = `${label.toLowerCase().replace(/\s+/g, '-')}-input`;

  return (
    <div>
      <label htmlFor={id} className={styles.label}>{label}:</label>
      <div className={styles.inputContainer}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={styles.input}
          placeholder={placeholder}
        />
        {showRemoveButton && (
          <Button
            type="button"
            variant="icon"
            onClick={onRemove}
            className={styles.removeButton}
          >
            <X size={20} />
          </Button>
        )}
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default FormField;
