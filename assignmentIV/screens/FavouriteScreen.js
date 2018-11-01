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

import Swipeable from 'react-native-swipeable';
import { connect } from 'react-redux';
import moment from 'moment';
import { Icon } from 'expo';

/* Actions */
import { updateConcert } from '../actions/concertActions';

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

  rightButtons = concert => [
    <TouchableOpacity
      style={styles.favoriteHighLight}
      onPress={() => this.props.dispatch(
        updateConcert(concert.eventDateName, concert.dateOfShow, concert.favourited),
      )
      }
    >
      <Icon.FontAwesome size={20} name="heart-o" />
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

  render() {
    const { concerts } = this.props;
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
