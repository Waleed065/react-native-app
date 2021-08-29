import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {batch} from 'react-redux';

import {
  setIsLoggedInConst,
  setActiveTabConst,
  setServicesCategoryItemsConst,
  setAddOnItemsConst,
  setServicesCategoriesConst,
  setAddOnCategoriesConst,
  setServicesHeadingsConst,
  setServicesSearchTitleConst,
  setServicesLoadingConst,
  setShowCategoryItemsConst,
  setShowMoreTabsConst,
  addToCartConst,
  removeFromCartConst,
  updateCartConst,
  setWhiteListConst,
  setDestinationConst,
  setPostAdDestinationConst,
  showMessageConst,
  setCommentsConst,
  setAdTabConst,
  setOurServicesUrlValidConst,
  addChatRoomConst,
  addNewMessageConst,
  setCurrentChatIdConst,
  setPendingAdsConst,
  setActiveAdsConst,
  setUserInfoConst,
  removeUserInfoConst,
  setFavouritesConst,
  removeFavouritesConst,
  setFavourityIdConst,
  removeFavourityIdConst,
  addOrdersConst,
  modifyOrderConst,
  emptyCartConst,
  updateUserInfoConst,
  setCurrentAddOnConst,
  clearAllMessagesConst,
  setCurrentItemIdConst,
  setUsersConst,
  setMarkOrderConst,
  setUnMarkOrderConst,
  removeOrderConst,
  addToTrashConst,
  removeFromTrashConst,
  setOrderDetailsConst,
  addToPostAdRequestsConst,
  removeFromPostAdRequestsConst,
  setMarkPostAdRequestConst,
  setUnMarkPostAdRequestConst,
  modifyPostAdRequestConst,
  addToContactUsMessagesConst,
  modifyContactUsMessageConst,
  removeFromContactUsMessagesConst,
  setMarkContactUsMessageConst,
  setUnMarkContactUsMessageConst,
  setMarkTrashConst,
  setUnMarkTrashConst,
  removeMessageConst,
  removeChatRoomConst,
  addNotificationConst,
  clearAllNotificationsConst,
  clearAllPostAdRequestsConst,
  clearAllContactUsMessagesConst,
  clearAllOrdersConst,
  clearOrderDetailsConst,
  clearAllUsersConst,
  clearAllTrashConst,
  setUnMarkNotificationConst,
  setMarkNotificationConst,
} from '../constants';

import {
  activeTabActionType,
  servicesHeadingsActionType,
  servicesSearchTitleActionType,
  servicesCategoryItemType,
  servicesSearchCategoriesActionType,
  cartActionType,
  servicesCategoryItemsActionType,
  servicesSearchTitleSchema,
  whiteListActionType,
  destinationActionType,
  booleanActionType,
  flashMessageActionType,
  commentsActionType,
  commentsItemType,
  addChatRoomActionType,
  addNewMessageActionType,
  stringActionType,
  pendingAdsActionType,
  activeAdsActionType,
  userInfoActionType,
  setFavouritesActionType,
  removeFavouritesActionType,
  setFavourityIdActionType,
  removeFavourityIdActionType,
  ordersActionType,
  updateUserInfoActionType,
  addOnCategoriesActionType,
  addOnCategoriesSchema,
  addOnItemsActionType,
  addOnItemsPayloadType,
  addOnItemType,
  addOnTitleActionType,
  stateTypes,
  servicesSearchCategoriesItemType,
  setUsersActionType,
  addToTrashActionType,
  orderDetailsActionType,
  postAdRequestsActionType,
  contactUsActionType,
  removeMessageActionType,
  removeChatRoomActionType,
  modifyUserActionType,
  addNotificationActionType,
} from '../../types';

// ------------------><--------------------
function setServicesLoading(payload: boolean): booleanActionType {
  return {
    type: setServicesLoadingConst,
    payload,
  };
}

// ------------------><--------------------
export function setIsLoggedIn(payload: boolean): booleanActionType {
  return {
    type: setIsLoggedInConst,
    payload,
  };
}

// ------------------><--------------------
export function setActiveTab(
  payload: activeTabActionType['payload'],
): activeTabActionType {
  return {
    type: setActiveTabConst,
    payload,
  };
}
// ------------------><--------------------
export function setPostAdTab(
  payload: activeTabActionType['payload'],
): activeTabActionType {
  return {
    type: setAdTabConst,
    payload,
  };
}

