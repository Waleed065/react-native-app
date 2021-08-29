import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {root} from '../../css';

const noDisplay =
  'https://firebasestorage.googleapis.com/v0/b/myfirebase-cd72c.appspot.com/o/private%2FnoDisplay.png?alt=media&token=81ed5147-dff9-41a6-a31a-92c15c8d9dd9';

interface schema {
  displayName: string | false;
  phoneNumber: string | false;
  email: string | false;
  photoURL: string | false;
  emailVerified: boolean;
}

export default function ProfileBox({
  displayName = '',
  phoneNumber = '',
  email = '',
  photoURL = '',
  emailVerified = false,
}: schema): JSX.Element {
  return (
    <View style={styles.profileBox}>
      <View style={styles.imgBox}>
        <Image
          style={styles.image}
          source={{uri: photoURL || noDisplay}}
          resizeMode={'stretch'}
        />
      </View>

      <Text style={[styles.heading, styles.nameHeading]}>
        {displayName || 'No Name'}
      </Text>

      <View style={styles.line} />
      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>Email </Text>

        <View style={styles.textFlex}>
          <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>
            {email || 'Not Provided'}
          </Text>
          {emailVerified ? (
            <AntDesign name="checkcircleo" size={root.iconSize} color="green" />
          ) : (
            <AntDesign
              name="exclamationcircleo"
              size={root.iconSize}
              color="orange"
            />
          )}
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>Contact </Text>
        <View style={styles.textFlex}>
          <Text style={styles.text}>{phoneNumber || 'Not Provided'}</Text>
          {phoneNumber ? (
            <AntDesign name="checkcircleo" size={root.iconSize} color="green" />
          ) : (
            <AntDesign
              name="exclamationcircleo"
              size={root.iconSize}
              color="orange"
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileBox: {
    padding: root.defaultSpace,
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: root.bgColor1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,

    elevation: 5,

    width: '100%',
    height: 400,
  },
  loadingIndicator: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  imgBox: {
    width: 120,
    height: 120,
    borderRadius: 500,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    backgroundColor: root.bgColor2,
  },
  input: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: root.textColor3,

    flex: 1,
    marginBottom: 1,
    fontSize: root.textSizeNormal,
  },
  imageEditContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
    marginRight: root.defaultSpace,
  },
  nameHeading: {
    marginRight: 0,
    marginTop: root.defaultSpace,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: root.textColor3,
    marginTop: root.defaultSpace,
  },

  detailsContainer: {
    marginTop: root.defaultSpace,

    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  textFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    marginHorizontal: 10,
  },
  marginBoy: {
    marginTop: root.defaultSpace,
  },
  iconContainer: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
    marginTop: root.defaultSpace,
  },
});
