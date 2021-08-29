import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {root} from '../../css';
import Entypo from 'react-native-vector-icons/Entypo';

interface schema {
  averageRating: number;
}

export default function RatingsChrisma({averageRating}: schema): JSX.Element {
  return (
    <View style={styles.flexBox}>
      <Entypo name="star" size={40} color={root.primaryThemeColor} />
      <View style={styles.space}>
        <Text style={styles.themeText}>
          {averageRating.toFixed(1)}/5 Very Good
        </Text>
        <Text style={styles.text}>
          Customers rated this {averageRating.toFixed(1)} out of 5
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  themeText: {
    color: root.primaryThemeColor,
    fontWeight: root.textWeightBold as any,
    fontSize: root.textSizeLarge,
  },
  text: {
    marginTop: 5,
    color: root.textColor2,
    fontWeight: root.textWeightThin as any,
    fontSize: root.textSizeNormal,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: root.defaultSpace,
  },
  space: {
    marginLeft: 10,
  },
});
