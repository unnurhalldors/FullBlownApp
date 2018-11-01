import { UPDATE_CONCERT, FETCH_CONCERTS } from '../constants/concertConstants';

const concertReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CONCERT:
      return state.map(
        concert => (concert.id === action.id ? { ...concert, favorited: !concert.favorited } : concert),
      );
    case FETCH_CONCERTS:
      console.log(action);
      return action.data;
    default:
      return state;
  }
};

export default concertReducer;
