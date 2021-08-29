import React, {useEffect, useRef} from 'react';

import {Alert} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import {NavigationContainerRef} from '@react-navigation/native';
import {useSelector, useDispatch, batch} from 'react-redux';
import {stateTypes} from './types';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './screens/Login';

import {root} from './css';
import MainNavigation from './navigation/MainNavigation';
import {rootNavigation, stackNavigation} from './STORE/constants';
import {
  removeUserInfo,
  setIsLoggedIn,
  clearAllMessages,
  setUserInfo,
  clearAllPostAdRequests,
  clearAllContactUsMessages,
  clearAllOrders,
  clearOrderDetails,
  clearAllUsers,
  clearAllTrash,
  addNotification,
  clearAllNotifications,
} from './STORE/actions';
import {Host} from 'react-native-portalize';

const Stack = createStackNavigator();

export default function App(): JSX.Element {
  const isLoggedIn = useSelector((state: stateTypes) => state.isLoggedIn);
  const dispatch = useDispatch<any>();

  const navigationRef = useRef<NavigationContainerRef>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user: any) => {
      if (!user) {
        batch(() => {
          dispatch(setIsLoggedIn(false));
          dispatch(removeUserInfo());
          dispatch(clearAllMessages());
          dispatch(clearAllPostAdRequests());
          dispatch(clearAllContactUsMessages());
          dispatch(clearAllOrders());
          dispatch(clearOrderDetails());
          dispatch(clearAllUsers());
          dispatch(clearAllTrash());
          dispatch(clearAllNotifications());
        });

        messaging().unsubscribeFromTopic('--admin--');
      } else {
        batch(() => {
          dispatch(
            setUserInfo({
              displayName: user.displayName,
              email: user.email,
              emailVerified: user.emailVerified,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              uid: user.uid,
            }),
          );
          dispatch(setIsLoggedIn(true));
        });
        messaging()
          .subscribeToTopic('--admin--')
          .catch(() =>
            Alert.alert(
              'Notifications Subscription',
              'Unable to subscribe to notifications.',
            ),
          );
      }
    });
    return subscriber;
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    let fcmUnsubscribe: any;
    messaging()
      .requestPermission()
      .then(authStatus => {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {

          fcmUnsubscribe = messaging().onMessage((remoteMessage: any) => {

            processNotification(remoteMessage, false);
          });

          messaging().onNotificationOpenedApp(remoteMessage => {

            processNotification(remoteMessage, true);
          });

          messaging()
            .getInitialNotification()
            .then(remoteMessage => {

              processNotification(remoteMessage, true);
            });
        }
      })
      .catch(() => {
        Alert.alert('Messaging.requestPermission Error: ');
      });
    return () => fcmUnsubscribe();
  }, []);

  const processNotification = (remoteMessage: any, fromBackground: boolean) => {
    if (remoteMessage?.data) {
      const {
        data: {msgType, msgId, time},
        notification: {body, title},
      } = remoteMessage;
      let navigateTo: any = null;
      let reduxRef:any = null;
      switch (msgType) {
        case 'new-order': {
          navigateTo = {
            name: stackNavigation.orderDetails,
            params: {
              id: msgId,
              isInTrash: false,
            },
          };
          reduxRef = 'orders'
          break;
        }
        case 'new-post-ad-request': {
          navigateTo = {
            name: stackNavigation.adRequestDetails,
            params: {
              id: msgId,
              isInTrash: false,
            },
          };
          reduxRef = 'postAdRequests'
          break;
        }
        case 'new-contact-us-message': {
          navigateTo = {
            name: stackNavigation.contactUsDetails,
            params: {
              id: msgId,
              isInTrash: false,
            },
          };
          reduxRef = 'contactUs'
          break;
        }
      }

      if (navigateTo && reduxRef) {
        if (fromBackground && msgType) {
          navigationRef.current?.navigate(navigateTo);
        }

        const newTime = JSON.parse(time);
        let seconds = 0;
        let nanoseconds = 0;
        const typeCheck = (type: string) => {
          switch (type) {
            case 'seconds':
              seconds = newTime['seconds'];
              break;
            case '_seconds':
              seconds = newTime['_seconds'];
              break;
            case 'nanoseconds':
              nanoseconds = newTime['nanoseconds'];
              break;
            case '_nanoseconds':
              nanoseconds = newTime['_nanoseconds'];
              break;
          }
        };
        typeCheck(Object.keys(newTime)[0])
        typeCheck(Object.keys(newTime)[1])
    
        
        dispatch(
          addNotification({
            [msgId]: {
              msgType,
              msgId,
              content: body,
              heading: title,
              navigateTo,
              shouldMark: false,
              reduxRef,
              time: {
                seconds,
                nanoseconds
              },
            },
          }),
        );

        navigateTo = null;
      }
    }
  };

  return (
    <Host>
      <PaperProvider>
        <NavigationContainer theme={styles.theme} ref={navigationRef}>
          <Stack.Navigator>
            {isLoggedIn ? (
              <Stack.Screen
                name={rootNavigation.mainNavigation}
                component={MainNavigation}
                options={styles.logOut}
              />
            ) : (
              <Stack.Screen
                name={rootNavigation.login}
                component={Login}
                options={styles.login}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Host>
  );
}

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
