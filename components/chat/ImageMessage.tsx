import React, {memo} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {root} from '../../css';
import DateAndTime from './DateAndTime';
import {memberDetailsSchema} from '../../types';
import getAvatarColor from '../../utils/getAvatarColor';
import {Avatar} from 'react-native-paper';

const noDisplay =
  'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png';

interface schema {
  from: boolean;
  content: string;
  sentAt: any;
  withAdmin: boolean;
  credentials: memberDetailsSchema;
}

const ImageMessage = ({
  from,
  content,
  sentAt,
  withAdmin,
  credentials: {displayName, photoURL},
}: schema): JSX.Element => {
  // console.log('Image Message')

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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: content || noDisplay}}
            resizeMode={'cover'}
          />
        </View>

        <DateAndTime from={from} sentAt={sentAt} />
      </View>
    </View>
  );
};

function shouldUseMemo() {
  return true;
}

export default memo(ImageMessage, shouldUseMemo);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: root.defaultSpace,
    width: '100%',
    marginBottom: 5,
    // flexDirection: 'row',
    // transform: [{ scaleY: -1 }],
  },
  messageContainer: {
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
  imageContainer: {
    width: root.width * 0.6,
    height: root.width * 0.6,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: root.textColor1,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  avatar: {
    marginRight: 5,
  },
  name: {
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
    marginBottom: 5,
  },
});
