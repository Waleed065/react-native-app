import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {stackNavigation} from '../STORE/constants';
import OrderDetails from '../components/orders/OrderDetails';
import ViewOrder from '../components/overView/ViewOrder';
import PostAdDetails from '../components/adRequests/PostAdDetails';
import ViewPostAdRequest from '../components/overView/ViewPostAdRequest';
import ContactUsDetails from '../components/contactUs/ContactUsDetails';
import MyAds from '../components/account/MyAds';
import AccountMain from '../components/account/AccountMain';
import MyOrders from '../components/account/MyOrders';
import PostAd from '../components/account/PostAd';
import BottomTabNavigation from './BottomTabNavigation';
import ChatRoom from '../components/chat/ChatRoom';

const Stack = createStackNavigator();

export default function StackNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      mode={'card'}
      initialRouteName={stackNavigation.tabNavigation}>
      <Stack.Screen
        name={stackNavigation.tabNavigation}
        options={styles.tabNavigation}
        component={BottomTabNavigation}
      />

      <Stack.Screen
        name={stackNavigation.orderDetails}
        options={styles.orderDetails}
        component={OrderDetails}
      />
      <Stack.Screen
        name={stackNavigation.orderView}
        options={styles.viewOrder}
        component={ViewOrder}
      />

      <Stack.Screen
        name={stackNavigation.adRequestDetails}
        options={styles.adRequestDetails}
        component={PostAdDetails}
      />
      <Stack.Screen
        name={stackNavigation.adRequestView}
        options={styles.adRequestView}
        component={ViewPostAdRequest}
      />

      <Stack.Screen
        name={stackNavigation.contactUsDetails}
        options={styles.contactUsDetails}
        component={ContactUsDetails}
      />

      <Stack.Screen
        name={stackNavigation.accountMain}
        options={styles.accountMain}
        component={AccountMain}
      />
      <Stack.Screen
        name={stackNavigation.userAdTabs}
        options={styles.userAdTabs}
        component={MyAds}
      />

      <Stack.Screen
        name={stackNavigation.userOrders}
        options={styles.userOrders}
        component={MyOrders}
      />

      <Stack.Screen
        name={stackNavigation.editAd}
        options={styles.editAd}
        component={PostAd}
      />


      <Stack.Screen
        name={stackNavigation.chatRoom}
        options={styles.chatRoom}
        component={ChatRoom}
      />
    </Stack.Navigator>
  );
}

const styles = {
  tabNavigation: {
    title: 'Funkarts',
    headerShown: false,
  },
  orderDetails: {
    title: 'Order Details',
  },
  viewOrder: {
    title: 'View Order',
  },
  adRequestDetails: {
    title: 'Ad Request Details',
  },
  adRequestView: {
    title: 'Ad Request Demo',
  },
  contactUsDetails: {
    title: 'Contact Us Message',
  },
  accountMain: {
    title: 'Profile',
  },
  userAdTabs: {
    title: 'User Ads',
  },
  userOrders: {
    title: 'User',
  },
  editAd: {
    title: 'Edit Ad',
  },

  chatRoom: {
    title: 'Profile',
    headerShown: false,
  },
};
