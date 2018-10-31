import { UPDATE_CONCERT } from "../constants/concertConstants";

export const updateTodo = id => {
  return {
    type: UPDATE_CONCERT,
    id
  };
};
