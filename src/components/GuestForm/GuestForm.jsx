import React from 'react';
import { useGuestForm } from '../../hooks/useGuestForm';
import FormField from '../FormField/FormField';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Plus } from 'lucide-react';
import styles from './GuestForm.module.css';

function GuestForm({ onSubmit, initialGuest = {}, isEditing = false, onCancel }) {
  const {
    names,
    setNames,
    phone,
    setPhone,
    emails,
    setEmails,
    errors,
    handleSubmit,
    addName,
    removeName,
    addEmail,
    removeEmail,
  } = useGuestForm(initialGuest, onSubmit);

  return (
    <form id="guestForm" onSubmit={handleSubmit} className={styles.form}>
      {names.map((name, index) => (
        <FormField
          key={index}
          label={isEditing ? `Name ${index + 1}` : "Name"}
          type="text"
          value={name}
          onChange={(e) => {
            const newNames = [...names];
            newNames[index] = e.target.value;
            setNames(newNames);
          }}
          error={errors.name}
          onRemove={() => removeName(index)}
          showRemoveButton={isEditing && names.length > 1}
          placeholder="Enter guest name"
        />
      ))}
      {isEditing && (
        <Button
          onClick={addName}
          variant="secondary"
          className={styles.addButton}
          aria-label="Add another name"
        >
          <Plus size={16} />
          Add name
        </Button>
      )}
      <FormField
        label="Phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={errors.phone}
        placeholder="Enter phone number (e.g., +1234567890)"
      />
      {emails.map((email, index) => (
        <FormField
          key={index}
          label={isEditing ? `Email ${index + 1}` : "Email"}
          type="email"
          value={email}
          onChange={(e) => {
            const newEmails = [...emails];
            newEmails[index] = e.target.value;
            setEmails(newEmails);
          }}
          error={errors.email}
          onRemove={() => removeEmail(index)}
          showRemoveButton={isEditing && emails.length > 1}
          placeholder="Enter email address"
        />
      ))}
      {isEditing && (
        <Button
          onClick={addEmail}
          variant="secondary"
          className={styles.addButton}
          aria-label="Add another email"
        >
          <Plus size={16} />
          Add email
        </Button>
      )}
      {errors.contact && <ErrorMessage message={errors.contact} />}
      <div className={styles.buttonContainer}>
        <Button type="submit" variant="primary" className={styles.button}>
          {isEditing ? 'Update Guest' : 'Add Guest'}
        </Button>
        <Button onClick={onCancel} variant="secondary" className={styles.button} aria-label="Cancel">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default GuestForm;
