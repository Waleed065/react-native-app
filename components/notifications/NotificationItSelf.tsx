import React, {memo, useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {root} from '../../css';
import {notificationType, stateTypes} from '../../types';
import {TouchableRipple} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {firebaseTime} from '../../utils/firebaseTime';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

interface schema {
  item: notificationType;
  id: string;
  setSnackBar: (arg: string) => void;
}

const OrderItSelf = ({item, id, setSnackBar}: schema): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const {time, content, heading, navigateTo, reduxRef} = item;
  const navigation = useNavigation();
  const shouldMark = useSelector(
    (state: stateTypes) => state.notifications[id]?.shouldMark,
  );
  const isAvailable = useSelector((state: stateTypes) =>
    reduxRef
      ? Object.prototype.hasOwnProperty.call(state[reduxRef], id)
      : false,
  );

  const {date, atTime} = firebaseTime(time);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const onPress = () => {
    if (!isAvailable) {
      return setSnackBar('This product has been deleted!');
    }
    navigation.navigate(navigateTo);
  };

  return (
    <View style={styles.container}>
      <TouchableRipple
        style={[
          styles.button,
          isAvailable &&
            shouldMark === false && {backgroundColor: root.underlayColor},
          !isAvailable && {backgroundColor: root.bgColor2},
        ]}
        onPress={onPress}
        rippleColor={root.underlayColor}
        disabled={loading}>
        <>
          <Entypo name="new" color={root.primaryThemeColor} size={50} />

          <View style={styles.detailsContainer}>
            <View style={styles.flexBox}>
              <View style={{flex: 1}}>
                <View style={[styles.flexBox, styles.flexBoxJustify]}>
                  <View style={styles.flexBox}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={'tail'}
                      style={styles.heading}>
                      {heading || 'Not Specified'}
                    </Text>
                  </View>
                </View>

                <View style={styles.flexBox}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={[
                      styles.text,
                      shouldMark === false && styles.unread,
                    ]}>
                    {content || 'Not Specified'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.dateContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                  styles.smallFont,
                  shouldMark === false && styles.unread,
                ]}>
                {date}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                  styles.smallFont,
                  shouldMark === false && styles.unread,
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
