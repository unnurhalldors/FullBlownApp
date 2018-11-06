import { FETCH_CONCERTS, UPDATE_CONCERT } from '../constants/concertConstants';
import { storeFavourite } from '../services/asyncStorage';

export const fetchConcerts = data => ({
  type: FETCH_CONCERTS,
  data,
});

export const updateConcert = (eventDateName, dateOfShow) => {
  storeFavourite(eventDateName, dateOfShow);
  return {
    type: UPDATE_CONCERT,
    eventDateName,
    dateOfShow,
  };
};
