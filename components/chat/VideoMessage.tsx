import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {root} from '../../css';
import DateAndTime from './DateAndTime';
import Video from 'react-native-video';
import {memberDetailsSchema} from '../../types';
import getAvatarColor from '../../utils/getAvatarColor';
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

const VideoMessage = ({
  from,
  content,
  sentAt,
  withAdmin,
  credentials: {displayName, photoURL},
}: schema): JSX.Element => {
  // console.log("Video Message");

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
          <Video
            style={styles.video}
            source={{uri: content || noDisplay}}
            resizeMode={'cover'}
            posterResizeMode={'cover'}
            playWhenInactive={false}
            playInBackground={false}
            // useNativeControls={true}
            controls={true}
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

export default memo(VideoMessage, shouldUseMemo);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: root.defaultSpace,
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
  video: {
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