// ------------------><--------------------

function setAddOnItems(
  payload: addOnItemsActionType['payload'],
): addOnItemsActionType {
  return {
    type: setAddOnItemsConst,
    payload,
  };
}
export function fetchAddOnItems() {
  return (dispatch: (arg: any) => void, getState: () => stateTypes): any => {
    const activeTab = getState().activeTab;
    const destination = getState().destination;
    const {country, city} = destination;
    if (!country || !city || !activeTab) return;
    const category = getState().servicesSearchTitle[activeTab]?.[country]?.[
      city
    ]?.servicesTitle.category;

    if (!category) return;
    const addOn = getState().currentAddOnTitle?.[activeTab]?.[country]?.[
      city
    ]?.[category]?.servicesAddOn.addOn;

    if (!addOn) return;

    firestore()
      .collection('services')
      .doc(activeTab)
      .collection('countries')
      .doc(country)
      .collection('cities')
      .doc(city)
      .collection('categories')
      .doc(category)
      .collection('add-ons')
      .doc(addOn)
      .collection('add-on-items')
      .get()
      .then(allItems => {
        const addOnItems: addOnItemsPayloadType['addOnItems'] = [];
        allItems.forEach(item => {
          addOnItems.push({
            document: item.data() as addOnItemType['document'],
            destination,
            addOn,
            addOnItem: item.id,
            tab: activeTab,
            category,
          });
        });

        batch(() => {
          dispatch(
            setAddOnItems({
              tab: activeTab,
              destination,
              category,
              addOn,
              addOnItems,
              shouldFetch: false,
            }),
          );
        });
      })
      .catch(() => {
        // console.error(err);
      });
  };
}

// ------------------><--------------------
export function setServicesCategoryItems(
  payload: servicesCategoryItemsActionType['payload'],
): servicesCategoryItemsActionType {
  return {
    type: setServicesCategoryItemsConst,
    payload,
  };
}

export function fetchServicesCategoryItems() {
  return (dispatch: (arg: any) => void, getState: () => stateTypes): any => {
    const activeTab = getState().activeTab;
    const destination = getState().destination;
    const {country, city} = destination;
    if (!country || !city || !activeTab) {
      dispatch(setServicesLoading(false));
      return;
    }
    const categoryDetails = getState().servicesSearchTitle[activeTab]?.[
      country
    ]?.[city]?.servicesTitle;
    const {category = ''} = categoryDetails;

    if (!category) {
      dispatch(setServicesLoading(false));
      return;
    }

    dispatch(setServicesLoading(true));
    firestore()
      .collection('services')
      .doc(activeTab)
      .collection('countries')
      .doc(country)
      .collection('cities')
      .doc(city)
      .collection('categories')
      .doc(category)
      .collection('items')
      .get()
      .then(allItems => {
        const categoryItems: {[key: string]: servicesCategoryItemType} = {};
        allItems.forEach(item => {
          categoryItems[item.id] = {
            document: item.data() as servicesCategoryItemType['document'],
            destination,
            item: item.id,
            tab: activeTab,
            category,
          };
        });

        batch(() => {
          dispatch(
            setServicesCategoryItems({
              tab: activeTab,
              destination,
              category,
              categoryItems,
              shouldFetch: false,
            }),
          );
          dispatch(setServicesLoading(false));
        });
      })
      .catch(() => {
        // console.error(err);
        dispatch(setServicesLoading(false));
      });
  };
}

// ------------------><--------------------

export function setCurrentAddOnTitle(
  payload: addOnTitleActionType['payload'],
): addOnTitleActionType {
  return {
    type: setCurrentAddOnConst,
    payload,
  };
}
// ------------------><--------------------
export function setServicesSearchTitle(
  payload: servicesSearchTitleActionType['payload'],
): servicesSearchTitleActionType {
  return {
    type: setServicesSearchTitleConst,
    payload,
  };
}

