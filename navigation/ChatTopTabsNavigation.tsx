import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import Entypo from 'react-native-vector-icons/Entypo';

import {chatTopTabsNavigation} from '../STORE/constants';
import AdminChat from '../components/chat/AdminChat';
import PublicChat from '../components/chat/PublicChat';
import {root} from '../css';

const Tab = createMaterialTopTabNavigator();

export default function ChatTopTabsNavigation(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName={chatTopTabsNavigation.adminChat}
      screenOptions={styles.tabBarOptions}>
      <Tab.Screen
        name={chatTopTabsNavigation.adminChat}
        component={AdminChat}
        options={styles.adminChat}
      />
      <Tab.Screen
        name={chatTopTabsNavigation.publicChat}
        component={PublicChat}
        options={styles.publicChat}
      />
    </Tab.Navigator>
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
  adminChat: {
    title: 'Admin Chat',
    // tabBarIcon: icon('chat'),
  },
  publicChat: {
    title: 'Public Chat',
    // tabBarIcon: icon('message'),
  },
};
