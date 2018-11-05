import { FETCH_CONCERTS } from '../constants/concertConstants';

export const fetchConcerts = data => ({
  type: FETCH_CONCERTS,
  data,
});

export const h = () => {};
