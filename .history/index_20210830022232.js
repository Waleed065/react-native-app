import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {STORE, PERSISTOR} from './STORE';

database().setPersistenceEnabled(true);


messaging().setBackgroundMessageHandler(() => null);

function ReduxApp({isHeadless}) {
  if (isHeadless) {
    return null;
  }
  return (
    <Provider store={STORE}>
      <PersistGate persistor={PERSISTOR} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => ReduxApp);
