import { FETCH_CONCERTS } from '../constants/concertConstants';

const fetchConcerts = data => ({
  type: FETCH_CONCERTS,
  data,
});

export default fetchConcerts;