export function fetchServicesSearchTitle() {
  return (dispatch: (arg: any) => void, getState: () => stateTypes): any => {
    const {country, city} = getState().destination;
    const activeTab = getState().activeTab;

    if (!country || !city || !activeTab) return;

    dispatch(setServicesLoading(true));
    firestore()
      .collection('services')
      .doc(activeTab)
      .collection('countries')
      .doc(country)
      .collection('cities')
      .doc(city)
      .collection('categories')
      .limit(1)
      .get()
      .then(snapShot => {
        const servicesCategories: {
          [key: string]: servicesSearchTitleSchema;
        } = {};
        snapShot.forEach(snap => {
          const data = snap.data() as servicesSearchTitleSchema['document'];
          if (data) {
            servicesCategories[snap.id] = {
              category: snap.id,
              tab: activeTab,
              document: data,
              destination: {
                country: country,
                city: city,
              },
            };
          }
        });

        if (Object.keys(servicesCategories).length) {
          batch(() => {
            dispatch(
              setServicesSearchTitle({
                shouldFetch: false,
                servicesTitle:
                  servicesCategories[Object.keys(servicesCategories)[0]],
              }),
            );
            dispatch(setServicesLoading(false));
            dispatch(
              setServicesCategories({
                tab: activeTab,
                destination: {country, city},
                allCategories: {
                  shouldFetch: true,
                  servicesCategories,
                },
              }),
            );
          });
        } else {
          // console.log("Error in fetchServicesSearchTitle");
          dispatch(setServicesLoading(false));
        }
      })
      .catch(() => {
        // console.log(err);
        dispatch(setServicesLoading(false));
      });
  };
}

// ------------------><--------------------
function setServicesHeadings(
  payload: servicesHeadingsActionType['payload'],
): servicesHeadingsActionType {
  return {
    type: setServicesHeadingsConst,
    payload,
  };
}

export function setWhiteList(
  payload: whiteListActionType['payload'],
): whiteListActionType {
  return {
    type: setWhiteListConst,
    payload,
  };
}

interface servicesHeadingsSchema {
  postAd?: boolean;
}

export function fetchServicesHeadings(postAd?: servicesHeadingsSchema) {
  return (dispatch: (arg: any) => void, getState: () => stateTypes): any => {
    const activeTab = postAd ? getState().activeAdTab : getState().activeTab;
    const destination = postAd
      ? getState().postAdDestination
      : getState().destination;

    if (!activeTab) {
      if (!postAd) {
        dispatch(setServicesLoading(false));
      }
      return;
    }

    if (!postAd) {
      dispatch(setServicesLoading(true));
    }

    firestore()
      .collection('services')
      .doc(activeTab)
      .get()
      .then(snapShot => {
        const data: any = snapShot.data();
        if (data) {
          batch(() => {
            dispatch(setServicesLoading(false));
            dispatch(
              setServicesHeadings({
                headings: {
                  document: data.document,
                  tab: activeTab,
                },
                shouldFetch: false,
              }),
            );
            dispatch(setWhiteList({tab: activeTab, whiteList: data.whiteList}));
          });

          const setNewDestination = postAd
            ? setPostAdDestination
            : setDestination;
          const newWhiteList = data.whiteList;
          const {country = '', city = ''} = destination;
          if (Object.prototype.hasOwnProperty.call(newWhiteList, country)) {
            if (!(newWhiteList[country].indexOf(city) > -1)) {
              dispatch(
                setNewDestination({
                  country: country,
                  city: newWhiteList[country][0],
                }),
              );
            }
          } else {
            dispatch(
              setNewDestination({
                country: 'pakistan',
                city: 'karachi',
              }),
            );
          }
        } else {
          // console.log("Error in fetchServicesHeadings");
          dispatch(setServicesLoading(false));
        }
      })
      .catch(() => {
        // console.log(err);
        dispatch(setServicesLoading(false));
      });
  };
}

// ------------------><--------------------

