/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
  Dimensions,
  Linking,
} from 'react-native';

import moment from 'moment';
import 'moment/locale/is';

import { Icon } from 'expo';
import { connect } from 'react-redux';

import { toggleFavourite } from '../actions/favouriteActions';
import { constructLink } from '../services/linkService';
import { handleFavourites } from '../actions/concertActions';
import Colors from '../constants/Colors';

/* Setting moment locale to Icelandic */
moment.locale('is');

/* Height of the concert image */
const heightOfImage = Dimensions.get('window').height * 0.37;

/* All Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  imageView: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1.2,
  },
  image: {
    width: Dimensions.get('window').width,
    height: heightOfImage,
    marginBottom: 15,
  },
  concertMainInfo: {
    flex: 2,
    alignItems: 'center',
  },
  header: {
    color: 'rgb(60, 60, 60)',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  concertType: {
    color: '#a8a6a6',
    fontWeight: 'bold',
    paddingTop: 10,
  },
  concertInfoContainer: {
    flex: 3,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(247,247,247,1.0)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    padding: 20,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2f95dc',
    backgroundColor: '#2f95dc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoHeader: {
    color: '#a8a6a6',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
  },
  concertInfoHeader: {
    color: 'rgb(60, 60, 60)',
  },
  concertInfo: {
    color: '#2f95dc',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  rowStyle: {
    flexDirection: 'row',
    width: '70%',
  },
  iconViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconTextStyle: {
    color: '#a8a6a6',
    fontSize: 15,
    paddingLeft: 5,
  },
});

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };

  onShare = async () => {
    const { navigation } = this.props;
    try {
      const result = await Share.share({
        message: constructLink(
          navigation.state.params.imageSource,
          navigation.state.params.eventDateName,
        ),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      throw error;
    }
  };

  onBuyPress = (item) => {
    const uri = constructLink(item.imageSource, item.eventDateName);
    Linking.canOpenURL(uri).then((supported) => {
      if (!supported) {
        throw new Error('Error: Not supported!');
      } else {
        return Linking.openURL(uri);
      }
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={{ uri: navigation.state.params.imageSource }} />
        </View>
        <View style={styles.concertMainInfo}>
          <Text style={styles.header}>{navigation.state.params.eventDateName}</Text>
          <Text style={styles.concertType}>{navigation.state.params.name.toUpperCase()}</Text>
        </View>
        <View style={styles.concertInfoContainer}>
          <View style={styles.buttonView}>
            <Text style={styles.infoHeader}>Um viðburðinn</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onBuyPress(navigation.state.params)}
            >
              <Text style={styles.buttonText}>Kaupa miða</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.concertInfoHeader}>UMSJÓN</Text>
            <Text style={styles.concertInfo}>
              {navigation.state.params.userGroupName.toUpperCase()}
            </Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.concertInfoHeader}>STAÐSETNING</Text>
            <Text style={styles.concertInfo}>
              {navigation.state.params.eventHallName.toUpperCase()}
            </Text>
          </View>
          <View style={styles.rowStyle}>
            <Text style={styles.concertInfoHeader}>TÍMASETNING</Text>
            <Text style={styles.concertInfo}>
              {moment(navigation.state.params.dateOfShow)
                .format('llll')
                .toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.iconViewStyle}>
          <TouchableOpacity
            onPress={() => {
              const { dispatch, concerts } = this.props;
              dispatch(
                toggleFavourite(
                  navigation.state.params.eventDateName,
                  navigation.state.params.dateOfShow,
                ),
              );
              dispatch(handleFavourites(concerts, navigation.state.params));
            }}
          >
            {!navigation.state.params.favourited._55 ? (
              <View style={styles.iconStyle}>
                <Icon.FontAwesome name="heart-o" size={22} color="#a8a6a6" />
                <Text style={styles.iconTextStyle}>Favourite</Text>
              </View>
            ) : (
              <View style={styles.iconStyle}>
                <Icon.FontAwesome name="heart" size={22} color={Colors.favoritedHeart} />
                <Text style={styles.iconTextStyle}>Unfavourite</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle} onPress={this.onShare}>
            <Icon.FontAwesome name="share" size={25} color="#2f95dc" />
            <Text style={styles.iconTextStyle}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({ concertReducer }) => ({ concerts: concertReducer });

export default connect(mapStateToProps)(DetailScreen);
