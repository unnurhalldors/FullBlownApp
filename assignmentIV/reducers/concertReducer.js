import Geocoder from 'react-native-geocoding';
import { FETCH_CONCERTS, UPDATE_CONCERT } from '../constants/concertConstants';

findLatLng = async (eventHall) => {
  Geocoder.init('AIzaSyCBThq22FKZPvTf2hpZMxPqm8xecdhAlys');

  const response = await Geocoder.from(eventHall);

  const location = await response.results[0].geometry.location;

  return location;
};

const concertReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CONCERTS:
      action.data.forEach((concert) => {
        concert.favourited = false;
        concert.coordinate = this.findLatLng(concert.eventHallName);
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
