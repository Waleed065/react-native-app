import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {stateTypes} from '../types';
// import {
//   getWhiteListCities,
//   getPostAdWhiteListCities,
// } from "../STORE/selectors";
import {root} from '../css';
import formattedTitle from '../utils/formattedTitle';
// import BottomSheetDestination from './BottomSheetDestination';
// import {getWhiteListCities} from '../STORE/selectors';
// import {setDestination} from '../STORE/actions';

// import SearchList from "./SearchList";
// import { setDestination, setPostAdDestination } from "../STORE/actions";

interface schema {
  postAd?: boolean;
  setSnackBarNotification?: (arg: string) => void;
  city: string;
}

export default function SearchCity({
  postAd,
  setSnackBarNotification,
  city,
}: schema): JSX.Element {
  // const cities = useSelector(getWhiteListCities);
  // const dispatch = useDispatch();

  // const destination = useSelector((state: stateTypes) =>
  //   postAd ? state.postAdDestination : state.destination,
  // );
  // const bottomSheetRef = useRef<any>(null);
  return (
    <>
      <TouchableOpacity
        style={styles.locationContainer}
        onPress={() => {
          if (!postAd) {
            // bottomSheetRef.current?.open();
          } else if (postAd && setSnackBarNotification) {
            setSnackBarNotification('Admins can not edit city!');
          }
        }}>
        <FontAwesome5
          name="map-marked"
          size={root.iconSize}
          color={root.primaryThemeColor}
        />
        <Text style={styles.locationText}>{formattedTitle(city)}</Text>
      </TouchableOpacity>

      {/* <BottomSheetDestination
        ref={bottomSheetRef}
        onPress={city => {
          dispatch(setDestination({...destination, city}));
          bottomSheetRef.current?.close();
        }}
        data={cities}
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40,
  },
  locationText: {
    marginHorizontal: 5,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    color: root.textColor2,
  },

  inputStyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    borderColor: root.primaryThemeColor,
    padding: 5,
  },
});
