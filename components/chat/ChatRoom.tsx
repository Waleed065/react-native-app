import React from 'react';
import {StyleSheet, View} from 'react-native';
import ChatBox from './ChatBox';
import ChatCredentials from './ChatCredentials';
import ChatInput from './ChatInput';

export default function ChatRoom(): JSX.Element {
  return (
    <View style={styles.container}>
      <ChatCredentials />
      <ChatBox />
      <ChatInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
