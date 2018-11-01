import React from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppNavigator from './navigation/AppNavigator';

/* Reducers */
import concertReducer from './reducers/concertReducer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(concertReducer)}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}
