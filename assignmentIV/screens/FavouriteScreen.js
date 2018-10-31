import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class FavouriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Favourites',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>hello</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16
  },
  header_text: {
    color: "black",
    fontSize: 30,
    fontFamily: "Verdana"
  },
  avatar: {
    width: 210,
    height: 210,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(193, 193, 193)",
    backgroundColor: "white",
    marginBottom: 10
  }
});
