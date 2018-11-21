import { combineReducers } from 'redux';
import favouritesReducer from './favouritesReducer';
import concertReducer from './concertReducer';

export default combineReducers({
  favouritesReducer,
  concertReducer,
});
