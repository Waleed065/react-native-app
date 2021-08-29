import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
// import { getStatusBarHeight } from "react-native-status-bar-height";

import {useSelector} from 'react-redux';
import {stateTypes, userType} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {root} from '../../css';
import UserBar from './UserBar';
import {stackNavigation} from '../../STORE/constants';

const chatHeight = 90;
const defaultListViewWidth = root.width;

export default function AllUsers(): JSX.Element {
  const allUsers = useSelector((state: stateTypes) => state.users);
  // Object.values(allUsers).forEach(val => console.log(val.userInfo));
  const [screenHeight, setScreenHeight] = useState(400);

  const navigation = useNavigation();

  const dataProvider: any = new DataProvider(
    (r1, r2) => r1.userInfo?.uid !== r2.userInfo?.uid,
  ).cloneWithRows(Object.values(allUsers));

  const layoutProvider = useRef(
    new LayoutProvider(
      index => index,
      (type, dim) => {
        (dim.width = root.width), (dim.height = chatHeight);
      },
    ),
  );

  const onUserPress = useCallback(id => {
    navigation.navigate({
      name: stackNavigation.accountMain,
      params: {
        id,
      },
    });
  }, []);

  const renderItem = (type: any, user: userType) => (
    <UserBar
      onPress={() => onUserPress(Object.keys(allUsers)[type])}
      user={user}
    />
  );

  return (
    <View
      style={styles.container}
      onLayout={e => setScreenHeight(e.nativeEvent.layout.height)}>
      <View style={[styles.flatListStyle, {height: screenHeight}]}>
        {Boolean(dataProvider._data.length) && (
          <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={layoutProvider.current}
            rowRenderer={renderItem}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: getStatusBarHeight(),
    flex: 1,
  },
  flatListStyle: {
    width: defaultListViewWidth,
  },
});
