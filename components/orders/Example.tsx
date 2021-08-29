// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// import React, {useRef, useState, useEffect, useCallback} from 'react';
// import {StyleSheet, View} from 'react-native';

// import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useSelector} from 'react-redux';
// import {root} from '../../css';
// import {stateTypes, singleOrderSchema} from '../../types';
// import NotAvailable from '../NotAvailable';
// import OrderItSelf from './OrderItSelf';
// import {useScrollToTop, useNavigation} from '@react-navigation/native';
// import {FAB, Snackbar, Banner} from 'react-native-paper';
// import {ordersNavigation} from '../../STORE/constants';

// const defaultListViewWidth = root.width;

// export default function Orders(): JSX.Element {
//   const [screenHeight, setScreenHeight] = useState(400);
//   const orders = useSelector((state: stateTypes) => state.orders);
//   const [notification, setNotification] = useState('');
//   const [snackBar, setSnackBar] = useState('');
//   const scrollViewRef = useRef<any>(null);
//   const navigation = useNavigation<any>();
//   // for modifying return true instead
//   const data = Object.values(orders);
//   const dataProvider: any = new DataProvider((prevOrder, nextOrder) => {
//     return (
//       prevOrder.shouldMark !== nextOrder.shouldMark ||
//       prevOrder.time?.seconds !== nextOrder.time?.seconds
//     );
//   }).cloneWithRows(data);

//   const scrollToTop = () => {
//     if (Boolean(dataProvider._data.length)) {
//       return scrollViewRef.current.scrollToEnd({animated: true});
//     }
//     return null;
//   };

//   useScrollToTop(
//     useRef({
//       scrollToTop: scrollToTop,
//     }),
//   );

//   const layoutProvider = useRef(
//     new LayoutProvider(
//       index => index,
//       (type, dim) => {
//         (dim.width = root.width), (dim.height = root.primaryTabsHeight + 10);
//       },
//     ),
//   );

//   const prevDataLength = useRef(0);
//   useEffect(() => {
//     if (data.length > prevDataLength.current) {
//       if (!prevDataLength.current) {
//         prevDataLength.current = data.length;
//         setTimeout(() => scrollToTop(), 800);
//       } else {
//         const totalNewOrders = data.length - prevDataLength.current;
//         // scrollToTop();
//         setNotification(`You have ${totalNewOrders} new order!`);
//       }
//     } else if (data.length < prevDataLength.current) {
//       const totalDeletedOrders = prevDataLength.current - data.length;
//       prevDataLength.current = data.length;
//       setSnackBar(`${totalDeletedOrders} order has been moved to trash`);
//     }
//   }, [data.length]);

//   const onOrderPress = useCallback(id => {
//     navigation.navigate(ordersNavigation.orderDetails, {
//       id,
//     });
//   }, []);

//   const renderItem = (type: any, item: singleOrderSchema) => {
//     return (
//       <OrderItSelf
//         item={item}
//         // id={Object.keys(orders)[type]}
//         id={Object.keys(orders)[type]}
//         setSnackBar={setSnackBar}
//         onPress={onOrderPress}
//       />
//     );
//   };

//   return (
//     <View
//       style={styles.container}
//       onLayout={e => setScreenHeight(e.nativeEvent.layout.height)}>
//       <Banner
//         visible={Boolean(notification.length)}
//         actions={[
//           {
//             label: 'Cancel',
//             onPress: () => {
//               prevDataLength.current = data.length;

//               setNotification('');
//             },
//             color: root.primaryThemeColor,
//           },
//           {
//             label: 'Show',
//             onPress: () => {
//               prevDataLength.current = data.length;

//               setNotification('');
//               onOrderPress(Object.keys(orders).pop());
//             },
//             color: root.primaryThemeColor,
//           },
//         ]}
//         icon={({size}) => (
//           <MaterialCommunityIcons
//             name={'bell'}
//             size={size}
//             color={root.primaryThemeColor}
//           />
//         )}>
//         {notification}
//       </Banner>

//       <View style={[styles.flatListStyle, {height: screenHeight}]}>
//         {Boolean(dataProvider._data.length) ? (
//           <RecyclerListView
//             ref={scrollViewRef}
//             dataProvider={dataProvider}
//             layoutProvider={layoutProvider.current}
//             rowRenderer={renderItem}
//             initialRenderIndex={dataProvider._data.length - 1}
//             contentContainerStyle={styles.contentContainerStyle}

