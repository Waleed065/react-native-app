import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {root} from '../../css';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface schema {
  sentAt: number;
  from: boolean;
}

export default function DateAndTime({sentAt, from}: schema): JSX.Element {
  return (
    <View style={styles.bottomTextContainer}>
      <Text style={styles.dateText}>
        {new Date(sentAt).toLocaleDateString()}
      </Text>

      <View style={styles.bottomTextContainer}>
        <Text style={[styles.dateText, styles.marginLeft]}>
          {new Date(sentAt).toLocaleTimeString()}
        </Text>
        {!from && (
          <Ionicons
            style={styles.marginLeft}
            name="checkmark-done"
            size={root.textSizeSmall}
            color={root.textColor1}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: 10,
  },
  dateText: {
    color: root.bgColor2,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
  },
});
