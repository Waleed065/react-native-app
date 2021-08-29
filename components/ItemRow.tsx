import React, {memo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {root} from '../css';
import formattedTitle from '../utils/formattedTitle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {servicesCategoryItemType} from '../types';
import LinearGradient from 'react-native-linear-gradient';
import {addToFavourites, removeFromFavourites} from '../utils/functions';

function alignSelf(type: number) {
  switch (type) {
    case 0:
      return 'flex-start';
    case 1:
      return 'flex-end';
    default:
      return 'flex-start';
  }
}

interface schema {
  columnNumber: number;
  item: servicesCategoryItemType;
  isFavourite: boolean;
  onPress: (itemId: string) => void;
}

const ItemRow = ({
  item,
  columnNumber,
  isFavourite,
  onPress,
}: schema): JSX.Element => {
  const {
    document: {title, price, avatar, premium, about},
    destination,
    tab,
    item: itemId,
    // category,
  } = item;
  const {country, city} = destination;
  return (
    <TouchableOpacity
      onPress={() => onPress(itemId)}
      activeOpacity={root.activeOpacity}
      style={[styles.container, {alignSelf: alignSelf(columnNumber)}]}>
      {premium && (
        <LinearGradient
          colors={root.premium}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.premium}>
          <Text style={styles.premiumText}>PREMIUM</Text>
        </LinearGradient>
      )}

      <Image
        style={styles.avatar}
        source={{uri: avatar}}
        resizeMode={'cover'}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>${price}</Text>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode={'tail'}>
          {formattedTitle(title)}
        </Text>
        <Text style={styles.text} numberOfLines={2} ellipsizeMode={'tail'}>
          {about}
        </Text>

        <Text
          style={styles.smallHeading}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {formattedTitle(tab)}
        </Text>

        <View style={styles.flexRow}>
          <Entypo name="location-pin" size={root.textSizeSmall} color="green" />
          <Text
            style={styles.smallFont}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {formattedTitle(city) + '/' + formattedTitle(country)}
          </Text>
        </View>
      </View>
      {isFavourite ? (
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => removeFromFavourites(itemId)}>
          <AntDesign name="heart" size={20} color={root.primaryThemeColor} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => addToFavourites(itemId)}>
          <AntDesign name="hearto" size={20} color={root.primaryThemeColor} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default memo(ItemRow);

const styles = StyleSheet.create({
  container: {
    marginBottom: root.defaultSpace,
    // flex: 1,
    width: root.itemWidth - 5,
    height: root.itemHeight - 10,
    borderRadius: 10,
    overflow: 'hidden',

    borderWidth: 1,
    borderColor: root.bgColor2,
  },
  avatar: {
    width: '100%',
    height: (root.itemWidth - 10) * 0.8,
    zIndex: 0,
  },
  detailsContainer: {
    padding: root.defaultSpace,
    paddingTop: 0,
    flex: 1,
    justifyContent: 'space-between',
  },
  heading: {
    marginTop: 5,

    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
    marginRight: 5,
  },
  smallHeading: {
    marginTop: 5,

    color: root.textColor3,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightBold as any,
    marginRight: 5,
  },
  text: {
    marginTop: 5,

    color: root.textColor2,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
  },
  titleText: {
    marginTop: 5,

    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    textDecorationLine: 'underline',
  },
  flexRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallFont: {
    color: root.textColor3,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
  },
  heartIcon: {
    position: 'absolute',
    top: root.defaultSpace,
    right: root.defaultSpace,
    backgroundColor: root.bgColor1,
    borderRadius: 1000,
    padding: 6,
    zIndex: 1,
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
});
