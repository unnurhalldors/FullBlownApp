import { ADD_FAVOURITE, REMOVE_FAVOURITE, FILL_FAVOURITES } from '../constants/favouriteConstants';
import { storeFavourite } from '../services/asyncStorage';

export const addFavourite = (eventDateName, dateOfShow) => dispatch => storeFavourite(eventDateName, dateOfShow).then((data) => {
  if (data) {
    dispatch({
      type: ADD_FAVOURITE,
      eventDateName,
      dateOfShow,
    });
  } else {
    dispatch({
      type: REMOVE_FAVOURITE,
      eventDateName,
      dateOfShow,
    });
  }
});

export const fillFavourites = data => ({
  type: FILL_FAVOURITES,
  data,
});
