import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {root} from '../css';

interface schema {
  title: string;
  style?: any;
}

export default function NotAvailable({title, style}: schema): JSX.Element {
  return (
    <View style={[styles.noAdsContainer, style]}>
      <FontAwesome5 name="list-alt" size={30} color={root.primaryThemeColor} />

      <Text style={styles.noAdsText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noAdsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  noAdsText: {
    color: root.primaryThemeColor,
    fontSize: root.textSizeLarge,
    fontWeight: root.textWeightBold as any,
    marginTop: 10,
  },
});
