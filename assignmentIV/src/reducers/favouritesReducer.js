import { ADD_FAVOURITE, REMOVE_FAVOURITE, FILL_FAVOURITES } from '../constants/favouriteConstants';

const concertReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FAVOURITE:
      return [
        ...state,
        {
          dateOfShow: action.dateOfShow,
          eventDateName: action.eventDateName,
        },
      ];
    case REMOVE_FAVOURITE:
      return state.filter((elem) => {
        if (elem.dateOfShow === action.dateOfShow && elem.eventDateName === action.eventDateName) {
          return false;
        }
        return true;
      });
    case FILL_FAVOURITES:
      return action.data.map(item => JSON.parse(item[1]));
    default:
      return state;
  }
};

export default concertReducer;