//             // optimizeForInsertDeleteAnimations={true}
//             // disableRecycling
//           />
//         ) : (
//           <NotAvailable
//             title={'There are currently no orders 😕'}
//             style={styles.notAvailable}
//           />
//         )}
//       </View>

//       <FAB
//         style={styles.fab}
//         // visible={true}
//         color={root.primaryThemeColor}
//         small
//         icon="chevron-double-up"
//         onPress={scrollToTop}
//       />

//       <Snackbar
//         visible={Boolean(snackBar.length)}
//         onDismiss={() => setSnackBar('')}
//         duration={5000}
//         theme={{colors: {accent: root.primaryThemeColor}}}
//         action={{
//           label: 'Close',
//           onPress: () => setSnackBar(''),
//         }}>
//         {snackBar}
//       </Snackbar>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // marginTop: getStatusBarHeight(),
//     flex: 1,
//     backgroundColor: root.bgColor1,
//   },
//   flatListStyle: {
//     width: defaultListViewWidth,
//     transform: [{scaleY: -1}],
//     justifyContent: 'flex-end',
//   },
//   contentContainerStyle: {
//     flexGrow: 1,
//     justifyContent: 'flex-end',
//   },
//   fab: {
//     position: 'absolute',
//     margin: 16,
//     right: 0,
//     bottom: 0,
//     backgroundColor: root.primaryThemeColorLite,
//   },
//   activityIndicator: {
//     margin: 10,
//     position: 'absolute',
//   },
//   notAvailable: {
//     transform: [{scaleY: -1}],
//   },
// });

// -----------------------><-----------------------------
// eslint-disable-next-line @typescript-eslint/ban-ts-comment

// import React, {useRef, useState, useEffect, useCallback} from 'react';
// import {StyleSheet, View} from 'react-native';

// import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useSelector} from 'react-redux';
// import {root} from '../../css';
// import {stateTypes, singlePostAdRequestSchema} from '../../types';
// import NotAvailable from '../NotAvailable';
// import PostAdTabItSelf from './PostAdTabItSelf';
// import {useScrollToTop, useNavigation} from '@react-navigation/native';
// import {FAB, Snackbar, Banner} from 'react-native-paper';
// import {adRequestsNavigation} from '../../STORE/constants';

// const defaultListViewWidth = root.width;

// export default function PostAdRequests(): JSX.Element {
//   const [screenHeight, setScreenHeight] = useState(400);
//   const postAdRequests = useSelector(
//     (state: stateTypes) => state.postAdRequests,
//   );
//   const [notification, setNotification] = useState('');
//   const [snackBar, setSnackBar] = useState('');
//   const scrollViewRef = useRef<any>(null);
//   const navigation = useNavigation<any>();
//   // for modifying return true instead
//   const data = Object.values(postAdRequests);
//   const dataProvider: any = new DataProvider((prevOrder, nextOrder) => {
//     return (
//       prevOrder.shouldMark !== nextOrder.shouldMark ||
//       prevOrder.time?.seconds !== nextOrder.time?.seconds
//     );
//   }).cloneWithRows(data);

//   const scrollToTop = () => {
//     if (Boolean(dataProvider._data.length)) {
//       return scrollViewRef.current.scrollToEnd({animated: true});
//     }
//     return null;
//   };
//   useScrollToTop(
//     useRef({
//       scrollToTop: scrollToTop,
//     }),
//   );

//   const layoutProvider = useRef(
//     new LayoutProvider(
//       index => index,
//       (type, dim) => {
//         (dim.width = root.width), (dim.height = root.primaryTabsHeight + 10);
//       },
//     ),
//   );

//   const prevDataLength = useRef(0);
//   useEffect(() => {
//     if (data.length > prevDataLength.current) {
//       if (!prevDataLength.current) {
//         prevDataLength.current = data.length;
//         setTimeout(() => scrollToTop(), 800);
//       } else {
//         const totalNewOrders = data.length - prevDataLength.current;

//         // scrollViewRef.current.scrollToOffset(0, 0, false)
//         setNotification(`You have ${totalNewOrders} new post ad request!`);
//       }
//     } else if (data.length < prevDataLength.current) {
//       const totalDeletedOrders = prevDataLength.current - data.length;
//       prevDataLength.current = data.length;
//       setSnackBar(`${totalDeletedOrders} request has been moved to trash`);
//     }
//   }, [data.length]);

//   const onRequestPress = useCallback(id => {
//     navigation.navigate(adRequestsNavigation.adRequestDetails, {
//       id,
//     });
//   }, []);

