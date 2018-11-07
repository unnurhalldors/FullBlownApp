import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import DetailScreen from '../screens/DetailScreen';
import MapScreen from '../screens/MapScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} size={26} name="info-circle" />,
};

const FavouriteStack = createStackNavigator({
  Favourites: FavouriteScreen,
  Detail: DetailScreen,
});

FavouriteStack.navigationOptions = {
  tabBarLabel: 'Favourites',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} size={23} name="heart" />,
};

const MapStack = createStackNavigator({
  MapStack: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} size={26} name="map-marker" />,
};

export default createBottomTabNavigator({
  HomeStack,
  FavouriteStack,
  MapStack,
});
