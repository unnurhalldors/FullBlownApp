import { UPDATE_CONCERT } from '../constants/concertConstants';

const updateConcert = id => ({
  type: UPDATE_CONCERT,
  id,
});

export default updateConcert;
