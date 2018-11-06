import React from 'react';
import {
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Text,
  AsyncStorage,
} from 'react-native';

import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import moment from 'moment';
import { Icon } from 'expo';
import { getAllFavourites } from '../services/asyncStorage';

/* Actions */
import { fillFavourites, toggleFavourite } from '../actions/favouritesActions';

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
  favoriteHighLight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 70,
    marginTop: 4,
    marginBottom: 4,
  },
});

class FavouriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Favourites',
  };

  componentWillMount() {
    const { dispatch } = this.props;
    getAllFavourites().then(favourites => dispatch(fillFavourites(favourites)));
  }

  rightButtons = concert => [
    <TouchableOpacity
      style={styles.favoriteHighLight}
      onPress={() => this.props.dispatch(toggleFavourite(concert.eventDateName, concert.dateOfShow))
      }
    >
      <Icon.FontAwesome name="heart-o" size={20} color="black" />
    </TouchableOpacity>,
  ];

  goToDetail = (concert) => {
    const { navigation } = this.props;
    navigation.navigate('Detail', concert);
  };

  renderItem = ({ item }) => (
    <Swipeable rightButtons={this.rightButtons(item)}>
      <TouchableOpacity style={styles.concertContainer} onPress={() => this.goToDetail(item)}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={{ uri: item.imageSource }} />
        </View>
        <View style={styles.concertInfo}>
          <Text style={styles.header}>{item.eventDateName}</Text>
          <Text style={styles.info}>{item.eventHallName.toUpperCase()}</Text>
          <Text style={styles.info}>{moment(item.dateOfShow).format('llll')}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
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
