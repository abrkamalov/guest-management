import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddGuestPage from '../pages/AddGuestPage/AddGuestPage';
import { useGuestStore } from '../hooks/useGuestStore';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

// Mock the useGuestStore hook
jest.mock('../hooks/useGuestStore', () => ({
    useGuestStore: jest.fn(),
}));

describe('AddGuestPage', () => {
    let mockSetGuests;

    beforeEach(() => {
        mockSetGuests = jest.fn();
        useGuestStore.mockReturnValue([[], mockSetGuests]);
    });

    const renderAddGuestPage = (initialGuests = []) => {
        useGuestStore.mockReturnValue([initialGuests, mockSetGuests]);
        return render(<AddGuestPage />);
    };

    test('should merge guest with phone match', async () => {
        const initialGuests = [
            { id: '1', names: ['David Underwood'], phone: '+16135551234', emails: ['dave@micrometrics.com'] }
        ];
        const { getByLabelText, getByText } = renderAddGuestPage(initialGuests);

        fireEvent.change(getByLabelText(/Name/i), { target: { value: 'David Underwood' } });
        fireEvent.change(getByLabelText(/Phone/i), { target: { value: '+16135551234' } });
        fireEvent.change(getByLabelText(/Email/i), { target: { value: 'david@micrometrics.com' } });

        fireEvent.click(getByText(/Add Guest/i));

        await waitFor(() => {
            expect(mockSetGuests).toHaveBeenCalledWith([
                {
                    id: '1',
                    names: ['David Underwood'],
                    phone: '+16135551234',
                    emails: ['david@micrometrics.com', 'dave@micrometrics.com']
                }
            ]);
        });
    });

    test('should update guest with email match', async () => {
        const initialGuests = [
            { id: '1', names: ['David Underwood'], phone: '', emails: ['david@micrometrics.com'] }
        ];
        const { getByLabelText, getByText } = renderAddGuestPage(initialGuests);

        fireEvent.change(getByLabelText(/Name/i), { target: { value: 'David Underwood' } });
        fireEvent.change(getByLabelText(/Phone/i), { target: { value: '+16135551234' } });
        fireEvent.change(getByLabelText(/Email/i), { target: { value: 'david@micrometrics.com' } });

        fireEvent.click(getByText(/Add Guest/i));

        await waitFor(() => {
            expect(mockSetGuests).toHaveBeenCalledWith([
                {
                    id: '1',
                    names: ['David Underwood'],
                    phone: '+16135551234',
                    emails: ['david@micrometrics.com']
                }
            ]);
        });
    });

    test('should prepend new name to existing record', async () => {
        const initialGuests = [
            { id: '1', names: ['David Underwood'], phone: '+16135551234', emails: [] }
        ];
        const { getByLabelText, getByText } = renderAddGuestPage(initialGuests);

        fireEvent.change(getByLabelText(/Name/i), { target: { value: 'Dave' } });
        fireEvent.change(getByLabelText(/Phone/i), { target: { value: '+16135551234' } });

        fireEvent.click(getByText(/Add Guest/i));

        await waitFor(() => {
            expect(mockSetGuests).toHaveBeenCalledWith([
                {
                    id: '1',
                    names: ['Dave', 'David Underwood'],
                    phone: '+16135551234',
                    emails: []
                }
            ]);
        });
    });

    test('should create new record when email matches but phone mismatches', async () => {
        const initialGuests = [
            { id: '1', names: ['David Underwood'], phone: '+16135559876', emails: ['david@micrometrics.com'] }
        ];
        const { getByLabelText, getByText } = renderAddGuestPage(initialGuests);

        fireEvent.change(getByLabelText(/Name/i), { target: { value: 'David Underwood' } });
        fireEvent.change(getByLabelText(/Phone/i), { target: { value: '+16135551234' } });
        fireEvent.change(getByLabelText(/Email/i), { target: { value: 'david@micrometrics.com' } });

        fireEvent.click(getByText(/Add Guest/i));

        await waitFor(() => {
            expect(mockSetGuests).toHaveBeenCalledWith([
                { id: '1', names: ['David Underwood'], phone: '+16135559876', emails: ['david@micrometrics.com'] },
                { id: expect.any(String), names: ['David Underwood'], phone: '+16135551234', emails: ['david@micrometrics.com'] }
            ]);
        });
    });

    test('should prefer phone match over email match', async () => {
        const initialGuests = [
            { id: '1', names: ['David Underwood'], phone: '', emails: ['david@micrometrics.com'] },
            { id: '2', names: ['David Underwood'], phone: '+16135551234', emails: ['dave@micrometrics.com'] }
        ];
        const { getByLabelText, getByText } = renderAddGuestPage(initialGuests);

        fireEvent.change(getByLabelText(/Name/i), { target: { value: 'David Underwood' } });
        fireEvent.change(getByLabelText(/Phone/i), { target: { value: '+16135551234' } });
        fireEvent.change(getByLabelText(/Email/i), { target: { value: 'david@micrometrics.com' } });

        fireEvent.click(getByText(/Add Guest/i));

        await waitFor(() => {
            expect(mockSetGuests).toHaveBeenCalledWith([
                {
                    id: '1',
                    names: ['David Underwood'],
                    phone: '',
                    emails: ['david@micrometrics.com']
                },
                {
                    id: '2',
                    names: ['David Underwood'],
                    phone: '+16135551234',
                    emails: ['david@micrometrics.com', 'dave@micrometrics.com']
                }
            ]);
        });
    });
});
