import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {root} from '../../css';
import {allChatsSchema} from '../../types';
import {TouchableRipple} from 'react-native-paper';

interface chatContentSchema {
  type: string;
  content: string;
}
const chatHeight = 90;
const noDisplay =
  'https://firebasestorage.googleapis.com/v0/b/myfirebase-cd72c.appspot.com/o/private%2FnoDisplay.png?alt=media&token=81ed5147-dff9-41a6-a31a-92c15c8d9dd9';
const defaultMemberDetails = {
  displayName: '',
  photoURL: undefined,
};

interface schema {
  onPress: (arg: string) => void;
  chat: allChatsSchema;
}
export default function ChatItSelf({chat, onPress}: schema): JSX.Element {
  const {
    chatId,
    memberDetails,
    lastMessage: {type = '', content = '', sentAt = ''},
  } = chat;

  const userId = Object.keys(memberDetails).find(
    memberId => memberId !== '--admin--',
  );
  const {displayName, photoURL} =
    memberDetails[userId ?? ''] ?? defaultMemberDetails;

  if (!displayName) {
    console.log(chat);
  }

  return (
    <TouchableRipple
      style={styles.chatItSelfContainer}
      onPress={() => onPress(chatId)}
      rippleColor={root.underlayColor}
      // underlayColor={root.underlayColor}
      // activeOpacity={1}
    >
      <>
        <Image
          style={styles.avatar}
          source={{
            uri: photoURL || noDisplay,
          }}
        />

        <View style={styles.detailsContainer}>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.heading}>
            {displayName || 'No Name'}
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text}>
            {chatContent({type, content})}
          </Text>

          <View style={styles.dateContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.smallFont}>
              {sentAt ? new Date(sentAt).toLocaleDateString() : ''}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.smallFont}>
              {sentAt ? new Date(sentAt).toLocaleTimeString() : ''}
            </Text>
          </View>
        </View>
      </>
    </TouchableRipple>
  );
}

function chatContent({type, content}: chatContentSchema) {
  switch (type) {
    case 'text':
      return content || 'Start a conversation';
    case 'image':
      return <Entypo name="image" size={24} color={root.primaryThemeColor} />;
    case 'video':
      return <Entypo name="video" size={24} color={root.primaryThemeColor} />;
  }
}

const styles = StyleSheet.create({
  chatItSelfContainer: {
    padding: root.defaultSpace,
    height: chatHeight,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: root.primaryThemeColorLite,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 1000,
    backgroundColor: root.bgColor2,
  },
  detailsContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  heading: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    marginVertical: 5,
  },
  smallFont: {
    color: root.textColor3,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
