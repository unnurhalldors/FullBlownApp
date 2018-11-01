import { UPDATE_CONCERT, FETCH_CONCERTS } from '../constants/concertConstants';

export const updateConcert = id => ({
  type: UPDATE_CONCERT,
  id,
});

export const fetchConcerts = data => ({
  type: FETCH_CONCERTS,
  data,
});
