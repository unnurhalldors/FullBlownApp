import React from 'react';
import {
  View, Text, StyleSheet, TextInput,
} from 'react-native';

/* All styles */
const styles = StyleSheet.create({
  headerText: {
    color: 'rgb(60, 60, 60)',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'left',
    paddingLeft: 16,
  },
  searchContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    width: '100%',
    padding: 16,
    paddingTop: 10,
  },
  search: {
    paddingLeft: 10,
    fontSize: 18,
    backgroundColor: '#f2f2f2',
    height: 40,
    borderRadius: 10,
  },
});

class Header extends React.PureComponent {
  render() {
    const { onSearch, searchString } = this.props;
    return (
      <View>
        <Text style={styles.headerText}>Concerts</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#a8a6a6"
            style={styles.search}
            onChangeText={onSearch}
            value={searchString}
          />
        </View>
      </View>
    );
  }
}

export default Header;
