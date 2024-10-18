export const getGuests = () => {
  const guests = localStorage.getItem('guests');
  return guests ? JSON.parse(guests) : [];
};

export const saveGuests = (guests) => {
  localStorage.setItem('guests', JSON.stringify(guests));
};
