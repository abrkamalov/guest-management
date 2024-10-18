import React from 'react';
import styles from './GuestDetail.module.css';

function GuestDetail({ guest: { phone, names, emails } }) {
  return (
    <>
      <h1 className={styles.title}>Guest Details</h1>
      <p><strong>Phone:</strong> {phone}</p>
      <p className={styles.fieldTitle}>Names:</p>
      <ul className={styles.list}>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <p className={styles.fieldTitle}>Emails:</p>
      <ul className={styles.list}>
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </>
  );
}

export default GuestDetail;
