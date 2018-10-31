import React from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
// import Moment from 'react-moment';

// Styles
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
    flex: 1,
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
});

const DetailScreen = ({ navigation }) => (
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
          {new Date(navigation.state.params.dateOfShow).toLocaleString('is-IS')}
        </Text>
      </View>
    </View>
  </View>
);

export default DetailScreen;
