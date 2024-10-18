import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { useGuestDetail } from '../../hooks/useGuestDetail';
import GuestForm from '../../components/GuestForm/GuestForm';
import GuestDetail from '../../components/GuestDetail/GuestDetail';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { findMatchingPhoneGuest, mergeGuest } from '../../utils/guest';
import { useGuestStore } from '../../hooks/useGuestStore';
import styles from './GuestDetailPage.module.css';

function GuestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guests, setGuests] = useGuestStore();
  const { guest, error, isEditing, setIsEditing, handleUpdateGuest } = useGuestDetail(id);

  const handleEditSubmit = (updatedData) => {
    const matchingGuest = findMatchingPhoneGuest(guests, updatedData.phone, id);

    if (matchingGuest) {
      const confirmMerge = window.confirm(
        `A guest with this phone number already exists. Would you like to merge these records?`
      );

      if (confirmMerge) {
        const mergedGuests = mergeGuest(
          guests.filter(g => g.id !== id && g.id !== matchingGuest.id),
          { ...matchingGuest, ...updatedData, id: matchingGuest.id }
        );
        setGuests(mergedGuests);
        navigate(ROUTES.HOME);
        return;
      } else {
        return;
      }
    }

    handleUpdateGuest(updatedData);
  };

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!guest) return null;

  return (
    <Card>
      {isEditing ? (
        <>
          <h1 className="title">Edit Guest</h1>
          <GuestForm
            onSubmit={handleEditSubmit}
            initialGuest={guest}
            isEditing={true}
            onCancel={() => setIsEditing(false)}
          />
        </>
      ) : (
        <>
          <GuestDetail guest={guest} />
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => setIsEditing(true)}
              className={styles.button}
              aria-label="Edit guest"
            >
              Edit Guest
            </Button>
            <Button
              onClick={() => navigate(ROUTES.HOME)}
              variant="secondary"
              className={styles.button}
              aria-label="Back to guest list"
            >
              Back to Guest List
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

export default GuestDetailPage;
