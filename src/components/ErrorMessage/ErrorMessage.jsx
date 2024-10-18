import React from 'react';
import styles from './ErrorMessage.module.css';
import { AlertCircle } from 'lucide-react';

function ErrorMessage({ message }) {
  return (
    <div className={styles.errorContainer}>
      <AlertCircle className={styles.icon} size={20} />
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
