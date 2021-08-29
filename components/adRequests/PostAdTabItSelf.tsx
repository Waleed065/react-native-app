import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';

// import firestore from '@react-native-firebase/firestore';
// import functions from '@react-native-firebase/functions';
import {root} from '../../css';
import {singlePostAdRequestSchema} from '../../types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Badge, Menu, Divider, TouchableRipple} from 'react-native-paper';
import getAvatarColor from '../../utils/getAvatarColor';
// import LoadingIndicator from '../LoadingIndicator';
import {firebaseTime} from '../../utils/firebaseTime';
import formattedTitle from '../../utils/formattedTitle';
import {onPrimaryDelete, onPrimaryRestore} from '../../utils/functions';
import Premium from '../Premium';
import {useNavigation} from '@react-navigation/native';
import {stackNavigation} from '../../STORE/constants';

const iconProperties = (
  type: boolean | undefined | null,
): {color: string; name: string} => {
  switch (type) {
    case undefined:
      return {color: '#FF0000', name: 'mark-email-unread'};
    case true:
      return {color: '#00cb00', name: 'mark-email-read'};
    case false:
      return {color: '#FFA500', name: 'email'};
    default:
      return {color: '#FF0000', name: 'mark-email-unread'};
  }
};

interface schema {
  item: singlePostAdRequestSchema;
  id: string;
  isInTrash?: boolean;

  setSnackBar: (arg: string) => void;
}

const OrderItSelf = ({
  item,
  id,
  isInTrash=false,
  setSnackBar,
}: schema): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const {itemTitle, time, service, shouldMark} = item;
  const navigation = useNavigation();
  const netInfo = useNetInfo();


  const {date, atTime} = firebaseTime(time);
  const {name, color} = iconProperties(shouldMark);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const onDelete = () => {
    setShowOptions(false);
    if (!netInfo.isConnected) {
      return setSnackBar('Unable to delete while offline');
    }

    onPrimaryDelete({
      collection: !isInTrash ? 'post-ad-requests' : 'trash',
      id,
      item,
    }).catch(() => setSnackBar('Unable to delete the document at the moment!'));
  };

  const onRestore = () => {
    setShowOptions(false);
    // setLoading(true);
    if (!netInfo.isConnected) {
      return setSnackBar('Unable to restore while offline');
    }

    onPrimaryRestore({
      collection: 'post-ad-requests',
      id,
      item,
    }).then((res: any) => {
      setSnackBar(res.message);
      // setLoading(false);
    });
  };

  const onPress = () => {
    navigation.navigate({
      name: stackNavigation.adRequestDetails,
      params: {
        id,
        isInTrash,
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableRipple
        style={styles.button}
        onPress={onPress}
        rippleColor={root.underlayColor}
        // underlayColor={root.underlayColor}
        // activeOpacity={1}
        disabled={loading}>
        <>
          {/* <LoadingIndicator loading={loading} /> */}
          <Badge
            visible={true}
            size={root.primaryBadgeSize}
            style={[styles.badge, {backgroundColor: getAvatarColor(id)}]}>
            {itemTitle[0].toUpperCase()}
          </Badge>

          <View style={styles.detailsContainer}>
            <View style={[styles.flexBox]}>
              <View style={{flex: 1}}>
                <View style={[styles.flexBox, styles.flexBoxJustify]}>
                  <View style={styles.flexBox}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={styles.heading}>
                      Service:{' '}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={[
                        styles.text,
                        shouldMark === undefined && styles.unread,
                      ]}>
                      {formattedTitle(service) || 'Not Specified'}
                    </Text>
                  </View>
                  {isInTrash && <Premium title="Ad Request" />}
                </View>

                <View style={styles.flexBox}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={styles.heading}>
                    Title:{' '}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={[
                      styles.text,
                      shouldMark === undefined && styles.unread,
                    ]}>
                    {formattedTitle(itemTitle) || 'Not Specified'}
                  </Text>
                </View>
              </View>

              {!isInTrash && (
                <MaterialIcons
                  style={styles.marginLeft}
                  name={name}
                  size={root.textSizeXLarge}
                  color={color}
                />
              )}

              <Menu
                visible={showOptions}
                onDismiss={() => setShowOptions(false)}
                anchor={
                  <TouchableOpacity onPress={() => setShowOptions(true)}>
                    <Fontisto
                      name={'more-v-a'}
                      size={root.textSizeLarge}
                      color={root.textColor3}
                      style={styles.more}
                    />
                  </TouchableOpacity>
                }>
                {!isInTrash ? (
                  <>
                    <Menu.Item
                      onPress={onDelete}
                      title="Move To Trash"
                      icon={'trash-can'}
                    />

                    <Menu.Item
                      onPress={() => setShowOptions(false)}
                      title="Approve"
                      icon={'check-decagram'}
                    />
                    <Divider />
                    <Menu.Item
                      onPress={() => {
                        setShowOptions(false);
                        navigation.navigate({
                          name: stackNavigation.editAd,
                          params: {id},
                        });
                      }}
                      title="Edit"
                      icon={'circle-edit-outline'}
                    />

                    {/* <Divider /> */}
                  </>
                ) : (
                  <>
                    <Menu.Item
                      onPress={onRestore}
                      title="Restore"
                      icon={'restore'}
                    />
                    <Divider />
                    <Menu.Item
                      onPress={onDelete}
                      title="Permanently Delete"
                      icon={'trash-can'}
                    />
                    {/* <Divider /> */}
                  </>
                )}
              </Menu>
            </View>

            <View style={styles.dateContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                  styles.smallFont,
                  shouldMark === undefined && styles.unread,
                ]}>
                {date}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                  styles.smallFont,
                  shouldMark === undefined && styles.unread,
                ]}>
                {atTime}
              </Text>
            </View>
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};

export default memo(OrderItSelf);

const styles = StyleSheet.create({
  container: {
    transform: [{scaleY: -1}],
    height: root.primaryTabsHeight + 10,
    justifyContent: 'center',
  },
  button: {
    padding: root.defaultSpace,
    backgroundColor: root.bgColor1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    height: root.primaryTabsHeight,
    elevation: 5,
  },
  unread: {
    fontWeight: root.textWeightBold as any,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 1000,
    backgroundColor: root.bgColor2,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
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
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    alignSelf: 'center',
  },
  more: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  flexBoxJustify: {
    justifyContent: 'space-between',
  },
  marginLeft: {
    marginLeft: 10,
  },
});
