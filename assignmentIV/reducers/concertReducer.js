import { FETCH_CONCERTS, UPDATE_CONCERT } from '../constants/concertConstants';

const concertReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CONCERTS:
      action.data.forEach((concert) => {
        concert.favourited = false;
      });
      return action.data;
    case UPDATE_CONCERT:
      return state.map(
        concert => (concert.eventDateName === action.eventDateName && concert.dateOfShow === action.dateOfShow
          ? { ...concert, favourited: !concert.favourited }
          : concert),
      );
    default:
      return state;
  }
};

export default concertReducer;
