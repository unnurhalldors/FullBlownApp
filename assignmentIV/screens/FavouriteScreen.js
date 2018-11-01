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

import { connect } from 'react-redux';

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

class FavouriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Favourites',
  };

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.concertContainer}>
      <Image style={styles.image} source={{ uri: item.imageSource }} />
      <View style={styles.concertInfo}>
        <Text>{item.name}</Text>
        <Text>{new Date(item.dateOfShow).toLocaleString('is-IS')}</Text>
        <Text>{item.eventDateName}</Text>
        <Text>{item.eventHallName}</Text>
        <Text>{item.userGroupName}</Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    const { concerts } = this.props;
    console.log(concerts);
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={concerts.filter(x => x.favourited === true)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({ concerts: state });

export default connect(mapStateToProps)(FavouriteScreen);
