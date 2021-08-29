import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
// import messaging from '@react-native-firebase/messaging';
import {root} from '../css';
import DrawerNavigation from './DrawerNavigation';
import {tabNavigation} from '../STORE/constants';
import ChatTopTabsNavigation from './ChatTopTabsNavigation';
import Notifications from '../components/notifications/Notifications';
import {View} from 'react-native';
import {Badge} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {getUnReadNotifications} from '../STORE/selectors';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigation(): JSX.Element {
  const unreadNotifications = useSelector(getUnReadNotifications);

  return (
    <Tab.Navigator
      activeColor={root.primaryThemeColor}
      shifting={true}
      barStyle={styles.barStyle}
      initialRouteName={tabNavigation.drawerNavigation}>
      <Tab.Screen
        name={tabNavigation.drawerNavigation}
        options={styles.drawerNavigation}
        component={DrawerNavigation}
      />
      <Tab.Screen
        name={tabNavigation.chatNavigation}
        options={styles.chatOptions}
        component={ChatTopTabsNavigation}
      />
      <Tab.Screen
        name={tabNavigation.notificationScreen}
        options={{
          title: 'Notifications',
          tabBarIcon: ({color}) => (
            <View>
              <Badge
                visible={Boolean(unreadNotifications)}
                style={styles.badge}
                size={18}>
                {unreadNotifications}
              </Badge>

              <Entypo name={'bell'} size={20} color={color} />
            </View>
          ),
        }}
        component={Notifications}
      />
    </Tab.Navigator>
  );
}

const icon = (name: any) => ({color}: any) => (
  <Entypo name={name} size={20} color={color} />
);

const styles = {
  barStyle: {
    backgroundColor: root.bgColor1,
  },
  drawerNavigation: {
    title: 'Home',
    tabBarIcon: icon('home'),
  },

  chatOptions: {
    title: 'Chat',
    tabBarIcon: icon('chat'),
  },
  badge: {
    top: -6,
    right: -10,
    position: 'absolute',
    backgroundColor: 'red',
    zIndex: 8,
  } as any,
};