interface fetchOurServicesSchema {
  tabParam: string;
  countryParam: string;
  cityParam: string;
  categoryParam: string;
}
export function fetchOurServices({
  tabParam,
  countryParam,
  cityParam,
  categoryParam,
}: fetchOurServicesSchema) {
  return (dispatch: (arg: any) => void): any => {
    dispatch(setServicesLoading(true));
    // console.log("our Services Fetcher");
    firestore()
      .collection('services')
      .doc(tabParam)
      .collection('countries')
      .doc(countryParam)
      .collection('cities')
      .doc(cityParam)
      .collection('categories')
      .doc(categoryParam)
      .collection('items')
      .limit(10)
      .get()
      .then(allItems => {
        dispatch(setServicesLoading(true));
        const categoryItems: {[key: string]: servicesCategoryItemType} = {};
        allItems.forEach(item => {
          categoryItems[item.id] = {
            document: item.data() as servicesCategoryItemType['document'],
            destination: {
              country: countryParam,
              city: cityParam,
            },
            item: item.id,
            tab: tabParam,
            category: categoryParam,
          };
        });

        if (Object.keys(categoryItems).length) {
          batch(() => {
            dispatch(setActiveTab(tabParam));
            dispatch(
              setDestination({
                country: countryParam,
                city: cityParam,
              }),
            );
            dispatch(
              setServicesHeadings({
                headings: {
                  document: {
                    calendarHeadingOne: 'From',
                    calendarHeadingTwo: 'Till',
                    categoriesHeading: 'Select A Category',
                    itemsHeading: 'select An Item',
                    locationHeadingOne: 'Select A Country',
                    locationHeadingTwo: 'select A City',
                    pictures: [],
                  },
                  tab: tabParam,
                },
                shouldFetch: true,
              }),
            );
            dispatch(
              setServicesSearchTitle({
                shouldFetch: true,
                servicesTitle: {
                  category: categoryParam,
                  tab: tabParam,
                  document: {
                    avatar: '',
                    details: '',
                    price: 0,
                    title: '',
                  },
                  destination: {
                    country: countryParam,
                    city: cityParam,
                  },
                },
              }),
            );

            dispatch(
              setServicesCategoryItems({
                tab: tabParam,
                destination: {
                  country: countryParam,
                  city: cityParam,
                },
                category: categoryParam,
                categoryItems,
                shouldFetch: true,
              }),
            );
            dispatch(setServicesLoading(false));
          });
        } else {
          batch(() => {
            dispatch(setOurServicesUrlValid(false));
            dispatch(setServicesLoading(false));
          });
        }
      })
      .catch(() => {
        // console.error(err);
        batch(() => {
          dispatch(setOurServicesUrlValid(false));
          dispatch(setServicesLoading(false));
        });
      });
  };
}

interface fetchOurServicesItemSchema {
  tabParam: string;
  countryParam: string;
  cityParam: string;
  categoryParam: string;
  itemParam: string;
}
export function fetchOurServicesItem({
  tabParam,
  countryParam,
  cityParam,
  categoryParam,
  itemParam,
}: fetchOurServicesItemSchema) {
  return (dispatch: (arg: any) => void): any => {
    dispatch(setServicesLoading(true));
    // console.log("our Services Fetcher");

    firestore()
      .collection('services')
      .doc(tabParam)
      .collection('countries')
      .doc(countryParam)
      .collection('cities')
      .doc(cityParam)
      .collection('categories')
      .doc(categoryParam)
      .collection('items')
      .doc(itemParam)
      .get()
      .then(allItems => {
        if (allItems.exists && allItems.data()) {
          batch(() => {
            dispatch(setActiveTab(tabParam));
            dispatch(
              setServicesHeadings({
                headings: {
                  document: {
                    calendarHeadingOne: 'From',
                    calendarHeadingTwo: 'Till',
                    categoriesHeading: 'Select A Category',
                    itemsHeading: 'select An Item',
                    locationHeadingOne: 'Select A Country',
                    locationHeadingTwo: 'select A City',
                    pictures: [],
                  },
                  tab: tabParam,
                },
                shouldFetch: true,
              }),
            );
            dispatch(
              setDestination({
                country: countryParam,
                city: cityParam,
              }),
            );
            dispatch(
              setServicesSearchTitle({
                shouldFetch: true,
                servicesTitle: {
                  category: categoryParam,
                  tab: tabParam,
                  document: {
                    avatar: '',
                    details: '',
                    price: 0,
                    title: '',
                  },
                  destination: {
                    country: countryParam,
                    city: cityParam,
                  },
                },
              }),
            );

            dispatch(
              setServicesCategoryItems({
                tab: tabParam,
                destination: {
                  country: countryParam,
                  city: cityParam,
                },
                category: categoryParam,
                categoryItems: {
                  [allItems.id]: {
                    document: allItems.data() as servicesCategoryItemType['document'],
                    destination: {
                      country: countryParam,
                      city: cityParam,
                    },
                    item: allItems.id,
                    tab: tabParam,
                    category: categoryParam,
                  },
                },
                shouldFetch: true,
              }),
            );
            dispatch(setServicesLoading(false));
          });
        } else {
          batch(() => {
            dispatch(setOurServicesUrlValid(false));
            dispatch(setServicesLoading(false));
          });
        }
      })
      .catch(() => {
        batch(() => {
          dispatch(setOurServicesUrlValid(false));
          dispatch(setServicesLoading(false));
        });
        // console.error(err);
      });
  };
}

