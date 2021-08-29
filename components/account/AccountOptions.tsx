import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {root} from '../../css';
import {stackNavigation} from '../../STORE/constants';

interface schema {
  id: string;
}
export default function AccountOptions({id}: schema): JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableRipple
        style={styles.buttonContainer}
        rippleColor={root.underlayColor}
        onPress={() =>
          navigation.navigate({
            name: stackNavigation.userAdTabs,
            params: {
              id,
            },
          })
        }>
        <>
          <View style={styles.iconBox}>
            <FontAwesome5
              name="adversal"
              size={24}
              color={root.primaryThemeColor}
            />
          </View>
          <Text style={styles.text}>User Ads</Text>
        </>
      </TouchableRipple>
      <TouchableRipple
        style={styles.buttonContainer}
        rippleColor={root.underlayColor}
        onPress={() =>
          navigation.navigate({
            name: stackNavigation.userOrders,
            params: {
              id,
            },
          })
        }>
        <>
          <View style={styles.iconBox}>
            <FontAwesome5
              name="list-ol"
              size={24}
              color={root.primaryThemeColor}
            />
          </View>
          <Text style={styles.text}>User Orders</Text>
        </>
      </TouchableRipple>
      {/* <TouchableRipple
        style={styles.buttonContainer}
        onPress={() =>
          navigation.navigate(
            accountNavigation.userFavourites, {id})
        }>
        <View style={styles.iconBox}>
          <Entypo name="heart" size={30} color={root.primaryThemeColor} />
        </View>
        <Text style={styles.text}>User Favourites</Text>
      </TouchableRipple> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    backgroundColor: root.bgColor1,
    width: '48%',
    height: 150,
    borderRadius: 5,
    marginTop: root.defaultSpace,
    // padding: 10,

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: root.primaryThemeColorLite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
  },
});
