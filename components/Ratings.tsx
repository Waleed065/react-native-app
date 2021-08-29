import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {root} from '../css';

interface schema {
  averageRating: number;
}

export default function Ratings({averageRating}: schema): JSX.Element {
  const roundedValue = Math.round(averageRating);

  const stars = (index: number) => {
    if (index === 4 && averageRating >= 4.4 && averageRating <= 4.8)
      return (
        <FontAwesome
          name="star-half-empty"
          size={root.iconSize}
          color={root.primaryThemeColor}
        />
      );
    if (index < roundedValue) {
      return (
        <FontAwesome
          name="star"
          size={root.iconSize}
          color={root.primaryThemeColor}
        />
      );
    } else
      return (
        <FontAwesome
          name="star-o"
          size={root.iconSize}
          color={root.primaryThemeColor}
        />
      );
  };

  return (
    <View style={styles.container}>
      {Array(5)
        .fill(5)
        .map((item, index) => (
          <View key={index}>{stars(index)}</View>
        ))}
      <Text style={styles.text}>{averageRating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
    marginLeft: 5,
  },
});