// ------------------><--------------------
function setAddOnCategories(
  payload: addOnCategoriesActionType['payload'],
): addOnCategoriesActionType {
  return {
    type: setAddOnCategoriesConst,
    payload,
  };
}

export function fetchAddOnCategories() {
  return (dispatch: (arg: any) => void, getState: () => stateTypes): any => {
    const activeTab = getState().activeTab;
    const destination = getState().destination;
    const {country, city} = destination;
    if (!country || !city || !activeTab) return;
    const category = getState().servicesSearchTitle?.[activeTab]?.[country]?.[
      city
    ]?.servicesTitle.category;
    if (!category) return;

    firestore()
      .collection('services')
      .doc(activeTab)
      .collection('countries')
      .doc(country)
      .collection('cities')
      .doc(city)
      .collection('categories')
      .doc(category)
      .collection('add-ons')
      .get()
      .then(snapShot => {
        const allAddOns: addOnCategoriesSchema = [];
        snapShot.forEach(snap => {
          const data = snap.data() as any;
          if (data) {
            allAddOns.push({
              document: data,
              destination,
              category,
              addOn: snap.id,
              tab: activeTab,
            });
          }
        });
        if (allAddOns.length) {
          dispatch(
            setAddOnCategories({
              tab: activeTab,
              destination,
              category,
              allAddOns,
            }),
          );
        }
      })
      .catch(() => {
        // console.log(err);
      });
  };
}

// ------------------><--------------------
function setServicesCategories(
  payload: servicesSearchCategoriesActionType['payload'],
): servicesSearchCategoriesActionType {
  return {
    type: setServicesCategoriesConst,
    payload,
  };
}
export function fetchServicesCategories() {
  return (dispatch: (arg: any) => void, getState: () => stateTypes): any => {
    const activeTab = getState().activeTab;
    const destination = getState().destination;
    const {country, city} = destination;
    if (!country || !city || !activeTab) return;

    firestore()
      .collection('services')
      .doc(activeTab)
      .collection('countries')
      .doc(country)
      .collection('cities')
      .doc(city)
      .collection('categories')
      .get()
      .then(snapShot => {
        const servicesCategories: {
          [key: string]: servicesSearchCategoriesItemType;
        } = {};
        snapShot.forEach(snap => {
          const data = snap.data() as any;
          if (data) {
            servicesCategories[snap.id] = {
              document: data,
              destination,
              category: snap.id,
              tab: activeTab,
            };
          }
        });
        if (Object.keys(servicesCategories).length) {
          dispatch(
            setServicesCategories({
              tab: activeTab,
              destination,
              allCategories: {
                shouldFetch: false,
                servicesCategories,
              },
            }),
          );
        }
      })
      .catch(() => {
        // console.log(err);
      });
  };
}

// ------------------><--------------------

export function setComments(payload: commentsActionType['payload']): any {
  return {
    type: setCommentsConst,
    payload,
  };
}

