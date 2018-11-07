import { FETCH_CONCERTS, HANDLE_FAVOURITES } from '../constants/concertConstants';

export const fetchConcerts = data => ({
  type: FETCH_CONCERTS,
  data,
});

export const handleFavourites = (concerts, concert) => ({
  type: HANDLE_FAVOURITES,
  concerts,
  concert,
});
