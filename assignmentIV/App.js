import React from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';

/* Reducers */
import reducers from './reducers/reducers';

/* All styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

/* TODO */

/* Ef ég fer úr favourites inn í details og svo til baka
fer ég í homescreen en ekki favourites LAGA */
/* Laga eslint villur í concertReducer */
/* Laga eslint villur í homeScreen */
/* Laga eslint villur í mapScreen */
/* Setja eitthvað inn í SettingsScreen.js */
/* Væri kúl að navigate-a yfir í réttan concert þegar ýtt er á hann á mappinu */
/* fara yfir stíla - taka út það sem er ekki í notkun */
/* uppfæra readme */

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}
