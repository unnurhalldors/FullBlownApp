import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/* All styles */
const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    paddingTop: 20,
  },
  headerText: {
    color: 'rgb(47, 49, 51)',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'left',
  },
});

/* Just for decoration */
class Header extends React.PureComponent {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Concerts</Text>
      </View>
    );
  }
}

export default Header;
