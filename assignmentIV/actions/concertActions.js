import { FETCH_CONCERTS, UPDATE_CONCERT } from '../constants/concertConstants';

export const fetchConcerts = data => ({
  type: FETCH_CONCERTS,
  data,
});

export const updateConcert = (eventDateName, dateOfShow) => ({
  type: UPDATE_CONCERT,
  eventDateName,
  dateOfShow,
});
