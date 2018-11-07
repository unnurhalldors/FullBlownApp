/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import Geocoder from 'react-native-geocoding';
import FETCH_CONCERTS from '../constants/concertConstants';

const findLatLng = async (eventHall) => {
  Geocoder.init('AIzaSyCBThq22FKZPvTf2hpZMxPqm8xecdhAlys');

  const response = await Geocoder.from(eventHall);
  const location = await response.results[0].geometry.location;

  return location;
};

const concertReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CONCERTS:
      action.data.forEach((concert) => {
        concert.coordinate = findLatLng(concert.eventHallName);
        concert.imageSource = concert.imageSource.replace(/medium/g, 'large');
      });
      return action.data;
    default:
      return state;
  }
};

export default concertReducer;
