import React from 'react';
import {
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';

import moment from 'moment';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { getAllFavourites } from '../services/asyncStorage';
import { fillFavourites } from '../actions/favouritesActions';

/* All Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  concertContainer: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(247,247,247,1.0)',
    marginLeft: 16,
    paddingBottom: 10,
    paddingTop: 10,
  },
  concertInfo: {
    paddingLeft: 8,
    justifyContent: 'space-around',
    flex: 1,
  },
  imageView: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 1.2,
  },
  image: {
    height: 100,
    width: 130,
  },
  header: {
    color: 'rgb(47, 49, 51)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  info: {
    color: '#a8a6a6',
    fontSize: 13,
  },
});

class FavouriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Favourites',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { dispatch } = this.props;
    getAllFavourites().then(favourites => dispatch(fillFavourites(favourites)));
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.concertContainer}>
      <View style={styles.imageView}>
        <Image style={styles.image} source={{ uri: item.imageSource }} />
      </View>
      <View style={styles.concertInfo}>
        <Text style={styles.header}>{item.eventDateName}</Text>
        <Text style={styles.info}>{item.eventHallName.toUpperCase()}</Text>
        <Text style={styles.info}>{moment(item.dateOfShow).format('llll')}</Text>
      </View>
    </TouchableOpacity>
  );

  filteredData = (data) => {
    const { concerts } = this.props;
    const filtered = [];

    data.forEach((favourited) => {
      concerts.forEach((concert) => {
        if (
          favourited.dateOfShow === concert.dateOfShow
          && favourited.eventDateName === concert.eventDateName
        ) {
          filtered.push(concert);
        }
      });
    });
    return filtered;
  };

  render() {
    // AsyncStorage.clear();
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={this.filteredData(this.props.favourites)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ favouritesReducer, concertReducer }) => ({
  favourites: favouritesReducer,
  concerts: concertReducer,
});

export default connect(mapStateToProps)(FavouriteScreen);