//   const renderItem = (type: any, item: singlePostAdRequestSchema) => {
//     return (
//       <PostAdTabItSelf
//         item={item}
//         id={Object.keys(postAdRequests)[type]}
//         setSnackBar={setSnackBar}
//         onPress={onRequestPress}
//       />
//     );
//   };

//   return (
//     <View
//       style={styles.container}
//       onLayout={e => setScreenHeight(e.nativeEvent.layout.height)}>
//       <Banner
//         visible={Boolean(notification.length)}
//         actions={[
//           {
//             label: 'Cancel',
//             onPress: () => {
//               prevDataLength.current = data.length;

//               setNotification('');
//             },
//             color: root.primaryThemeColor,
//           },
//           {
//             label: 'Show',
//             onPress: () => {
//               prevDataLength.current = data.length;

//               setNotification('');
//               onRequestPress(Object.keys(postAdRequests).pop());
//             },
//             color: root.primaryThemeColor,
//           },
//         ]}
//         icon={({size}) => (
//           <MaterialCommunityIcons
//             name={'bell'}
//             size={size}
//             color={root.primaryThemeColor}
//           />
//         )}>
//         {notification}
//       </Banner>

//       <View style={[styles.flatListStyle, {height: screenHeight}]}>
//         {Boolean(dataProvider._data.length) ? (
//           <RecyclerListView
//             ref={scrollViewRef}
//             dataProvider={dataProvider}
//             layoutProvider={layoutProvider.current}
//             rowRenderer={renderItem}
//             contentContainerStyle={styles.contentContainerStyle}

//             // optimizeForInsertDeleteAnimations={true}
//             // disableRecycling
//           />
//         ) : (
//           <NotAvailable
//             title={'There are currently no Ad requests 😕'}
//             style={styles.notAvailable}
//           />
//         )}
//       </View>

//       <FAB
//         style={styles.fab}
//         // visible={true}
//         color={root.primaryThemeColor}
//         small
//         icon="chevron-double-up"
//         onPress={scrollToTop}
//       />

//       <Snackbar
//         visible={Boolean(snackBar.length)}
//         onDismiss={() => setSnackBar('')}
//         duration={5000}
//         theme={{colors: {accent: root.primaryThemeColor}}}
//         action={{
//           label: 'Close',
//           onPress: () => setSnackBar(''),
//         }}>
//         {snackBar}
//       </Snackbar>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // marginTop: getStatusBarHeight(),
//     flex: 1,
//     backgroundColor: root.bgColor1,
//   },
//   flatListStyle: {
//     width: defaultListViewWidth,
//     transform: [{scaleY: -1}],
//     justifyContent: 'flex-end',
//   },
//   contentContainerStyle: {
//     flexGrow: 1,
//     justifyContent: 'flex-end',
//   },
//   fab: {
//     position: 'absolute',
//     margin: 16,
//     right: 0,
//     bottom: 0,
//     backgroundColor: root.primaryThemeColorLite,
//   },
//   activityIndicator: {
//     margin: 10,
//     position: 'absolute',
//   },
//   notAvailable: {
//     transform: [{scaleY: -1}],
//   },
// });

// --------------------------------------------><---------------------------------------


// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// import React, {useRef, useState, useEffect, useCallback} from 'react';
// import {StyleSheet, View} from 'react-native';

// import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useSelector} from 'react-redux';
// import {root} from '../../css';
// import {stateTypes, singleContactUsMessageSchema} from '../../types';
// import NotAvailable from '../NotAvailable';
// import ContactUsTabItSelf from './ContactUsTabItSelf';
// import {useScrollToTop, useNavigation} from '@react-navigation/native';
// import {FAB, Snackbar, Banner} from 'react-native-paper';
// import {contactUsNavigation} from '../../STORE/constants';

// const defaultListViewWidth = root.width;

// export default function ContactUsMessages(): JSX.Element {
//   const [screenHeight, setScreenHeight] = useState(400);
//   const contactUsMessages = useSelector((state: stateTypes) => state.contactUs);

//   const [notification, setNotification] = useState('');
//   const [snackBar, setSnackBar] = useState('');
//   const scrollViewRef = useRef<any>(null);
//   const navigation = useNavigation<any>();
//   // for modifying return true instead
//   const data = Object.values(contactUsMessages);
//   const dataProvider: any = new DataProvider((prevOrder, nextOrder) => {
//     return (
//       prevOrder.shouldMark !== nextOrder.shouldMark ||
//       prevOrder.time?.seconds !== nextOrder.time?.seconds
//     );
//   }).cloneWithRows(data);

