import React from "react";
import $ from "jquery";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      concerts: null,
      gotData: false
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    fetch("https://apis.is/concerts")
      .then(res => res.json())
      .then(res => this.setState({ concerts: res.results }))
      .then(this.setState({ gotData: true }))
      .catch(err => {
        console.log(err);
      });
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.concertContainer}>
        <Image style={styles.image} source={{ uri: item.imageSource }} />
        <View style={styles.concertInfo}>
          <Text>{item.name}</Text>
          <Text>{new Date(item.dateOfShow).toLocaleString("is-IS")}</Text>
          <Text>{item.eventDateName}</Text>
          <Text>{item.eventHallName}</Text>
          <Text>{item.userGroupName}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { concerts } = this.state;
    console.log(concerts);
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={concerts}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginTop: 20
  },
  concertContainer: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 16
  },
  concertInfo: {
    paddingLeft: 8,
    justifyContent: "space-around",
    flex: 1
  },
  image: {
    height: 125,
    width: 125
  }
});
