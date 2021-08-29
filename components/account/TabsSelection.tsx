import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {root} from '../../css';
import formattedTitle from '../../utils/formattedTitle';

interface schema {
  setSnackBarNotification: (arg: string) => void;
  service: string;
}
export default function TabsSelection({
  setSnackBarNotification,
  service
}: schema): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabContainer}
        // onPress={() => bottomSheetRef.current?.open()}
        onPress={() => setSnackBarNotification('Admins can not edit service!')}>
        <Entypo name="chevron-down" size={24} color={root.primaryThemeColor} />

        <Text style={styles.locationText}>{formattedTitle(service)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 5,
  },
  tabContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 40,
  },
  locationText: {
    marginHorizontal: 5,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    color: root.textColor2,
  },
  citiesItemContainer: {
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
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: root.primaryThemeColor,
    padding: 5,
  },
});
