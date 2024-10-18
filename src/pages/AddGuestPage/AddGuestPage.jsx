import React from 'react';
import GuestForm from '../../components/GuestForm/GuestForm';
import { useNavigate } from 'react-router-dom';
import { useGuestStore } from '../../hooks/useGuestStore';
import { mergeGuest } from '../../utils/guest';
import Card from '../../components/Card/Card';
import { ROUTES } from '../../utils/constants';
import { v4 as uuidv4 } from 'uuid';

function AddGuestPage() {
    const navigate = useNavigate();
    const [guests, setGuests] = useGuestStore();

    const handleAddGuest = (newGuest) => {
        const guestWithId = { ...newGuest, id: uuidv4() };
        const updatedGuests = mergeGuest(guests, guestWithId);
        setGuests(updatedGuests);
        navigate(ROUTES.HOME);
    };

    return (
        <Card>
            <h1 className="title">Add a New Guest</h1>
            <GuestForm 
                onSubmit={handleAddGuest} 
                isEditing={false} 
                onCancel={() => navigate(ROUTES.HOME)}
            />
        </Card>
    );
}

export default AddGuestPage;
