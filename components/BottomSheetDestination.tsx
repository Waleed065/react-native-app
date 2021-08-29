import React, {forwardRef, useCallback, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {root} from '../css';
import BottomSheet from './BottomSheet';
import DestinationOption from './DestinationOption';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 80,
};

type PropsType = {
  data: any[];
  onPress: (arg: string) => void;
};
type RefType = Modalize | null;

const AllCountries = forwardRef<RefType, PropsType>(
  (props, ref): JSX.Element => {
    const {data, onPress} = props;
    const [filteredValue, setFilteredValue] = useState('');

    const getItemLayout = (data: any, index: number) => {
      return {
        length: root.width - root.defaultSpace * 4,
        offset: 50 * index,
        index,
      };
    };

    const renderItem = ({item}: {item: string}) => {
      return <DestinationOption onPress={onPress} item={item} />;
    };

    const keyExtractor = useCallback(item => item, []);

    return (
      <BottomSheet
        ref={ref}
        FooterComponent={() => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Search Country'}
              placeholderTextColor={root.primaryThemeColor}
              autoCorrect={false}
              defaultValue={filteredValue}
              onChangeText={setFilteredValue}
              style={styles.bottomSheetInput}
            />
          </View>
        )}
        flatListProps={{
          contentContainerStyle: styles.faltListStyle,
          data: data.filter(item =>
            item.toLowerCase().includes(filteredValue.toLowerCase()),
          ),
          keyExtractor,
          renderItem,
          initialNumToRender: 10,
          maxToRenderPerBatch: 10,
          windowSize: 5,
          // removeClippedSubviews: true,
          viewabilityConfig,
          getItemLayout,
          // updateCellsBatchingPeriod: 100
        }}
      />
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
