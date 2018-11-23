import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../redux/reducers';
import {
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import ListNotesScreen from '../screens/ListNotesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const screens = [
  {
    name: 'Settings',
    screen: SettingsScreen,
  },
  {
    name: 'Home',
    screen: HomeScreen,
  },
  {
    name: 'ListNotes',
    screen: ListNotesScreen,
  },
  {
    name: 'CreateNote',
    screen: CreateNoteScreen,
  },
];

const stacks = screens.reduce((obj, s) => {
  obj[s.name] = createStackNavigator({
    [s.name]: s.screen,
  });
  return obj;
}, {});

const MainNavigator = createMaterialTopTabNavigator(stacks, {
  order: ['Settings', 'Home', 'ListNotes', 'CreateNote'],
  animationEnabled: true,
  initialRouteName: 'CreateNote',
  navigationOptions: {
    tabBarVisible: false,
  },
});

const AppNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainNavigator,
}, {
  initialRouteName: 'Main',
});

const store = createStore(rootReducer);
export default () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);
