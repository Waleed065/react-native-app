import React, {memo} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';
import {useSelector} from 'react-redux';
import {stateTypes} from '../types';

import {root} from '../css';
import MainNavigation from './MainNavigation';
import {rootNavigation} from '../STORE/constants';


const AuthNavigator = (): JSX.Element => {
  console.log('Hello');


  return (

  );
};

export default memo(AuthNavigator);

const styles = {
  theme: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: root.bgColor1,
    },
  },
  login: {
    title: 'Login',
    headerShown: false,
  },
  logOut: {
    title: 'Logout',
    headerShown: false,
  },
};
