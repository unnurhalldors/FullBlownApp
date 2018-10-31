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
import Swipeable from "react-native-swipeable";

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
          <View styles={styles.concertInfo}>
            <Text>{item.name}</Text>
            <Text>{item.dateOfShow}</Text>
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
    paddingLeft: 20,
    justifyContent: "space-around",
    flex: 1
  },
  image: {
    height: 125,
    width: 125
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
