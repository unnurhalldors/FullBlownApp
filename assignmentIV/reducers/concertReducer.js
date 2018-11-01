import { UPDATE_CONCERT, FETCH_CONCERTS } from '../constants/concertConstants';

const concertReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CONCERT:
      return state.map(
        concert => (concert.eventDateName === action.eventDateName && concert.dateOfShow === action.dateOfShow
          ? { ...concert, favourited: !concert.favourited }
          : concert),
      );
    case FETCH_CONCERTS:
      action.data.forEach((concert) => {
        concert.favourited = false;
      });
      return action.data;
    default:
      return state;
  }
};

export default concertReducer;
