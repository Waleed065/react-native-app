import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {useSelector, useDispatch} from 'react-redux';
import {servicesCategoryItemType, stateTypes} from '../../types';
import LoadingIndicator from '../LoadingIndicator';
import {root} from '../../css';
import ItemRow from '../ItemRow';
// import NotAvailable from "../NotAvailable";
import {removeFavourites, setFavourites} from '../../STORE/actions';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
// import { useNavigation } from "@react-navigation/native";

export default function Favourites(): JSX.Element {
  const favourityIds = useSelector((state: stateTypes) => state.favourityIds);
  const favouritesDocs = useSelector((state: stateTypes) => state.favourites);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!favourityIds) return;
    const newFavourityIdsList: any = [];
    favourityIds.forEach(id => {
      if (!favouritesDocs.some(favourite => favourite.item === id)) {
        newFavourityIdsList.push(id);
      }
    });
    favouritesDocs.forEach(itemDoc => {
      if (!(favourityIds.indexOf(itemDoc.item) > -1)) {
        dispatch(removeFavourites(itemDoc.item));
      }
    });

    if (!newFavourityIdsList.length) return;
    setLoading(true);

    newFavourityIdsList.forEach((itemId: string) => {
      firestore()
        .collectionGroup('items')
        .where('documentId', '==', itemId)
        .get()
        .then((snapShot: any) => {
          const newDoc: servicesCategoryItemType[] = [];
          snapShot.forEach((snap: any) => {
            const path = snap.ref.path.split('/');
            newDoc.push({
              document: snap.data() as servicesCategoryItemType['document'],
              category: path[7],
              destination: {
                country: path[3],
                city: path[5],
              },
              item: path[9],
              tab: path[1],
            });
          });
          setLoading(false);
          if (newDoc.length) {
            dispatch(setFavourites(newDoc));
          }
        });
    });
  }, [favourityIds]);

  //   const loading = useSelector((state: stateTypes) => state.servicesLoading);
  // const navigation = useNavigation();

  const dataProvider = new DataProvider(() => {
    return false;
  });
  const [data, setData] = useState<any>(dataProvider.cloneWithRows([]));
  const [listViewHeight, setListViewHeight] = useState(400);

  useEffect(() => {
    if (!favouritesDocs?.length) return;
    setData(data.cloneWithRows(favouritesDocs));
  }, [favouritesDocs]);

  const layoutProvider = new LayoutProvider(
    index => index % 2,
    (type, dim) => {
      dim.width = root.itemWidth;
      dim.height = root.itemHeight;
    },
  );

  const onItemPress = useCallback((itemId: string) => {
    // navigation.navigate("/our-services-current-item", { itemParam: itemId });
  }, []);

  const renderItem = (columnNumber: any, item: servicesCategoryItemType) => {
    return (
      <ItemRow
        item={item}
        columnNumber={columnNumber}
        isFavourite={favourityIds.indexOf(item.item) > -1}
        onPress={onItemPress}
      />
    );
  };

  return (
    <>
      <LoadingIndicator loading={loading} />
      <View style={styles.container}>
        <View
          style={[styles.recyclerlistview, {height: listViewHeight}]}
          onLayout={e => setListViewHeight(e.nativeEvent.layout.height)}>
          {Boolean(data._data?.length) && (
            <RecyclerListView
              dataProvider={data}
              layoutProvider={layoutProvider}
              rowRenderer={renderItem}
              columnWrapperStyle={styles.columnWrapperStyle}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: root.defaultSpace,
    flex: 1,
  },

  recyclerlistview: {
    flex: 1,
    width: root.width - root.defaultSpace * 2,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    borderWidth: 1,
  },
});
