/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import { Icon } from 'expo';
import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import _compact from 'lodash/compact';
import moment from 'moment';

/* Actions */
import { toggleFavourite } from '../actions/favouriteActions';
import fetchConcerts from '../actions/concertActions';

/* Components */
import Header from '../components/Header';
import ListFooter from '../components/ListFooter';

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
  searchContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    width: '100%',
    padding: 16,
  },
  search: {
    paddingLeft: 10,
    fontSize: 18,
    backgroundColor: '#f2f2f2',
    height: 40,
    borderRadius: 10,
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
      .then(res => dispatch(fetchConcerts(res.results)));
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
        item => _compact(Object.values(item)
          .map(value => value.toString()
            .indexOf(searchString) !== -1)).length > 0,
      );
    }
    return concerts;
  };

  render() {
    const { searchString } = this.state;
    const { concerts } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Header />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#a8a6a6"
            style={styles.search}
            onChangeText={this.onSearch}
            value={searchString}
          />
        </View>
        <ScrollView contentContainerStyle={styles.listContainer}>
          <FlatList
            ListEmptyComponent={<ActivityIndicator size="large" />}
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
