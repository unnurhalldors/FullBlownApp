/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import Geocoder from 'react-native-geocoding';
import { FETCH_CONCERTS, HANDLE_FAVOURITES } from '../constants/concertConstants';
import { isFavourited } from '../services/asyncStorage';

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
        concert.favourited = isFavourited(concert.eventDateName, concert.dateOfShow);
        concert.imageSource = concert.imageSource.replace(/medium/g, 'large');
      });
      return action.data;
    case HANDLE_FAVOURITES:
      action.concerts.forEach((elem) => {
        if (
          elem.dateOfShow === action.concert.dateOfShow
          && elem.eventDateName === action.concert.eventDateName
        ) {
          elem.favourited._55 = !elem.favourited._55;
        }
      });
      return [...action.concerts];
    default:
      return state;
  }
};

export default concertReducer;
