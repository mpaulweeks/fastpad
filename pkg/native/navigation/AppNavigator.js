import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../redux/reducers';

const AppNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

const store = createStore(rootReducer);
export default () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);
