import React from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, Share,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/is';
import { Icon } from 'expo';
import { connect } from 'react-redux';
import { toggleFavourite } from '../actions/favouritesActions';

/* Setting moment locale to Icelandic */
moment.locale('is');

/* All Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
    paddingBottom: 50,
  },
  concertMainInfo: {
    flex: 1,
    alignItems: 'center',
  },
  concertInfoContainer: {
    flex: 2,
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
    paddingBottom: 20,
  },
  imageView: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 1.2,
  },
  image: {
    width: 300,
    height: 210,
    marginBottom: 20,
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  iconView: {
    flex: 1,
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
  replaceAt = (string, index, replace) => string.substring(0, index) + replace + string.substring(index + 1);
  
  constructLink = (imgLink, name) => {
    let link = 'https://midi.frettabladid.is/tonleikar/';
    let nameTmp = name;

    nameTmp = nameTmp.replace(/ó/g, 'o');
    nameTmp = nameTmp.replace(/í/g, 'i');
    nameTmp = nameTmp.replace(/á/g, 'a');
    nameTmp = nameTmp.replace(/ð/g, 'd');
    nameTmp = nameTmp.replace(/ö/g, 'o');
    nameTmp = nameTmp.replace(/é/g, 'e');
    nameTmp = nameTmp.replace(/ú/g, 'u');
    nameTmp = nameTmp.replace(/ý/g, 'y');
    nameTmp = nameTmp.replace(/æ/g, 'a');
    nameTmp = nameTmp.replace(/þ/g, 't');

    nameTmp = nameTmp.toLowerCase();

    let indexOfDash = nameTmp.indexOf('-');

    if (indexOfDash !== -1) {
      nameTmp = this.replaceAt(nameTmp, indexOfDash - 1, '');
      indexOfDash = nameTmp.indexOf('-');
      nameTmp = this.replaceAt(nameTmp, indexOfDash + 1, '');
    }

    const whiteSpacesRemoved = nameTmp.replace(/ /g, '_');
    const prefix = 'https://d30qys758zh01z.cloudfront.net/images/medium/';
    const withoutPrefix = imgLink.slice(prefix.length, imgLink.length);
    const dotSplit = withoutPrefix.split('.');
    const constant = dotSplit[0];
    const number = dotSplit[1];
    link = `${link + constant}/${number}/${whiteSpacesRemoved}`;

    return link;
  };

  onShare = async () => {
    const { navigation } = this.props;
    try {
      const result = await Share.share({
        message: this.constructLink(
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
      alert(error.message);
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
        <View style={styles.iconView}>
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => {
              const { dispatch } = this.props;
              dispatch(
                toggleFavourite(
                  navigation.state.params.eventDateName,
                  navigation.state.params.dateOfShow,
                ),
              );
            }}
          >
            <Icon.FontAwesome name="heart" size={25} color="#e04163" />
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

export default connect()(DetailScreen);
