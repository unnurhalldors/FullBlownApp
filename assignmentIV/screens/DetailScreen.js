/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, Share,
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

/* All Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
  },
  concertMainInfo: {
    flex: 2,
    alignItems: 'center',
  },
  concertInfoContainer: {
    flex: 3,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(247,247,247,1.0)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    padding: 20,
  },
  concertType: {
    color: '#a8a6a6',
    fontWeight: 'bold',
    paddingTop: 10,
  },
  concertInfo: {
    color: '#2f95dc',
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  header: {
    paddingBottom: 10,
    paddingTop: 20,
  },
  headerText: {
    color: 'rgb(47, 49, 51)',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  detailText: {
    color: '#a8a6a6',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'left',
  },
  imageView: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 1.2,
  },
  image: {
    width: 325,
    height: 210,
    marginBottom: 20,
  },
  rowStyle: {
    flexDirection: 'row',
  },
  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconTextStyle: {
    color: '#a8a6a6',
    fontWeight: 'bold',
    fontSize: 14,
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

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={{ uri: navigation.state.params.imageSource }} />
        </View>
        <View style={styles.concertMainInfo}>
          <Text style={styles.headerText}>{navigation.state.params.eventDateName}</Text>
          <Text style={styles.concertType}>{navigation.state.params.name.toUpperCase()}</Text>
        </View>
        <View style={styles.concertInfoContainer}>
          <Text style={styles.detailText}>Um viðburðinn</Text>
          <View style={styles.rowStyle}>
            <Text>UMSJÓN</Text>
            <Text style={styles.concertInfo}>
              {navigation.state.params.userGroupName.toUpperCase()}
            </Text>
          </View>
          <View style={styles.rowStyle}>
            <Text>STAÐSETNING</Text>
            <Text style={styles.concertInfo}>
              {navigation.state.params.eventHallName.toUpperCase()}
            </Text>
          </View>
          <View style={styles.rowStyle}>
            <Text>TÍMASETNING</Text>
            <Text style={styles.concertInfo}>
              {moment(navigation.state.params.dateOfShow).format('llll')}
            </Text>
          </View>
        </View>
        <View style={styles.rowStyle}>
          <TouchableOpacity
            style={styles.iconStyle}
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
              <Icon.FontAwesome name="heart-o" size={20} color="#a8a6a6" />
            ) : (
              <Icon.FontAwesome name="heart" size={20} color={Colors.favoritedHeart} />
            )}
            <Text style={styles.iconTextStyle}>Favourite</Text>
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
