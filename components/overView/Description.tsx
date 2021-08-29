import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {root} from '../../css';
import formattedTitle from '../../utils/formattedTitle';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

interface descriptionContainer {
  premium: boolean;
  destination: {
    country: string;
    city: string;
  };
  price: number;
}
export default function DescriptionContainer({
  premium,
  destination,
  price,
}: descriptionContainer): JSX.Element {
  const {country, city} = destination;

  return (
    <View style={styles.tabContainer}>
      <View style={styles.flexRow}>
        <Entypo name="location-pin" size={root.textSizeNormal} color="green" />
        <Text
          style={styles.descriptionDetails}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {formattedTitle(city) + '/' + formattedTitle(country)}
        </Text>
      </View>

      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.descriptionDetails}>
        ${price}
      </Text>

      {premium && (
        <LinearGradient
          colors={root.premium}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.premium}>
          <Text style={styles.buttonText}>PREMIUM</Text>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: root.textColor3,
    marginHorizontal: root.defaultSpace,
    borderStyle: 'dashed',

    flexDirection: 'row',
    height: 50,
    paddingHorizontal: root.defaultSpace,
    alignItems: 'center',
  },
  descriptionTitle: {
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
    color: root.textColor2,
  },
  descriptionDetails: {
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    color: root.textColor3,
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "space-between",
  },
  buttonText: {
    color: root.textColor1,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightBold as any,
  },
  premium: {
    height: 25,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
