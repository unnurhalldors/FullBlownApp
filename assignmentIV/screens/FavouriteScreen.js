import React from 'react';
import {
  ScrollView, StyleSheet, FlatList, TouchableOpacity, AsyncStorage,
} from 'react-native';

import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import { Icon } from 'expo';
import { getAllFavourites } from '../services/asyncStorage';
import Concert from '../components/Concert';

/* Actions */
import { fillFavourites, toggleFavourite } from '../actions/favouriteActions';

/* All Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  favoriteHighLight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
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
      onPress={() => {
        const { dispatch } = this.props;
        dispatch(toggleFavourite(concert.eventDateName, concert.dateOfShow));
      }}
    >
      <Icon.FontAwesome name="heart-o" size={20} color="#a8a6a6" />
    </TouchableOpacity>,
  ];

  goToDetail = (concert) => {
    const { navigation } = this.props;
    navigation.navigate('Detail', concert);
  };

  renderItem = ({ item }) => (
    <Swipeable rightButtons={this.rightButtons(item)}>
      <TouchableOpacity onPress={() => this.goToDetail(item)}>
        <Concert concert={item} />
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
    const { favourites } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={this.filteredData(favourites)}
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
