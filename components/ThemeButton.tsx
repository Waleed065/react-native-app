import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {root} from '../css';
import LinearGradient from 'react-native-linear-gradient';

interface schema {
  onPress: () => void;
  text: string;
}

export default function ThemeButton({onPress, text}: schema): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      // onPress={() => setVerifyCodeTrue()}
    >
      <LinearGradient
        colors={root.primaryThemeColorDarkGradient}
        style={styles.buttonContainer}>
        <Text style={styles.verifyText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  verifyText: {
    color: root.textColor1,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
  },
});
