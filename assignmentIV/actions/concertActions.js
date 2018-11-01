import { UPDATE_CONCERT, FETCH_CONCERTS } from '../constants/concertConstants';

export const updateConcert = (eventDateName, dateOfShow) => ({
  type: UPDATE_CONCERT,
  eventDateName,
  dateOfShow,
});

export const fetchConcerts = data => ({
  type: FETCH_CONCERTS,
  data,
});
