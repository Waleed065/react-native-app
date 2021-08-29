import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {root} from '../../css';
import DateAndTime from './DateAndTime';
import getAvatarColor from '../../utils/getAvatarColor';
import {memberDetailsSchema} from '../../types';
import {Avatar} from 'react-native-paper';

const noDisplay =
  'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png';

interface schema {
  from: boolean;
  content: string;
  sentAt: number;
  withAdmin: boolean;
  credentials: memberDetailsSchema;
}

const TextMessage = ({
  from,
  content,
  sentAt,
  withAdmin,
  credentials: {displayName, photoURL},
}: schema): JSX.Element => {
  return (
    <View style={styles.container}>
      {!withAdmin && (
        <Avatar.Image
          style={styles.avatar}
          size={50}
          source={{uri: photoURL || noDisplay}}
        />
      )}

      <View
        style={[
          styles.messageContainer,
          from ? styles.otherMessageContainer : styles.selfMessageContainer,
        ]}>
        {!withAdmin && (
          <Text
            style={[
              styles.name,
              {color: getAvatarColor(displayName || 'Un Known')},
            ]}>
            {displayName || 'No Name'}
          </Text>
        )}
        <Text style={styles.text}>{content}</Text>
        <DateAndTime from={from} sentAt={sentAt} />
      </View>
    </View>
  );
};

function shouldUseMemo() {
  return true;
}
export default memo(TextMessage, shouldUseMemo);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: root.defaultSpace,
    marginVertical: 3,
    width: '100%',
    // flexDirection: 'row',
    // transform: [{scaleY: -1}],
  },
  messageContainer: {
    maxWidth: root.width * 0.7,
    padding: 10,
  },
  selfMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: root.primaryThemeColor,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: root.textColor3,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  text: {
    color: root.textColor1,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    marginBottom: 5,
  },
  name: {
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
    marginBottom: 5,
  },
  avatar: {
    marginRight: 5,
  },
});
