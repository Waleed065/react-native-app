import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {root} from '../css';
import formattedTitle from '../utils/formattedTitle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

const icons: {[tab: string]: JSX.Element} = {
  hotels: (
    <FontAwesome5
      name="hotel"
      size={root.textSizeNormal}
      color={root.primaryThemeColor}
    />
  ),
  cars: (
    <FontAwesome5
      name="car"
      size={root.textSizeNormal}
      color={root.primaryThemeColor}
    />
  ),
  security: (
    <FontAwesome5
      name="shield-alt"
      size={root.textSizeNormal}
      color={root.primaryThemeColor}
    />
  ),
};

interface schema {
  onPress: (arg: string) => void;
  item: string;
  showTabs?: boolean;
}
const DestinationOption = ({onPress, item, showTabs}: schema): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.citiesItemContainer}
      onPress={() => onPress(item)}>
      {showTabs ? (
        icons[item]
      ) : (
        <Entypo
          name="location-pin"
          size={root.iconSize}
          color={root.primaryThemeColor}
        />
      )}

      <Text style={styles.citiesItemText}>{formattedTitle(item)}</Text>
    </TouchableOpacity>
  );
};

export default DestinationOption;

const styles = StyleSheet.create({
  citiesItemContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  citiesItemText: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    marginLeft: 5,
  },
});
