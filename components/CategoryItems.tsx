import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {servicesCategoryItemType} from '../types';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import {root} from '../css';
import formattedTitle from '../utils/formattedTitle';
import {addToFavourites, removeFromFavourites} from '../utils/functions';

interface schema {
  categoryItem: servicesCategoryItemType;
  index: number;
  isFavourite: boolean;
  onPress: (arg: string) => void;
}

const CategoryItems = ({
  categoryItem,
  index,
  isFavourite,
  onPress,
}: schema): JSX.Element => {
  const {
    document: {avatar, title, premium, about, price},
    destination,
    item,
  } = categoryItem;

  const {country, city} = destination;

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={root.activeOpacity}
      style={[
        styles.item,
        index === 0 && {marginHorizontal: root.defaultSpace},
      ]}>
      {premium && (
        <LinearGradient
          colors={root.premium}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.premium}>
          <Text style={styles.premiumText}>PREMIUM</Text>
        </LinearGradient>
      )}
      {isFavourite ? (
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => removeFromFavourites(item)}>
          <AntDesign name="heart" size={24} color={root.primaryThemeColor} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => addToFavourites(item)}>
          <AntDesign name="hearto" size={24} color={root.primaryThemeColor} />
        </TouchableOpacity>
      )}

      <Image
        source={{uri: avatar}}
        style={styles.avatar}
        resizeMode={'stretch'}
      />

      <View style={styles.itemDetailsContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>
          {title}
        </Text>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>
          ${price}
        </Text>
        <View>
          <Text style={styles.details} numberOfLines={3} ellipsizeMode="tail">
            {about}
          </Text>

          <View style={styles.flexRow}>
            <Entypo
              name="location-pin"
              size={root.textSizeSmall}
              color="green"
            />
            <Text
              style={styles.seeDetails}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {formattedTitle(city) + '/' + formattedTitle(country)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// function shouldUpdate() {
//   return true;
// }
export default memo(CategoryItems);

const styles = StyleSheet.create({
  item: {
    // marginRight: root.defaultSpace,
    marginVertical: root.defaultSpace,
    width: root.servicesItemWidth,
    height: root.servicesItemHeight,
    // alignItems: "center",

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 20,
    backgroundColor: root.bgColor1,
  },
  avatar: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 0,
    // width: "100%",
    height: root.servicesItemWidth * 0.6,
  },
  itemDetailsContainer: {
    width: '100%',
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
    flexGrow: 1,
    justifyContent: 'space-between',
    // alignItems: "center",
    backgroundColor: root.primaryThemeColorLite,
  },

  title: {
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
    marginBottom: 5,
    // textAlign: "center",
  },

  premium: {
    position: 'absolute',
    top: root.defaultSpace,
    left: root.defaultSpace,
    zIndex: 1,
    width: 70,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: root.textWeightBold as any,
    color: root.textColor1,
  },
  details: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    // textAlign: "center",
  },
  seeDetails: {
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
    color: root.textColor2Faded,
  },
  heartIcon: {
    position: 'absolute',
    top: root.defaultSpace,
    right: root.defaultSpace,
    zIndex: 1,
  },
  flexRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: "center",
  },
});
