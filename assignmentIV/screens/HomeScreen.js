import React from "react";
import $ from "jquery";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import Swipeable from "react-native-swipeable";

/* Components */
import ListHeader from "../components/ListHeader";
import ListFooter from "../components/ListFooter";

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

  rightButtons = concert => [
    <TouchableOpacity style={styles.favoriteHighLight} onPress={() => {}}>
      <Text style={styles.delete}>Favorite</Text>
    </TouchableOpacity>
  ];

  goToDetail = concert => {
    const { navigation } = this.props;
    navigation.navigate("Detail", concert);
  };

  renderItem = ({ item }) => {
    return (
      <Swipeable rightButtons={this.rightButtons(item)}>
        <TouchableOpacity
          style={styles.concertContainer}
          onPress={() => this.goToDetail(item)}
        >
          <Image style={styles.image} source={{ uri: item.imageSource }} />
          <View style={styles.concertInfo}>
            <Text>{item.name}</Text>
            <Text>{new Date(item.dateOfShow).toLocaleString("is-IS")}</Text>
            <Text>{item.eventDateName}</Text>
            <Text>{item.eventHallName}</Text>
            <Text>{item.userGroupName}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  render() {
    const { concerts } = this.state;
    console.log(concerts);
    return (
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
