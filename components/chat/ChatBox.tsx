import React, {useCallback} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {getCurrentChat} from '../../STORE/selectors';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import VideoMessage from './VideoMessage';
import {messageSchema, stateTypes} from '../../types';
import {messageTypes} from '../../STORE/constants';
import {useRoute} from '@react-navigation/native';

const userId = '--admin--';

const credentials = {
  displayName: '',
  photoURL: '',
};


export default function ChatBox(): JSX.Element {
  const route = useRoute<any>();
  const {chatId, withAdmin} = route.params;
  const {messages, memberDetails} = useSelector((state: stateTypes) =>
    getCurrentChat(state, chatId),
  );

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

  const renderItem = ({item}: {item: messageSchema}) => {
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

  const keyExtractor = useCallback(item => item.msgId, []);

  return (
    <FlatList
      data={Object.values(messages ?? []).reverse()}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      inverted={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
