import { v4 as uuidv4 } from 'uuid';

export const filterGuests = (guests, searchTerm) => {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return guests.filter((guest) => (
        guest.names.some((name) => name?.toLowerCase().includes(lowercaseSearchTerm)) ||
        guest.emails.some((email) => email?.toLowerCase().includes(lowercaseSearchTerm)) ||
        guest.phone.toLowerCase().includes(lowercaseSearchTerm)
    ));
};

const findPhoneMatch = (guests, phone) => guests.find(g => g.phone === phone);
const findEmailMatch = (guests, emails) => guests.find(g => g.emails.some(e => emails.includes(e)));

const mergeGuestData = (existingGuest, newGuest) => ({
    ...existingGuest,
    names: [...new Set([...newGuest.names, ...existingGuest.names])],
    emails: [...new Set([...newGuest.emails, ...existingGuest.emails])],
    phone: newGuest.phone || existingGuest.phone
});

const addNewGuest = (guests, newGuest) => [...guests, { ...newGuest, id: uuidv4() }];

function handlePhoneMatch(guests, phoneMatch, newGuest) {
  return guests.map(guest => 
    guest.id === phoneMatch.id ? mergeGuestData(guest, newGuest) : guest
  );
}

function handleEmailMatch(guests, emailMatch, newGuest) {
  if (!emailMatch.phone && newGuest.phone) {
    return guests.map(guest => 
      guest.id === emailMatch.id ? { ...guest, phone: newGuest.phone } : guest
    );
  }
  if (emailMatch.phone && (!newGuest.phone || emailMatch.phone === newGuest.phone)) {
    return guests.map(guest => 
      guest.id === emailMatch.id ? mergeGuestData(guest, newGuest) : guest
    );
  }
  return null;
}

export function mergeGuest(guests, newGuest) {
  const phoneMatch = findPhoneMatch(guests, newGuest.phone);
  if (phoneMatch) {
    return handlePhoneMatch(guests, phoneMatch, newGuest);
  }

  const emailMatch = findEmailMatch(guests, newGuest.emails);
  if (emailMatch) {
    const result = handleEmailMatch(guests, emailMatch, newGuest);
    if (result) return result;
  }
  
  return addNewGuest(guests, newGuest);
}

export function findMatchingPhoneGuest(guests, phone, currentGuestId) {
  return guests.find(guest => guest.phone === phone && guest.id !== currentGuestId);
}
