import { UPDATE_CONCERT } from "../constants/concertConstants";

const concertReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CONCERT:
      return state.map(
        concert =>
          concert.id === action.id
            ? { ...concert, favorited: !todo.favorited }
            : concert
      );
    default:
      return state;
  }
};

export default concertReducer;
