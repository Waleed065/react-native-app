import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import formattedTitle from '../../utils/formattedTitle';
import Ratings from '../Ratings';
import {root} from '../../css';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface headerSchema {
  title: string;
  averageRating: number;
}

export default function OurServicesHeader({
  title,
  averageRating,
}: headerSchema): JSX.Element {
  return (
    <View style={styles.header}>
      <View style={styles.headerMiddleView}>
        <Text style={styles.heading} numberOfLines={1} ellipsizeMode={'tail'}>
          {formattedTitle(title)}
        </Text>
        <Ratings averageRating={averageRating} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: root.bgColor1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    paddingHorizontal: root.defaultSpace,
  },
  headerMiddleView: {
    flex: 1,
  },


  heading: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
  },
});
