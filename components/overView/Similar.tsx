import React, { useCallback, useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { root } from "../../css";
import { setCurrentItemId } from "../../STORE/actions";
import { getServicesItems } from "../../STORE/selectors";
import { stateTypes } from "../../types";
import ItemRow from "../ItemRow";

interface schema {
  item: string;
}
export default function Similar({ item }: schema): JSX.Element {
  const servicesItems = useSelector(getServicesItems);
  const [moreItems, setMoreItems] = useState<any[]>([]);
  const favourityIds = useSelector((state: stateTypes) => state.favourityIds);
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  const condition =
    (servicesItems && !servicesItems.servicesItems.length) || !servicesItems;

  useEffect(() => {
    if (condition) return;
    const newItems =
      servicesItems?.servicesItems.filter((itemObj) => itemObj.item !== item) ??
      [];

    const itemsLength = newItems.length;
    if (itemsLength) {
      setMoreItems([]);
      const times = Math.floor(100 * Math.random() + 200 + itemsLength);
      for (let i = 0; i < times; i++) {
        const num1 = Math.floor(itemsLength * Math.random());
        const num2 = Math.floor(itemsLength * Math.random());

        const temp = newItems[num1];
        newItems[num1] = newItems[num2];
        newItems[num2] = temp;
      }

      newItems.slice(0, 5).forEach((itemObj) => {
        setMoreItems((prevItems: any) => [...prevItems, itemObj]);
      });
    }
  }, [condition, item, servicesItems]);

  const onItemPress = useCallback((itemId: string) => {
    dispatch(setCurrentItemId(itemId));

    // navigation.;
  }, []);

  return (
    <View>
      <Text style={styles.heading}>Similar</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {moreItems.map((item, index) => (
          <View
            key={index}
            style={[
              styles.itemContainer,
              index === 0 && { marginLeft: root.defaultSpace },
            ]}
          >
            <ItemRow
              item={item}
              columnNumber={0}
              isFavourite={favourityIds.indexOf(item.item) > -1}
              onPress={onItemPress}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginRight: root.defaultSpace,
  },
  heading: {
    marginHorizontal: root.defaultSpace,
    marginBottom: 5,
    color: root.textColor2,
    fontSize: root.textSizeLarge,
    fontWeight: root.textWeightBold as any,
  },
});
