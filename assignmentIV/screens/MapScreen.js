import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import Geocoder from 'react-native-geocoding';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map',
  };

  findLatLng = async (eventHall) => {
    Geocoder.init('AIzaSyCBThq22FKZPvTf2hpZMxPqm8xecdhAlys');

    const response = await Geocoder.from(eventHall);

    // console.log(response.results[0].geometry.location);
    const location = await response.results[0].geometry.location;

    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  };

  render() {
    const { concerts } = this.props;
    const bla = this.findLatLng(concerts[3].eventHallName);
    console.log(bla);

    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation
          showsMyLocationButton
          followsUserLocation
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 64.12375,
            longitude: -21.92563,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {concerts.map(concert => (
            <MapView.Marker
              // coordinate={this.findLatLng(concert.eventHallName)}
              title={concert.eventDateName}
              description={concert.dateOfShow}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => ({ concerts: state });

export default connect(mapStateToProps)(MapScreen);
