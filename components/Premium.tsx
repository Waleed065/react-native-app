import React from 'react';
import {Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {root} from '../css';

interface schema {
  title?: string;
  style?: any;
}
export default function Premium({title, style}: schema): JSX.Element {
  return (
    <LinearGradient
      colors={root.premium}
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={[styles.premium, style]}>
      <Text style={styles.premiumText}>{title ?? 'PREMIUM'}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  premium: {
    // position: 'absolute',
    // top: root.defaultSpace,
    // left: root.defaultSpace,
    // zIndex: 1,
    width: 75,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: root.textWeightBold as any,
    color: root.textColor1,
  },
});
