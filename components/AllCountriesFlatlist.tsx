import React, {forwardRef, useCallback, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Modalize} from 'react-native-modalize';

import {root} from '../css';
import {countries} from '../utils/countries';
import BottomSheet from './BottomSheet';
import CountryOption from './CountryOption';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 80,
};

type countrySchema = {
  name: string;
  alpha2Code: string;

  flag: string;
  emoji: string;
  callingCodes: string[];
};
type PropsType = {
  onPress: ({callingCode, emoji}: {callingCode: string; emoji: string}) => void;
};
type RefType = Modalize | null;

const AllCountries = forwardRef<RefType, PropsType>(
  (props, ref): JSX.Element => {
    const {onPress} = props;
    const [filteredCountry, setFilteredCountry] = useState('');

    const getItemLayout = (data: any, index: number) => {
      return {
        length: root.width - root.defaultSpace * 2,
        offset: 50 * index,
        index,
      };
    };

    const renderItem = useCallback(({item}: {item: countrySchema}) => {
      return <CountryOption onPress={onPress} item={item} />;
    }, []);

    const keyExtractor = useCallback(item => item.alpha2Code, []);

    return (
      <>
        <BottomSheet
          ref={ref}
          FooterComponent={() => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'Search Country'}
                placeholderTextColor={root.primaryThemeColor}
                autoCorrect={false}
                defaultValue={filteredCountry}
                onChangeText={setFilteredCountry}
                style={styles.bottomSheetInput}
              />
            </View>
          )}
          flatListProps={{
            contentContainerStyle: styles.faltListStyle,
            data: countries.filter(country =>
              country.name
                .toLowerCase()
                .includes(filteredCountry.toLowerCase()),
            ),
            keyExtractor,
            renderItem,
            initialNumToRender: 10,
            maxToRenderPerBatch: 10,
            windowSize: 5,
            // removeClippedSubviews: true,
            viewabilityConfig,
            getItemLayout,
            showsVerticalScrollIndicator: false,
            // updateCellsBatchingPeriod: 100
          }}
        />
      </>
    );
  },
);

export default AllCountries;

const styles = StyleSheet.create({
  inputContainer: {
    padding: root.defaultSpace,
    bottom: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: root.primaryThemeColor,
  },
  bottomSheetInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    borderColor: root.primaryThemeColor,
    padding: 5,
    height: 50,
    backgroundColor: root.bgColor1,
  },
  faltListStyle: {
    flexGrow: 1,
  },
});