export function fetchComments() {
  return (dispatch: (arg: any) => void, getState: () => stateTypes): any => {
    const activeTab = getState().activeTab;
    const destination = getState().destination;
    const itemParam = getState().currentItemId;

    const {country, city} = destination;
    const categoryDetails = getState().servicesSearchTitle[activeTab]?.[
      country
    ]?.[city]?.servicesTitle;
    const {category = ''} = categoryDetails;

    if (!itemParam || !category || !country || !city || !activeTab) {
      return;
    }

    firestore()
      .collection('services')
      .doc(activeTab)
      .collection('countries')
      .doc(country)
      .collection('cities')
      .doc(city)
      .collection('categories')
      .doc(category)
      .collection('items')
      .doc(itemParam)
      .collection('paginated_comments')
      .orderBy('documentNumber', 'desc')
      .limit(1)
      .get()
      .then(snapShot => {
        type fuckSchema = {
          [key: string]: commentsItemType;
        };
        let comments: fuckSchema = {};
        snapShot.forEach(doc => {
          const newComments = doc.data();
          delete newComments?.documentNumber;
          comments = {
            ...comments,
            ...newComments,
          };
        });

        dispatch(
          setComments({
            tab: activeTab,
            category,
            destination: {
              country,
              city,
            },
            itemId: itemParam,
            comments,
          }),
        );
      });
  };
}

// ------------------><--------------------

export function setShowCategoryItems(payload: boolean): booleanActionType {
  return {
    type: setShowCategoryItemsConst,
    payload,
  };
}
// ------------------><--------------------
export function setShowMoreTabs(payload: boolean): booleanActionType {
  return {
    type: setShowMoreTabsConst,
    payload,
  };
}
// ------------------><--------------------

export function addToCart(payload: cartActionType['payload']): cartActionType {
  return {
    type: addToCartConst,
    payload,
  };
}
// ------------------><--------------------
export function removeFromCart(
  payload: cartActionType['payload'],
): cartActionType {
  return {
    type: removeFromCartConst,
    payload,
  };
}
// ------------------><--------------------
export function updateCart(payload: cartActionType['payload']): cartActionType {
  return {
    type: updateCartConst,
    payload,
  };
}
// ------------------><--------------------
export function emptyCart(): any {
  return {
    type: emptyCartConst,
  };
}
// ------------------><--------------------
export function setDestination(
  payload: destinationActionType['payload'],
): destinationActionType {
  return {
    type: setDestinationConst,
    payload,
  };
}
// ------------------><--------------------
export function setPostAdDestination(
  payload: destinationActionType['payload'],
): destinationActionType {
  return {
    type: setPostAdDestinationConst,
    payload,
  };
}

// ------------------><--------------------

export function setShowMessage(
  payload: flashMessageActionType['payload'],
): flashMessageActionType {
  return {
    type: showMessageConst,
    payload,
  };
}

// ------------------><--------------------
export function setOurServicesUrlValid(payload: boolean): booleanActionType {
  return {
    type: setOurServicesUrlValidConst,
    payload,
  };
}

// ------------------><--------------------
export function addChatRoom(
  payload: addChatRoomActionType['payload'],
): addChatRoomActionType {
  return {
    type: addChatRoomConst,
    payload,
  };
}
// ------------------><--------------------
export function addNewMessage(
  payload: addNewMessageActionType['payload'],
): addNewMessageActionType {
  return {
    type: addNewMessageConst,
    payload,
  };
}
// ------------------><--------------------
export function removeMessage(
  payload: removeMessageActionType['payload'],
): removeMessageActionType {
  return {
    type: removeMessageConst,
    payload,
  };
}
// ------------------><--------------------
export function removeChatRoom(
  payload: removeChatRoomActionType['payload'],
): removeChatRoomActionType {
  return {
    type: removeChatRoomConst,
    payload,
  };
}
// ------------------><--------------------
export function clearAllMessages(): any {
  return {
    type: clearAllMessagesConst,
  };
}
// ------------------><--------------------
export function setCurrentChatId(
  payload: stringActionType['payload'],
): stringActionType {
  return {
    type: setCurrentChatIdConst,
    payload,
  };
}
// ------------------><--------------------
export function setCurrentItemId(
  payload: stringActionType['payload'],
): stringActionType {
  return {
    type: setCurrentItemIdConst,
    payload,
  };
}
// ------------------><--------------------
export function setPendingAds(
  payload: pendingAdsActionType['payload'],
): pendingAdsActionType {
  return {
    type: setPendingAdsConst,
    payload,
  };
}
// ------------------><--------------------
export function setActiveAds(
  payload: activeAdsActionType['payload'],
): activeAdsActionType {
  return {
    type: setActiveAdsConst,
    payload,
  };
}
// ------------------><--------------------
export function setUserInfo(
  payload: userInfoActionType['payload'],
): userInfoActionType {
  return {
    type: setUserInfoConst,
    payload,
  };
}
export function updateUserInfo(
  payload: updateUserInfoActionType['payload'],
): updateUserInfoActionType {
  return {
    type: updateUserInfoConst,
    payload,
  };
}
export function removeUserInfo(): any {
  return {
    type: removeUserInfoConst,
  };
}

