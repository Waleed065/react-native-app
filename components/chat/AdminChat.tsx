import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
// import { getStatusBarHeight } from "react-native-status-bar-height";

import 'react-native-get-random-values';
import {v4} from 'uuid';
import {useSelector} from 'react-redux';
import {allChatsSchema} from '../../types';
import {useNavigation} from '@react-navigation/native';
import {root} from '../../css';
import {getAdminChats} from '../../STORE/selectors';
import ChatItSelf from './ChatItSelf';
import {stackNavigation} from '../../STORE/constants';
import NotAvailable from '../NotAvailable';

const chatHeight = 90;
const defaultListViewWidth = root.width;

export default function Chat(): JSX.Element {
  const [screenHeight, setScreenHeight] = useState(400);
  const chats = useSelector(getAdminChats);

  const navigation = useNavigation<any>();

  const dataProvider: any = new DataProvider(
    // (r1, r2) => r1.lastMessage?.sentAt !== r2.lastMessage?.sentAt,
    () => true,
  ).cloneWithRows(chats);

  const layoutProvider = useRef(
    new LayoutProvider(
      () => v4(),
      (type, dim) => {
        (dim.width = root.width), (dim.height = chatHeight);
      },
    ),
  );

  const onChatPress = useCallback(chatId => {
    navigation.navigate(stackNavigation.chatRoom, {chatId, withAdmin: true});
  }, []);

  const renderItem = (type: any, chat: allChatsSchema) => (
    <ChatItSelf onPress={onChatPress} chat={chat} />
  );

  return (
    <View
      style={styles.container}
      onLayout={e => setScreenHeight(e.nativeEvent.layout.height)}>
      <View style={[styles.flatListStyle, {height: screenHeight}]}>
        {Boolean(dataProvider._data.length) ? (
          <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={layoutProvider.current}
            rowRenderer={renderItem}
          />
        ) : (
          <NotAvailable title={'There are currently no Admin chats 😕'} />
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
