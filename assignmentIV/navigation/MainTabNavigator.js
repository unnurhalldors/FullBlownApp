import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DetailScreen from '../screens/DetailScreen';
import MapScreen from '../screens/MapScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="info-circle" />,
};

const FavouriteStack = createStackNavigator({
  Favourites: FavouriteScreen,
});

FavouriteStack.navigationOptions = {
  tabBarLabel: 'Favourites',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="heart" />,
};

const MapStack = createStackNavigator({
  MapStack: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="map-marker" />,
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="gear" />,
};

export default createBottomTabNavigator({
  HomeStack,
  FavouriteStack,
  MapStack,
  SettingsStack,
});
