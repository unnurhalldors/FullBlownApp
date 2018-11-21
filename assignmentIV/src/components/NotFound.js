import React from 'react';
import { Icon } from 'expo';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  notFoundView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
  },
  notFoundMessage: {
    color: '#a8a6a6',
    paddingLeft: 10,
    fontSize: 20,
  },
});

class NotFound extends React.Component {
  render() {
    return (
      <View style={styles.notFoundView}>
        <Icon.FontAwesome
          style={styles.notFoundIcon}
          name="warning"
          size={25}
          color="rgb(252, 158, 35)"
        />
        <Text style={styles.notFoundMessage}>No result found, sorry!</Text>
      </View>
    );
  }
}

export default NotFound;
