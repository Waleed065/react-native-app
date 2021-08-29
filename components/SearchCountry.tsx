import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
// import {stateTypes} from '../types';
// import BottomSheetDestination from './BottomSheetDestination';
// import {
//   getWhiteListCountries,
//   getPostAdWhiteListCountries,
// } from '../STORE/selectors';
// import {setDestination} from '../STORE/actions';
import {root} from '../css';
import formattedTitle from '../utils/formattedTitle';
// import BottomSheet from "./BottomSheet";
// import SearchList from "./SearchList";

interface schema {
  postAd?: boolean;
  setSnackBarNotification?: (arg: string) => void;
  country: string;
}

export default function SearchCity({
  postAd,
  setSnackBarNotification,
  country
}: schema): JSX.Element {
  // const countries = useSelector(
  //   postAd ? getPostAdWhiteListCountries : getWhiteListCountries,
  // );

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
            setSnackBarNotification('Admins can not edit country!');
          }
        }}>
        <Entypo
          name="globe"
          size={root.iconSize}
          color={root.primaryThemeColor}
        />

        <Text style={styles.locationText}>
          {formattedTitle(country)}
        </Text>
      </TouchableOpacity>

      {/* <BottomSheetDestination
        ref={bottomSheetRef}
        onPress={item => {
          dispatch(setDestination({country: item, city: countries[item][0]}));
          bottomSheetRef.current?.close();
        }}
        data={Object.keys(countries)}></BottomSheetDestination> */}
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
