import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import {useSelector} from 'react-redux';
import {root} from '../../css';
import {stateTypes} from '../../types';
import NotAvailable from '../NotAvailable';
import OrderItSelf from '../orders/OrderItSelf';
import {useScrollToTop} from '@react-navigation/native';
import {FAB, Snackbar} from 'react-native-paper';

import PostAdTabItSelf from '../adRequests/PostAdTabItSelf';
import ContactUsTabItSelf from '../contactUs/ContactUsTabItSelf';

const chatHeight = 90;
const defaultListViewWidth = root.width;

export default function Trash(): JSX.Element {
  const [screenHeight, setScreenHeight] = useState(400);
  const trash = useSelector((state: stateTypes) => state.trash);
  const [snackBar, setSnackBar] = useState('');

  const scrollViewRef = useRef<any>(null);

  const data = Object.values(trash);
  const dataProvider: any = new DataProvider((prevOrder, nextOrder) => {
    return (
      prevOrder.shouldMark !== nextOrder.shouldMark ||
      prevOrder.time?.seconds !== nextOrder.time?.seconds
    );
  }).cloneWithRows(data);

  const scrollToTop = () => {
    if (Boolean(dataProvider._data.length)) {
      return scrollViewRef.current.scrollToEnd({animated: true});
    }
    return null;
  };

  useScrollToTop(
    useRef({
      scrollToTop: scrollToTop,
    }),
  );

  useEffect(() => {
    const timer = setTimeout(() => scrollToTop(), 800);
    return () => clearTimeout(timer);
  }, []);

  const layoutProvider = new LayoutProvider(
    index => index,
    (type, dim) => {
      (dim.width = root.width), (dim.height = chatHeight + 10);
    },
  );

  const renderItem = (type: any, item: any) => {
    switch (item.collection) {
      case 'orders':
        return (
          <OrderItSelf
            item={item}
            id={Object.keys(trash)[type]}
            isInTrash={true}
            setSnackBar={setSnackBar}
          />
        );
      case 'post-ad-requests':
        return (
          <PostAdTabItSelf
            item={item}
            id={Object.keys(trash)[type]}
            isInTrash={true}
            setSnackBar={setSnackBar}
          />
        );
      case 'contact-us':
        return (
          <ContactUsTabItSelf
            item={item}
            id={Object.keys(trash)[type]}
            isInTrash={true}
            setSnackBar={setSnackBar}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={styles.container}
      onLayout={e => setScreenHeight(e.nativeEvent.layout.height)}>
      <View style={[styles.flatListStyle, {height: screenHeight}]}>
        {Boolean(dataProvider._data.length) ? (
          <RecyclerListView
            ref={scrollViewRef}
            dataProvider={dataProvider}
            layoutProvider={layoutProvider}
            rowRenderer={renderItem}
            contentContainerStyle={styles.contentContainerStyle}

            // optimizeForInsertDeleteAnimations={true}
            // disableRecycling
          />
        ) : (
          <NotAvailable
            style={styles.notAvailable}
            title={'Trash is empty 🗑'}
          />
        )}
      </View>

      <FAB
        style={styles.fab}
        // visible={true}
        color={root.primaryThemeColor}
        small
        icon="chevron-double-up"
        onPress={scrollToTop}
      />

      <Snackbar
        visible={Boolean(snackBar.length)}
        onDismiss={() => setSnackBar('')}
        duration={5000}
        theme={{colors: {accent: root.primaryThemeColor}}}
        action={{
          label: 'Close',
          onPress: () => setSnackBar(''),
        }}>
        {snackBar}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: getStatusBarHeight(),
    flex: 1,
    backgroundColor: root.bgColor1,
  },
  flatListStyle: {
    width: defaultListViewWidth,
    transform: [{scaleY: -1}],
    justifyContent: 'flex-end',
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: root.primaryThemeColorLite,
  },
  activityIndicator: {
    margin: 10,
    position: 'absolute',
  },
  notAvailable: {
    transform: [{scaleY: -1}],
  },
});
