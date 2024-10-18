import { useState } from 'react';
import { validateGuest } from '../utils/validation';
import { getGuests } from '../utils/storage';

export const useGuestForm = (initialGuest = {}, onSubmit) => {
  const [names, setNames] = useState(initialGuest.names || ['']);
  const [phone, setPhone] = useState(initialGuest.phone || '');
  const [emails, setEmails] = useState(initialGuest.emails || ['']);
  const [errors, setErrors] = useState({});

  const addName = () => {
    setNames(['', ...names]);
  };

  const removeName = (index) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const addEmail = () => {
    setEmails(['', ...emails]);
  };

  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const guestData = {
      names: names.filter(name => name.trim() !== ''),
      phone,
      emails: emails.filter(email => email.trim() !== ''),
    };

    const validationErrors = validateGuest(guestData, getGuests(), initialGuest.phone);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(guestData);
  };

  return {
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
  };
};
