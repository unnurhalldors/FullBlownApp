/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';

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

  render() {
    const { concerts } = this.props;

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
              coordinate={{
                latitude: concert.coordinate._55.lat,
                longitude: concert.coordinate._55.lng,
              }}
              title={concert.eventDateName}
              description={concert.eventHallName}
              key={`${concert.eventDateName}-${concert.dateOfShow}`}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = ({ concertReducer }) => ({ concerts: concertReducer });

export default connect(mapStateToProps)(MapScreen);
