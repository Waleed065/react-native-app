import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

import {root} from '../css';
import NotAvailable from './NotAvailable';
import {useScrollToTop} from '@react-navigation/native';
import {FAB, Snackbar} from 'react-native-paper';

const defaultListViewWidth = root.width;

interface schema {
  objectData: {
    [key: string]: any;
  };

  snackBarTitle?: string;
  notAvailableTitle: string;
  RenderItemComponent: any;
  disableSnak?: boolean;
}

export default function PrimaryPage({
  objectData,

  snackBarTitle,
  notAvailableTitle,
  RenderItemComponent,
  disableSnak = false,
}: schema): JSX.Element {
  const [screenHeight, setScreenHeight] = useState(400);

  const [snackBar, setSnackBar] = useState('');
  const scrollViewRef = useRef<any>(null);

  // for modifying return true instead
  const data = Object.values(objectData);
  const dataProvider: any = new DataProvider((prevOrder, nextOrder) => {
    return (
      prevOrder.shouldMark !== nextOrder.shouldMark ||
      prevOrder.time?.seconds !== nextOrder.time?.seconds
    );
  }).cloneWithRows(data);

  const scrollToTop = () => {
    if (Boolean(dataProvider._data.length)) {
      try {
        return scrollViewRef.current.scrollToEnd({animated: true});
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  useScrollToTop(
    useRef({
      scrollToTop,
    }),
  );

  const layoutProvider = new LayoutProvider(
    index => index,
    (type, dim) => {
      (dim.width = root.width), (dim.height = root.primaryTabsHeight + 10);
    },
  );

  const prevDataLength = useRef(0);
  useEffect(() => {
    if (prevDataLength.current === 0 && !!dataProvider._data.length) {
      setTimeout(() => {
        scrollToTop();
      }, 800);
    }

    if (!disableSnak && dataProvider._data.length < prevDataLength.current) {
      const totalDeletedOrders =
        prevDataLength.current - dataProvider._data.length;
      setSnackBar(
        `${totalDeletedOrders} ${
          snackBarTitle ?? 'item'
        } has been moved to trash`,
      );
    }
    prevDataLength.current = dataProvider._data.length;
  }, [dataProvider._data.length]);

  const renderItem = (type: any, item: any) => {
    return (
      <RenderItemComponent
        item={item}
        id={Object.keys(objectData)[type]}
        setSnackBar={setSnackBar}
        isInTrash={false}
      />
    );
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
            initialRenderIndex={dataProvider._data.length - 1}
            // optimizeForInsertDeleteAnimations={true}
            // disableRecycling
          />
        ) : (
          <NotAvailable title={notAvailableTitle} style={styles.notAvailable} />
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
