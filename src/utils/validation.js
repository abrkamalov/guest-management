import { PHONE_REGEX, ERROR_MESSAGES } from './constants';

export function validateGuest(guest, guests, initialPhone) {
    const errors = {};

    if (guest.names.length > 0 && guest.names.every(name => name.trim() === '')) {
        errors.name = ERROR_MESSAGES.EMPTY_NAME;
    }

    if (!guest.phone && guest.emails.length === 0) {
        errors.contact = ERROR_MESSAGES.CONTACT_REQUIRED;
    }

    if (guest.phone && !PHONE_REGEX.test(guest.phone)) {
        errors.phone = ERROR_MESSAGES.INVALID_PHONE;
    }

    const emailRegex = /^[^@]+@[^@]+$/;
    if (guest.emails.some(email => email.trim() === '' || !emailRegex.test(email.trim()))) {
        errors.email = ERROR_MESSAGES.INVALID_EMAIL;
    }

    return errors;
}
