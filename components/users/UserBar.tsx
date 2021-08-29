import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {root} from '../../css';
import {userType, userBaby} from '../../types';
import {TouchableRipple} from 'react-native-paper';

const chatHeight = 90;
const noDisplay =
  'https://firebasestorage.googleapis.com/v0/b/myfirebase-cd72c.appspot.com/o/private%2FnoDisplay.png?alt=media&token=81ed5147-dff9-41a6-a31a-92c15c8d9dd9';

interface schema {
  onPress: (arg: userType) => void;
  user: userType;
}
export default function UserBar({user, onPress}: schema): JSX.Element {
  const {displayName, emailVerified, photoURL} =
    user.userInfo ?? userBaby.userInfo;

  return (
    <TouchableRipple
      style={styles.chatItSelfContainer}
      onPress={() => onPress(user)}
      rippleColor={root.underlayColor}
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
        </View>

        {emailVerified ? (
          <>
            <Text style={styles.smallFont}>Verified</Text>
            <Entypo name="check" size={root.textSizeSmall} color={'green'} />
          </>
        ) : (
          <>
            <Text style={styles.smallFont}>Not Verified</Text>
            <Entypo name="block" size={root.textSizeSmall} color={'red'} />
          </>
        )}
      </>
    </TouchableRipple>
  );
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
    marginRight: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