//   const scrollToTop = () => {
//     if (Boolean(dataProvider._data.length)) {
//       return scrollViewRef.current.scrollToEnd({animated: true});
//     }
//     return null;
//   };

//   useScrollToTop(
//     useRef({
//       scrollToTop: scrollToTop,
//     }),
//   );

//   const layoutProvider = useRef(
//     new LayoutProvider(
//       index => index,
//       (type, dim) => {
//         (dim.width = root.width), (dim.height = root.primaryTabsHeight + 10);
//       },
//     ),
//   );

//   const prevDataLength = useRef(0);
//   useEffect(() => {
//     if (data.length > prevDataLength.current) {
//       if (!prevDataLength.current) {
//         prevDataLength.current = data.length;
//         setTimeout(() => scrollToTop(), 800);
//       } else {
//         const totalNewOrders = data.length - prevDataLength.current;

//         // scrollViewRef.current.scrollToOffset(0, 0, false)
//         setNotification(`You have ${totalNewOrders} new message!`);
//       }
//     } else if (data.length < prevDataLength.current) {
//       const totalDeletedOrders = prevDataLength.current - data.length;
//       prevDataLength.current = data.length;
//       setSnackBar(`${totalDeletedOrders} message has been moved to trash`);
//     }
//   }, [data.length]);

//   const onRequestPress = useCallback(id => {
//     navigation.navigate(contactUsNavigation.contactUsDetails, {
//       id,
//     });
//   }, []);

//   const renderItem = (type: any, item: singleContactUsMessageSchema) => {
//     return (
//       <ContactUsTabItSelf
//         item={item}
//         id={Object.keys(contactUsMessages)[type]}
//         setSnackBar={setSnackBar}
//         onPress={onRequestPress}
//       />
//     );
//   };

//   return (
//     <View
//       style={styles.container}
//       onLayout={e => setScreenHeight(e.nativeEvent.layout.height)}>
//       <Banner
//         visible={Boolean(notification.length)}
//         actions={[
//           {
//             label: 'Cancel',
//             onPress: () => {
//               prevDataLength.current = data.length;

//               setNotification('');
//             },
//             color: root.primaryThemeColor,
//           },
//           {
//             label: 'Show',
//             onPress: () => {
//               prevDataLength.current = data.length;

//               setNotification('');
//               onRequestPress(Object.keys(contactUsMessages).pop());
//             },
//             color: root.primaryThemeColor,
//           },
//         ]}
//         icon={({size}) => (
//           <MaterialCommunityIcons
//             name={'bell'}
//             size={size}
//             color={root.primaryThemeColor}
//           />
//         )}>
//         {notification}
//       </Banner>

//       <View style={[styles.flatListStyle, {height: screenHeight}]}>
//         {Boolean(dataProvider._data.length) ? (
//           <RecyclerListView
//             ref={scrollViewRef}
//             dataProvider={dataProvider}
//             layoutProvider={layoutProvider.current}
//             rowRenderer={renderItem}
//             contentContainerStyle={styles.contentContainerStyle}
//             // optimizeForInsertDeleteAnimations={true}
//             // disableRecycling
//           />
//         ) : (
//           <NotAvailable
//             title={'There are currently no Ad requests 😕'}
//             style={styles.notAvailable}
//           />
//         )}
//       </View>

//       <FAB
//         style={styles.fab}
//         // visible={true}
//         color={root.primaryThemeColor}
//         small
//         icon="chevron-double-up"
//         onPress={scrollToTop}
//       />

//       <Snackbar
//         visible={Boolean(snackBar.length)}
//         onDismiss={() => setSnackBar('')}
//         duration={5000}
//         theme={{colors: {accent: root.primaryThemeColor}}}
//         action={{
//           label: 'Close',
//           onPress: () => setSnackBar(''),
//         }}>
//         {snackBar}
//       </Snackbar>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // marginTop: getStatusBarHeight(),
//     flex: 1,
//     backgroundColor: root.bgColor1,
//   },
//   flatListStyle: {
//     width: defaultListViewWidth,
//     transform: [{scaleY: -1}],
//     justifyContent: 'flex-end',
//   },
//   contentContainerStyle: {
//     flexGrow: 1,
//     justifyContent: 'flex-end',
//   },
//   fab: {
//     position: 'absolute',
//     margin: 16,
//     right: 0,
//     bottom: 0,
//     backgroundColor: root.primaryThemeColorLite,
//   },
//   activityIndicator: {
//     margin: 10,
//     position: 'absolute',
//   },
//   notAvailable: {
//     transform: [{scaleY: -1}],
//   },
// });
