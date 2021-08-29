import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Entypo from 'react-native-vector-icons/Entypo';

import {primaryNavigation} from '../STORE/constants';
import {root} from '../css';
import Orders from '../components/orders/Orders';

import ContactUsMessages from '../components/contactUs/ContactUsMessages';
import PostAdRequests from '../components/adRequests/PostAdRequests';

const TopTab = createMaterialTopTabNavigator();

export default function PrimaryNavigation(): JSX.Element {
  return (
    <TopTab.Navigator
      initialRouteName={primaryNavigation.orders}
      screenOptions={styles.tabBarOptions}>
      <TopTab.Screen
        name={primaryNavigation.orders}
        component={Orders}
        options={styles.orders}
      />
      <TopTab.Screen
        name={primaryNavigation.postAdRequests}
        component={PostAdRequests}
        options={styles.postAdRequests}
      />
      <TopTab.Screen
        name={primaryNavigation.contactUsMessages}
        component={ContactUsMessages}
        options={styles.contactUsMessages}
      />
    </TopTab.Navigator>
  );
}

// const icon = (name: any) => ({color}: any) => (
//   <Entypo name={name} size={20} color={color} />
// );

const styles = {
  tabBarOptions: {
    tabBarIndicatorStyle: {backgroundColor: root.primaryThemeColor},
    tabBarActiveTintColor: root.primaryThemeColor,
    tabBarPressColor: root.underlayColor
  },
  orders: {
    title: 'Orders',
    // tabBarIcon: icon('list'),
    activeTintColor: root.primaryThemeColor,
  },
  postAdRequests: {
    title: 'Ad Requests',
    // tabBarIcon: icon('bell'),
    activeTintColor: root.primaryThemeColor,
  },
  contactUsMessages: {
    title: 'Contact Us',
    // tabBarIcon: icon('notification'),
    activeTintColor: root.primaryThemeColor,
  },
};