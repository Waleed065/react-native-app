import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// import {useSelector} from 'react-redux';

import SearchCountry from './SearchCountry';
import SearchCity from './SearchCity';

// import {
//   getServicesHeadings,
//   getPostAdServicesHeadings,
// } from '../STORE/selectors';
import {root} from '../css';

interface schema {
  postAd?: boolean;
  setSnackBarNotification?: (arg: string) => void;
  destination: {
    country:string,
    city:string
  }
}

export default function SearchLocation({
  postAd,
  setSnackBarNotification,
  destination
}: schema): JSX.Element {
  // const {locationHeadingOne, locationHeadingTwo} = useSelector(
  //   postAd ? getPostAdServicesHeadings : getServicesHeadings,
  // ).headings.document;

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <View style={styles.flexBox}>
          <Text style={styles.locationText}>Country </Text>
          {postAd && <MaterialIcons name="edit-off" color={'red'} size={20} />}
        </View>
        <SearchCountry
          postAd={postAd}
          setSnackBarNotification={setSnackBarNotification}
          country={destination.country}
        />
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.flexBox}>
          <Text style={styles.locationText}>City </Text>
          {postAd && <MaterialIcons name="edit-off" color={'red'} size={20} />}
        </View>
        <SearchCity
          postAd={postAd}
          setSnackBarNotification={setSnackBarNotification}
          city={destination.city}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: root.defaultVerticalSpace,
  },
  locationContainer: {
    width: '48%',
    // position: 'relative',
  },
  locationText: {
    color: root.textColor2,
    fontSize: root.textSizeLarge,
    fontWeight: root.textWeightBold as any,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
