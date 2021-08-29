import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import Entypo from 'react-native-vector-icons/Entypo';
import {root} from '../css';
import formattedTitle from '../utils/formattedTitle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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

const defaultListViewHeight =
  root.bottomSheetHeight - root.defaultSpace * 3 - 50;
const defaultListViewWidth = root.width - root.defaultSpace * 2;

interface schema {
  data: string[];
  onPress: (item: string) => void;
  showTabs?: boolean;
  placeholder?: string;
}

export default function SearchList({
  data,
  onPress,
  showTabs,
  placeholder,
}: schema): JSX.Element {
  const [filteredCountry, setFilteredValue] = useState('');
  const [listViewHeight, setListViewHeight] = useState(defaultListViewHeight);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    Keyboard.addListener('keyboardWillShow', keyboardDidShow);
    Keyboard.addListener('keyboardWillHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
      Keyboard.removeListener('keyboardWillShow', keyboardDidShow);
      Keyboard.removeListener('keyboardWillHide', keyboardDidHide);
    };
  }, []);

  const keyboardDidShow = (e: any) => {
    setListViewHeight(defaultListViewHeight - e.endCoordinates?.height);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  const keyboardDidHide = () => {
    setListViewHeight(defaultListViewHeight);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  };

  const dataProvider = new DataProvider(
    (r1, r2) => r1.alpha2Code !== r2.alpha2Code,
  ).cloneWithRows(
    data.filter(item =>
      item.toLowerCase().includes(filteredCountry.toLowerCase()),
    ),
  );

  const layoutProvider = useRef(
    new LayoutProvider(
      index => index,
      (type, dim) => {
        (dim.width = root.width), (dim.height = 50);
      },
    ),
  );

  const rowRenderer = (type: any, item: string) => {
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

  return (
    <>
      {(dataProvider as any)._data.length > 0 ? (
        <View
          style={{
            height: listViewHeight,
            width: defaultListViewWidth,
          }}>
          <RecyclerListView
            dataProvider={dataProvider}
            layoutProvider={layoutProvider.current}
            rowRenderer={rowRenderer}
          />
        </View>
      ) : (
        <View style={{height: listViewHeight}} />
      )}

      <TextInput
        placeholder={placeholder || 'Search...'}
        removeClippedSubviews={true}
        placeholderTextColor={root.primaryThemeColor}
        value={filteredCountry}
        onChangeText={e => setFilteredValue(e)}
        style={styles.bottomSheetInput}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  bottomSheetInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    borderColor: root.primaryThemeColor,
    padding: 5,
    height: 50,
    marginTop: root.defaultSpace,
    bottom: 0,
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
});