// ------------------><--------------------
export function setFavourites(
  payload: setFavouritesActionType['payload'],
): setFavouritesActionType {
  return {
    type: setFavouritesConst,
    payload,
  };
}
export function removeFavourites(
  payload: removeFavouritesActionType['payload'],
): removeFavouritesActionType {
  return {
    type: removeFavouritesConst,
    payload,
  };
}
// ------------------><--------------------
export function setFavourityId(
  payload: setFavourityIdActionType['payload'],
): setFavourityIdActionType {
  return {
    type: setFavourityIdConst,
    payload,
  };
}
export function removeFavourityId(
  payload: removeFavourityIdActionType['payload'],
): removeFavourityIdActionType {
  return {
    type: removeFavourityIdConst,
    payload,
  };
}

// -----------------><----------------
export function addOrders(
  payload: ordersActionType['payload'],
): ordersActionType {
  return {
    type: addOrdersConst,
    payload,
  };
}

export function modifyOrder(
  payload: ordersActionType['payload'],
): ordersActionType {
  return {
    type: modifyOrderConst,
    payload,
  };
}
export function removeOrder(payload: string): stringActionType {
  return {
    type: removeOrderConst,
    payload,
  };
}
export function setMarkOrder(payload: string): stringActionType {
  return {
    type: setMarkOrderConst,
    payload,
  };
}
export function setUnMarkOrder(
  payload: stringActionType['payload'],
): stringActionType {
  return {
    type: setUnMarkOrderConst,
    payload,
  };
}
export function clearAllOrders(): any {
  return {
    type: clearAllOrdersConst,
  };
}

export function fetchOrder(id: string) {
  return (dispatch: (arg: any) => void): any => {
    dispatch(setServicesLoading(true));

    firestore()
      .collection('orders')
      .doc(id)
      .get()
      .then(snapShot => {
        if (snapShot.exists && snapShot.data()) {
          dispatch(
            addOrders({
              [id]: snapShot.data() as any,
            }),
          );
        }
        dispatch(setServicesLoading(false));
      })
      .catch(() => {
        dispatch(setServicesLoading(false));
      });
  };
}
// -----------------><----------------

export function addToContactUsMessages(
  payload: contactUsActionType['payload'],
): contactUsActionType {
  return {
    type: addToContactUsMessagesConst,
    payload,
  };
}
export function modifyContactUsMessage(
  payload: contactUsActionType['payload'],
): contactUsActionType {
  return {
    type: modifyContactUsMessageConst,
    payload,
  };
}
export function removeFromContactUsMessages(payload: string): stringActionType {
  return {
    type: removeFromContactUsMessagesConst,
    payload,
  };
}
export function setMarkContactUsMessage(payload: string): stringActionType {
  return {
    type: setMarkContactUsMessageConst,
    payload,
  };
}
export function setUnMarkContactUsMessage(payload: string): stringActionType {
  return {
    type: setUnMarkContactUsMessageConst,
    payload,
  };
}
export function clearAllContactUsMessages(): any {
  return {
    type: clearAllContactUsMessagesConst,
  };
}

export function fetchContactUsMessage(id: string) {
  return (dispatch: (arg: any) => void): any => {
    dispatch(setServicesLoading(true));

    firestore()
      .collection('contact-us')
      .doc(id)
      .get()
      .then(snapShot => {
        if (snapShot.exists && snapShot.data()) {
          dispatch(
            addToContactUsMessages({
              [id]: snapShot.data() as any,
            }),
          );
        }
        dispatch(setServicesLoading(false));
      })
      .catch(() => {
        dispatch(setServicesLoading(false));
      });
  };
}
// -----------------><----------------

