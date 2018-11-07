import React from 'react';
import {
  View, Text, StyleSheet, Image,
} from 'react-native';

import moment from 'moment';
import { Icon } from 'expo';

/* All styles */
const styles = StyleSheet.create({
  concertContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(242,242,242,1.0)',
    marginLeft: 16,
    paddingBottom: 20,
    paddingTop: 20,
  },
  concertInfo: {
    paddingLeft: 8,
    justifyContent: 'space-around',
    flex: 1,
  },
  imageView: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1.2,
  },
  image: {
    height: 100,
    width: 130,
  },
  header: {
    color: 'rgb(60, 60, 60)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  info: {
    color: '#a4a2a2',
    fontSize: 13,
  },
  rowStyle: {
    flexDirection: 'row',
  },
  calendarIcon: {
    paddingRight: 5,
  },
});

class Concert extends React.Component {
  render() {
    const { concert } = this.props;
    return (
      <View style={styles.concertContainer}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={{ uri: concert.imageSource }} />
        </View>
        <View style={styles.concertInfo}>
          <Text style={styles.header}>{concert.eventDateName}</Text>
          <Text style={styles.info}>{concert.eventHallName.toUpperCase()}</Text>
          <View style={styles.rowStyle}>
            <Icon.FontAwesome
              style={styles.calendarIcon}
              name="calendar-check-o"
              size={15}
              color="#a8a6a6"
            />
            <Text style={styles.info}>
              {moment(concert.dateOfShow)
                .format('llll')
                .toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Concert;
