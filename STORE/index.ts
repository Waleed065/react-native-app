import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

import allReducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: undefined,
  whitelist: [
    'isLoggedIn',
    'userInfo',
    'messages',
    'postAdRequests',
    'contactUs',
    'orders',
    'orderDetails',
    'users',
    'trash',
    'notifications'
  ],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const STORE = createStore(persistedReducer, applyMiddleware(thunk));

export const PERSISTOR = persistStore(STORE);