export function setOrderDetails(
  payload: orderDetailsActionType['payload'],
): orderDetailsActionType {
  return {
    type: setOrderDetailsConst,
    payload,
  };
}
export function clearOrderDetails(): any {
  return {
    type: clearOrderDetailsConst,
  };
}
// -----------------><----------------
export function addToPostAdRequests(
  payload: postAdRequestsActionType['payload'],
): postAdRequestsActionType {
  return {
    type: addToPostAdRequestsConst,
    payload,
  };
}
export function modifyPostAdRequest(
  payload: postAdRequestsActionType['payload'],
): postAdRequestsActionType {
  return {
    type: modifyPostAdRequestConst,
    payload,
  };
}
export function removeFromPostAdRequests(payload: string): stringActionType {
  return {
    type: removeFromPostAdRequestsConst,
    payload,
  };
}

export function setMarkPostAdRequest(payload: string): stringActionType {
  return {
    type: setMarkPostAdRequestConst,
    payload,
  };
}
export function setUnMarkPostAdRequest(
  payload: stringActionType['payload'],
): stringActionType {
  return {
    type: setUnMarkPostAdRequestConst,
    payload,
  };
}
export function clearAllPostAdRequests(): any {
  return {
    type: clearAllPostAdRequestsConst,
  };
}

export function fetchPostAdRequest(id: string) {
  return (dispatch: (arg: any) => void): any => {
    dispatch(setServicesLoading(true));
    firestore()
      .collection('post-ad-requests')
      .doc(id)
      .get()
      .then(snapShot => {
        if (snapShot.exists && snapShot.data()) {
          dispatch(
            addToPostAdRequests({
              [id]: snapShot.data() as any,
            }),
          );
        }
        dispatch(setServicesLoading(false));
      })
      .catch(() => {
        dispatch(setServicesLoading(false));
      });
  };
}

// -----------------><----------------
export function setUsers(
  payload: setUsersActionType['payload'],
): setUsersActionType {
  return {
    type: setUsersConst,
    payload,
  };
}
export function modifyUser(
  payload: modifyUserActionType['payload'],
): modifyUserActionType {
  return {
    type: setUsersConst,
    payload,
  };
}
export function clearAllUsers(): any {
  return {
    type: clearAllUsersConst,
  };
}

export function fetchUser(id: string) {
  return (dispatch: (arg: any) => void): any => {
    dispatch(setServicesLoading(true));
    database()
      .ref(`users/${id}`)
      .once('value', snapShot => {
        if (snapShot.exists() && snapShot.val()) {
          dispatch(
            setUsers({
              [id]: snapShot.val(),
            }),
          );
        }
      })
      .then(() => {
        dispatch(setServicesLoading(false));
      })
      .catch(() => {
        dispatch(setServicesLoading(false));
      });
  };
}

// -----------------><----------------
export function addToTrash(
  payload: addToTrashActionType['payload'],
): addToTrashActionType {
  return {
    type: addToTrashConst,
    payload,
  };
}
export function removeFromTrash(payload: string): stringActionType {
  return {
    type: removeFromTrashConst,
    payload,
  };
}

export function setMarkTrash(payload: string): stringActionType {
  return {
    type: setMarkTrashConst,
    payload,
  };
}
export function setUnMarkTrash(payload: string): stringActionType {
  return {
    type: setUnMarkTrashConst,
    payload,
  };
}
export function clearAllTrash(): any {
  return {
    type: clearAllTrashConst,
  };
}

// -----------------------><----------------------
interface schema {
  collection: string;
  shouldMark: boolean;
  id: string;
}
export function setFirestoreShouldMark({
  collection,
  shouldMark,
  id,
}: schema): any {
  firestore().collection(collection).doc(id).set(
    {
      shouldMark,
    },
    {merge: true},
  );
}

// -----------------------><-------------------->
export function addNotification(
  payload: addNotificationActionType['payload'],
): addNotificationActionType {
  return {
    type: addNotificationConst,
    payload,
  };
}
export function clearAllNotifications(): any {
  return {
    type: clearAllNotificationsConst,
  };
}

// -----------------------><-------------------->
export function setUnMarkNotification(payload:string): stringActionType {
  return {
    type: setUnMarkNotificationConst,
    payload
  };
}
export function setMarkNotification(payload:string): stringActionType {
  return {
    type: setMarkNotificationConst,
    payload
  };
}
