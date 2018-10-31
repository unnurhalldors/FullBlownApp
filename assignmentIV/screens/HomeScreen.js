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

/* Components */
import ListHeader from '../components/ListHeader';
import ListFooter from '../components/ListFooter';

/* All Styles */
const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginTop: 20,
  },
  concertContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 16,
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
  filterContainer: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    marginTop: 25,
    backgroundColor: 'rgb(255,210,255)',
    alignContent: 'center',
  },
  search: {
    paddingLeft: 10,
    fontSize: 20,
    backgroundColor: 'rgb(242, 237, 241)',
    height: 40,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 15,
  },
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      concerts: null,
      gotData: false,
      searchString: '',
    };
  }

  componentDidMount() {
    fetch('https://apis.is/concerts')
      .then(res => res.json())
      .then(res => this.setState({ concerts: res.results }))
      .then(this.setState({ gotData: true }))
      .catch((err) => {
        console.log(err);
      });
  }

  rightButtons = concert => [
    <TouchableOpacity style={styles.favoriteHighLight} onPress={() => {}}>
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
          <Text>{item.name}</Text>
          <Text>{new Date(item.dateOfShow).toLocaleString('is-IS')}</Text>
          <Text>{item.eventDateName}</Text>
          <Text>{item.eventHallName}</Text>
          <Text>{item.userGroupName}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  onSearch = (data) => {
    this.setState({ searchString: data });
  };

  render() {
    const { concerts, searchString } = this.state;

    console.log(this.state);
    return (
      <View>
        <View style={styles.filterContainer}>
          {/* <Text style={styles.filterText}>Search</Text> */}
          <TextInput
            placeholder="Search"
            style={styles.search}
            onChangeText={this.onSearch}
            value={searchString}
          />
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <FlatList
            ListEmptyComponent={<ActivityIndicator size="large" />}
            ListHeaderComponent={<ListHeader />}
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
