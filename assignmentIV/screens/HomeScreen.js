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
import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import moment from 'moment';

/* Action */
import { fetchConcerts, updateConcert } from '../actions/concertActions';

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
    paddingBottom: 10,
    paddingTop: 10,
  },
  concertInfo: {
    paddingLeft: 8,
    justifyContent: 'space-around',
    flex: 1,
  },
  image: {
    height: 125,
    width: 125,
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
      .then(res => dispatch(fetchConcerts(res.results)))
      .catch((err) => {
        console.log(err);
      });
  }

  rightButtons = concert => [
    <TouchableOpacity
      style={styles.favoriteHighLight}
      onPress={() => this.props.dispatch(
        updateConcert(concert.eventDateName, concert.dateOfShow, concert.favourited),
      )
      }
    >
      <Text style={styles.delete}>Favorite</Text>
    </TouchableOpacity>,
  ];

  goToDetail = (concert) => {
    const { navigation } = this.props;
    navigation.navigate('Detail', concert);
  };

  renderItem = ({ item }) => (
    <Swipeable rightButtons={this.rightButtons(item)}>
      <TouchableOpacity style={styles.concertContainer} onPress={() => this.goToDetail(item)}>
        <Image style={styles.image} source={{ uri: item.imageSource }} />
        <View style={styles.concertInfo}>
          <Text>{item.eventDateName}</Text>
          <Text>{item.eventHallName}</Text>
          <Text>{moment(item.dateOfShow).format('llll')}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  onSearch = (data) => {
    this.setState({ searchString: data });
  };

  render() {
    const { searchString } = this.state;
    const { concerts } = this.props;
    console.log(concerts);

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
        <ScrollView>
          <FlatList
            ListEmptyComponent={<ActivityIndicator size="large" />}
            data={concerts}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<ListFooter />}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({ concerts: state });

export default connect(mapStateToProps)(HomeScreen);
