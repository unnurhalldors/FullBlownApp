/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import { Icon } from 'expo';
import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import _compact from 'lodash/compact';
import Colors from '../constants/Colors';

/* Actions */
import { toggleFavourite } from '../actions/favouriteActions';
import { fetchConcerts, handleFavourites } from '../actions/concertActions';

/* Components */
import ListHeader from '../components/ListHeader';
import Concert from '../components/Concert';
import NotFound from '../components/NotFound';

/* All Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  favoriteHighLight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  activityIndicator: {
    paddingTop: 50,
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    fetch('https://apis.is/concerts')
      .then(res => res.json())
      .then(res => dispatch(fetchConcerts(res.results)))
      .catch((err) => {
        throw err;
      });
  }

  rightButtons = concert => [
    <TouchableOpacity
      style={styles.favoriteHighLight}
      onPress={() => {
        const { dispatch } = this.props;
        const { concerts } = this.props;
        dispatch(toggleFavourite(concert.eventDateName, concert.dateOfShow));
        dispatch(handleFavourites(concerts, concert));
      }}
    >
      {!concert.favourited._55 ? (
        <Icon.FontAwesome name="heart-o" size={20} color="#a8a6a6" />
      ) : (
        <Icon.FontAwesome name="heart" size={20} color={Colors.favoritedHeart} />
      )}
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

  onSearch = (data) => {
    this.setState({ searchString: data });
  };

  filteredData = (concerts) => {
    const { searchString } = this.state;

    if (searchString !== '') {
      return concerts.filter(
        item => _compact(Object.values(item).map(value => value.toString().indexOf(searchString) !== -1))
          .length > 0,
      );
    }
    return concerts;
  };

  render() {
    const { searchString } = this.state;
    const { concerts } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            ListEmptyComponent={
              searchString === '' ? (
                <ActivityIndicator style={styles.activityIndicator} color="#2f95dc" size="large" />
              ) : (
                <NotFound />
              )
            }
            ListHeaderComponent={
              <ListHeader searchString={searchString} onSearch={this.onSearch} />
            }
            data={this.filteredData(concerts)}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ concertReducer }) => ({ concerts: concertReducer });

export default connect(mapStateToProps)(HomeScreen);
