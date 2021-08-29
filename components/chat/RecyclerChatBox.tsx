import React, {useCallback, useState, useRef} from 'react';
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {useSelector} from 'react-redux';
import {getCurrentChat} from '../../STORE/selectors';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import VideoMessage from './VideoMessage';
import {messageSchema, stateTypes} from '../../types';
import {messageTypes} from '../../STORE/constants';
import {useRoute} from '@react-navigation/native';
import {root} from '../../css';
import {RecyclerListView, LayoutProvider, DataProvider} from 'recyclerlistview';
import NotAvailable from '../NotAvailable';

const userId = '--admin--';
const defaultListViewWidth = root.width;

const credentials = {
  displayName: '',
  photoURL: '',
};

export default function ChatBox(): JSX.Element {
  const route = useRoute<any>();
  const {chatId, withAdmin} = route.params;
  const [screenHeight, setScreenHeight] = useState(400);
  const {messages, memberDetails} = useSelector((state: stateTypes) =>
    getCurrentChat(state, chatId),
  );
  const scrollViewRef = useRef<any>(null);

  const data = Object.values(messages ?? []);
  const dataProvider: any = new DataProvider(() => {
    return true;
  }).cloneWithRows(data);
  const layoutProvider = useRef(
    new LayoutProvider(
      index => index,
      (type, dim) => {
        dim.width = root.width;
      },
    ),
  );

  // const scrollToTop = () => {
  //   return scrollViewRef.current?.scrollToEnd({animated: true});
  // };

  // useEffect(() => {
  //   if (dataProvider._data.length) {
  //     scrollToTop();
  //   }
  // }, [dataProvider._data.length]);

  const textMsg = useCallback(item => {
    const {msgId, from, content, sentAt} = item;

    return (
      <TextMessage
        key={msgId}
        from={from !== userId}
        content={content}
        sentAt={sentAt}
        withAdmin={withAdmin}
        credentials={memberDetails?.[from] ?? credentials}
      />
    );
  }, []);
  const imgMsg = useCallback(item => {
    const {msgId, from, content, sentAt} = item;

    return (
      <ImageMessage
        key={msgId}
        from={from !== userId}
        content={content}
        sentAt={sentAt}
        withAdmin={withAdmin}
        credentials={memberDetails?.[from] ?? credentials}
      />
    );
  }, []);
  const videoMsg = useCallback(item => {
    const {msgId, from, content, sentAt} = item;

    return (
      <VideoMessage
        key={msgId}
        from={from !== userId}
        content={content}
        sentAt={sentAt}
        withAdmin={withAdmin}
        credentials={memberDetails?.[from] ?? credentials}
      />
    );
  }, []);

  const defaultMsg = useCallback(item => {
    const {msgId, from, sentAt} = item;

    return (
      <TextMessage
        key={msgId}
        from={from !== userId}
        content={'Content type not supported'}
        sentAt={sentAt}
        withAdmin={withAdmin}
        credentials={memberDetails?.[from] ?? credentials}
      />
    );
  }, []);

  const renderItem = (type: any, item: messageSchema) => {
    switch (item.type) {
      case messageTypes.text:
        return textMsg(item);
      case messageTypes.image:
        return imgMsg(item);
      case messageTypes.video:
        return videoMsg(item);
      default:
        return defaultMsg(item);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={'height'}
      style={styles.container}
      onLayout={e => setScreenHeight(e.nativeEvent.layout.height)}>
      <View style={[styles.flatListStyle, {height: screenHeight}]}>
        {Boolean(dataProvider._data.length) ? (
          <RecyclerListView
            ref={scrollViewRef}
            dataProvider={dataProvider}
            layoutProvider={layoutProvider.current}
            rowRenderer={renderItem}
            forceNonDeterministicRendering={true}

            // scrollViewProps={{
            //   justifyContent: 'flex-end',
            // }}

            // optimizeForInsertDeleteAnimations={true}
            // disableRecycling
          />
        ) : (
          <NotAvailable title={'You dont have any chats 😕'} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  flatListStyle: {
    width: defaultListViewWidth,
    justifyContent: 'flex-end',
  },
});
