import React from 'react';
import {View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import PrimaryNavigation from './PrimaryNavigation';
import {drawerNavigation} from '../STORE/constants';

import LogOut from '../screens/LogOut';
import Entypo from 'react-native-vector-icons/Entypo';
import {root} from '../css';
import {Divider} from 'react-native-paper';
import Trash from '../components/trash/Trash';
import AllUsers from '../components/users/AllUsers';

const Drawer = createDrawerNavigator();
const icon = (icon: any) => ({color}: any) => (
  <Entypo name={icon} size={22} style={{color}} />
);

export default function DrawerNavigation(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName={drawerNavigation.primary}
      screenOptions={{
        drawerActiveTintColor: root.primaryThemeColor,
      }}>
      <Drawer.Screen
        name={drawerNavigation.primary}
        component={PrimaryNavigation}
        options={styles.primaryNavigation}
      />
      <Drawer.Screen
        name={drawerNavigation.trash}
        component={Trash}
        options={styles.trash}
      />
      <Drawer.Screen
        name={drawerNavigation.allUsersNavigation}
        options={styles.allUsersNavigation}
        component={AllUsers}
      />
      <Drawer.Screen
        name={drawerNavigation.logout}
        options={styles.logOut}
        component={LogOut}
      />
    </Drawer.Navigator>
  );
}

function DrawerContent(props: any) {
  const {state, ...rest} = props;
  const newState = {...state};
  newState.routes = newState.routes.filter(
    (item: any) => item.name !== drawerNavigation.logout,
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Funkaarts</Text>
      </View>
      <Divider />

      <DrawerContentScrollView {...props}>
        <View style={{flex: 1}}>
          <DrawerItemList state={newState} {...rest} />
        </View>
      </DrawerContentScrollView>

      <DrawerItem
        icon={icon('log-out')}
        label={'Log Out'}
        activeTintColor={root.primaryThemeColor}
        focused={
          props.state.index ===
          props.state.routes.findIndex(
            (e: any) => e.name === drawerNavigation.logout,
          )
        }
        onPress={() => props.navigation.navigate(drawerNavigation.logout)}
      />
    </View>
  );
}

const styles = {
  primaryNavigation: {
    title: 'Primary',
    drawerIcon: icon('inbox'),
  },

  allUsersNavigation: {
    title: 'All Users',
    drawerIcon: icon('users'),
  },
  logOut: {
    title: 'Log Out',
    drawerLabel: () => null,
    drawerIcon: () => null,
  },
  trash: {
    title: 'Trash',
    drawerIcon: icon('trash'),
  },

  headingContainer: {
    padding: 15,
  },
  headingText: {
    fontSize: root.textSizeXLarge,
    fontWeight: root.textWeightBold as any,
    color: root.primaryThemeColor,
  },
};
