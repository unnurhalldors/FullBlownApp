/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import { Icon } from 'expo';
import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import _compact from 'lodash/compact';
import moment from 'moment';
import Colors from '../constants/Colors';

/* Actions */
import { toggleFavourite } from '../actions/favouriteActions';
import { fetchConcerts, handleFavourites } from '../actions/concertActions';

/* Components */
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';

/* All Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 30,
  },
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
  rowStyle: {
    flexDirection: 'row',
  },
  calendarIcon: {
    paddingRight: 5,
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
      <TouchableOpacity style={styles.concertContainer} onPress={() => this.goToDetail(item)}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={{ uri: item.imageSource }} />
        </View>
        <View style={styles.concertInfo}>
          <Text style={styles.header}>{item.eventDateName}</Text>
          <Text style={styles.info}>{item.eventHallName.toUpperCase()}</Text>
          <View style={styles.rowStyle}>
            <Icon.FontAwesome
              style={styles.calendarIcon}
              name="calendar-check-o"
              size={15}
              color="#a8a6a6"
            />
            <Text style={styles.info}>{moment(item.dateOfShow).format('llll')}</Text>
          </View>
        </View>
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
        <ScrollView contentContainerStyle={styles.listContainer}>
          <FlatList
            ListEmptyComponent={<ActivityIndicator size="large" />}
            ListHeaderComponent={
              <ListHeader searchString={searchString} onSearch={this.onSearch} />
            }
            data={this.filteredData(concerts)}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<ListFooter />}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ concertReducer }) => ({ concerts: concertReducer });

export default connect(mapStateToProps)(HomeScreen);
