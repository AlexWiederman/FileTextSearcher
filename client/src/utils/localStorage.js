export const getSavedCarIds = () => {
  const savedCarIds = localStorage.getItem('saved_cars')
    ? JSON.parse(localStorage.getItem('saved_cars'))
    : [];

  return savedCarIds;
};

export const saveCarIds = (CarIdArr) => {
  if (CarIdArr.length) {
    localStorage.setItem('saved_cars', JSON.stringify(CarIdArr));
  } else {
    localStorage.removeItem('saved_cars');
  }
};

export const removeCarId = (carId) => {
  const savedCarIds = localStorage.getItem('saved_cars')
    ? JSON.parse(localStorage.getItem('saved_cars'))
    : null;

  if (!savedCarIds) {
    return false;
  }

  const updatedSavedCarIds = savedCarIds?.filter((savedCarId) => savedCarId !== carId);
  localStorage.setItem('saved_cars', JSON.stringify(updatedSavedCarIds));

  return true;
};
