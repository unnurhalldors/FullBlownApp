import { FILL_FAVOURITES, ADD_FAVOURITE, REMOVE_FAVOURITE } from '../constants/favouriteConstants';

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
    case FILL_FAVOURITES:
      return action.data.map(item => JSON.parse(item[1]));
    case REMOVE_FAVOURITE:
      return state.filter(
        elem => elem.dateOfShow !== action.dateOfShow && elem.eventDateName !== action.eventDateName,
      );
    default:
      return state;
  }
};

export default concertReducer;
