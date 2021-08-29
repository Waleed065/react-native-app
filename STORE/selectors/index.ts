import {createSelector} from 'reselect';
import {
  stateTypes,
  servicesHeadingsStateType,
  servicesHeadingsPayload,
  activeTabStateType,
  servicesSearchTitleStateType,
  servicesSearchTitlePayload,
  servicesSearchTitleDocument,
  servicesSearchCategoriesStateType,
  servicesSearchCategoriesSchema,
  servicesCategoryItemsStateType,
  servicesCategoryItemsDocument,
  servicesCategoryItemType,
  whiteListStateType,
  destinationStateType,
  servicesHeadingsDocument,
  cartStateType,
  commentsStateType,
  commentsItemType,
  servicesSearchCategoriesDocument,
  messagesStateType,
  chatRoomPayloadSchema,
  allChatsSchema,
  servicesItemsPayloadType,
  addOnCategoriesStateType,
  addOnCategoriesSchema,
  addOnItemsStateType,
  addOnItemsPayloadType,
  addOnTitleStateType,
  addOnTitlePayload,
  addOnTitleDocument,
  servicesSearchCategoriesItemType,
  singleOrderSchema,
  ordersStateType,
  singleOrder,
  trashStateType,
  postAdRequestsStateType,
  singlePostAdRequestSchema,
  singlePostAdRequest,
  contactUsStateType,
  singleContactUsMessageSchema,
  singleContactUsMessage,
  messageG,
  notificationsStateType,
} from '../../types';
import {STORE} from '../index';

const titleSelector = (state: stateTypes) => state.servicesSearchTitle;
const currentAddOnTitleSelector = (state: stateTypes) =>
  state.currentAddOnTitle;
const headingsSelector = (state: stateTypes) => state.servicesHeadings;
const activeTabSelector = (state: stateTypes) => state.activeTab;
const activeAdTabSelector = (state: stateTypes) => state.activeAdTab;
const categoriesSelector = (state: stateTypes) =>
  state.servicesSearchCategories;
const addOnCategoriesSelector = (state: stateTypes) => state.addOnCategories;
const itemsSelector = (state: stateTypes) => state.servicesCategoryItems;
const addOnItemsSelector = (state: stateTypes) => state.addOnItems;
const commentsSelector = (state: stateTypes) => state.comments;
const whiteListSelector = (state: stateTypes) => state.whiteList;
const destinationSelector = (state: stateTypes) => state.destination;
const postAdDestinationSelector = (state: stateTypes) =>
  state.postAdDestination;
const cart = (state: stateTypes) => state.cart;
const currentItemIdSelector = (state: stateTypes, itemId: string) => itemId;
const chatsSelector = (state: stateTypes) => state.messages;
const currentChatIdSelector = (state: stateTypes, chatId: string) => chatId;
const ordersSelector = (state: stateTypes) => state.orders;
const adRequestsSelector = (state: stateTypes) => state.postAdRequests;
const contactUsMessagesSelector = (state: stateTypes) => state.contactUs;
const trashSelector = (state: stateTypes) => state.trash;
const notificationsSelector = (state: stateTypes) => state.notifications;
const idSelector = (state: stateTypes, id: string) => id;

const servicesSearchCategories = () =>
  STORE.getState().servicesSearchCategories;

// --------------------------><--------------------------
function headingsList(
  servicesHeadings: servicesHeadingsStateType,
  activeTab: activeTabStateType,
): servicesHeadingsPayload {
  return (
    servicesHeadings[activeTab] || {
      shouldFetch: true,
      headings: servicesHeadingsDocument,
    }
  );
}

export const getServicesHeadings = createSelector(
  headingsSelector,
  activeTabSelector,
  headingsList,
);

export const getPostAdServicesHeadings = createSelector(
  headingsSelector,
  activeAdTabSelector,
  headingsList,
);

// --------------------------><--------------------------
function getSearchTitle(
  servicesSearchTitle: servicesSearchTitleStateType,
  activeTab: activeTabStateType,
  destination: destinationStateType,
): servicesSearchTitlePayload {
  const {country, city} = destination;

  const servicesTitle = servicesSearchTitle[activeTab]?.[country]?.[city];

  if (servicesTitle) {
    return servicesTitle;
  } else {
    return {
      shouldFetch: true,
      servicesTitle: servicesSearchTitleDocument,
    };
  }
}

export const getServicesSearchTitle = createSelector(
  titleSelector,
  activeTabSelector,
  destinationSelector,
  getSearchTitle,
);
// --------------------------><--------------------------
function getAddOnTitle(
  activeTab: activeTabStateType,
  destination: destinationStateType,
  servicesSearchTitle: servicesSearchTitleStateType,
  currentAddOnTitle: addOnTitleStateType,
): addOnTitlePayload | undefined {
  const {country, city} = destination;

  const category =
    servicesSearchTitle[activeTab]?.[country]?.[city]?.servicesTitle.category;
  if (!category) return undefined;
  return (
    currentAddOnTitle?.[activeTab]?.[country]?.[city]?.[category] || {
      shouldFetch: true,
      servicesAddOn: addOnTitleDocument,
    }
  );
}

export const getCurrentAddOnTitle = createSelector(
  activeTabSelector,
  destinationSelector,
  titleSelector,
  currentAddOnTitleSelector,
  getAddOnTitle,
);

// --------------------------><--------------------------
const getCategoriesList = (
  servicesSearchCategories: servicesSearchCategoriesStateType,
  activeTab: activeTabStateType,
  destination: destinationStateType,
): servicesSearchCategoriesSchema => {
  const {country, city} = destination;
  return (
    servicesSearchCategories[activeTab]?.[country]?.[city] || {
      shouldFetch: true,
      servicesCategories: {
        fuckOffYo: servicesSearchCategoriesDocument,
      },
    }
  );
};

export const getServicesCategories = createSelector(
  categoriesSelector,
  activeTabSelector,
  destinationSelector,
  getCategoriesList,
);
// --------------------------><--------------------------
const getAddOnCategoriesList = (
  activeTab: activeTabStateType,
  destination: destinationStateType,
  servicesSearchTitle: servicesSearchTitleStateType,
  addOnCategories: addOnCategoriesStateType,
): addOnCategoriesSchema | undefined => {
  const {country, city} = destination;
  const servicesTitle =
    servicesSearchTitle[activeTab]?.[country]?.[city]?.servicesTitle.category;
  if (!servicesTitle) return undefined;

  return addOnCategories?.[activeTab]?.[country]?.[city]?.[servicesTitle] || [];
};
export const getAddOnCategories = createSelector(
  activeTabSelector,
  destinationSelector,
  titleSelector,
  addOnCategoriesSelector,
  getAddOnCategoriesList,
);

// --------------------------><--------------------------

const servicesItemsList = (
  servicesCategoryItems: servicesCategoryItemsStateType,
  activeTab: activeTabStateType,
  destination: destinationStateType,
  servicesSearchTitle: servicesSearchTitleStateType,
): servicesItemsPayloadType | undefined => {
  const {country, city} = destination;
  const category =
    servicesSearchTitle[activeTab]?.[country]?.[city]?.servicesTitle.category;
  if (!category) return undefined;

  return (
    servicesCategoryItems[activeTab]?.[country]?.[city]?.[category] || {
      shouldFetch: true,
      servicesItems: {},
    }
  );
};

export const getServicesItems = createSelector(
  itemsSelector,
  activeTabSelector,
  destinationSelector,
  titleSelector,
  servicesItemsList,
);

// --------------------------><--------------------------

const addOnItemsList = (
  activeTab: activeTabStateType,
  destination: destinationStateType,
  servicesSearchTitle: servicesSearchTitleStateType,
  currentAddOnTitle: addOnTitleStateType,
  addOnItems: addOnItemsStateType,
): addOnItemsPayloadType | undefined => {
  const {country, city} = destination;
  const category =
    servicesSearchTitle[activeTab]?.[country]?.[city]?.servicesTitle.category;
  if (!category) return undefined;

  const addOn =
    currentAddOnTitle?.[activeTab]?.[country]?.[city]?.[category]?.servicesAddOn
      .addOn;
  if (!addOn) return undefined;

  return (
    addOnItems?.[activeTab]?.[country]?.[city]?.[category]?.[addOn] || {
      shouldFetch: true,
      addOnItems: [],
    }
  );
};

export const getAddOnItems = createSelector(
  activeTabSelector,
  destinationSelector,
  titleSelector,
  currentAddOnTitleSelector,
  addOnItemsSelector,
  addOnItemsList,
);

// --------------------------><--------------------------

const whiteListCities = (
  activeTab: activeTabStateType,
  whiteList: whiteListStateType,
  destination: destinationStateType,
): string[] => {
  return whiteList[activeTab]?.[destination?.country] || [];
};

export const getWhiteListCities = createSelector(
  activeTabSelector,
  whiteListSelector,
  destinationSelector,
  whiteListCities,
);
export const getPostAdWhiteListCities = createSelector(
  activeAdTabSelector,
  whiteListSelector,
  postAdDestinationSelector,
  whiteListCities,
);
// --------------------------><--------------------------

// --------------------------><--------------------------
const whiteListCountries = (
  activeTab: activeTabStateType,
  whiteList: whiteListStateType,
): {[country: string]: string[]} => {
  return whiteList[activeTab] || {};
};

export const getWhiteListCountries = createSelector(
  activeTabSelector,
  whiteListSelector,
  whiteListCountries,
);
export const getPostAdWhiteListCountries = createSelector(
  activeAdTabSelector,
  whiteListSelector,
  whiteListCountries,
);
// --------------------------><--------------------------

// --------------------------><--------------------------

const currentItem = (
  servicesCategoryItems: servicesItemsPayloadType | undefined,
  currentItemId: string,
): servicesCategoryItemType => {
  if (servicesCategoryItems) {
    return (
      servicesCategoryItems?.servicesItems?.[currentItemId] ||
      servicesCategoryItemsDocument
    );
  }

  return servicesCategoryItemsDocument;
};

export const getCurrentItem = createSelector(
  getServicesItems,
  currentItemIdSelector,
  currentItem,
);

// --------------------------><--------------------------
export const randomItem = (
  servicesCategoryItems: servicesItemsPayloadType | undefined,
): servicesCategoryItemType => {
  if (servicesCategoryItems) {
    const items = Object.values(servicesCategoryItems?.servicesItems);
    const randomItemIndex = Math.floor(Math.random() * items?.length);
    return items?.[randomItemIndex] || servicesCategoryItemsDocument;
  }

  return servicesCategoryItemsDocument;
};

export const getRandomItem = createSelector(getServicesItems, randomItem);

// --------------------------><--------------------------

const allComments = (
  comments: commentsStateType,
  activeTab: activeTabStateType,
  destination: destinationStateType,
  servicesSearchTitle: servicesSearchTitleStateType,
  currentItemId: string,
): {[key: string]: commentsItemType} | undefined => {
  const {country, city} = destination;
  const category =
    servicesSearchTitle[activeTab]?.[country]?.[city]?.servicesTitle.category;
  if (!category || !currentItemId) return undefined;
  return (
    comments[activeTab]?.[country]?.[city]?.[category]?.[currentItemId] || {}
  );
};

export const getComments = createSelector(
  commentsSelector,
  activeTabSelector,
  destinationSelector,
  titleSelector,
  currentItemIdSelector,

  allComments,
);

// --------------------------><--------------------------
interface cartAddedSchema {
  cart: any;
  destination: any;
  tab: any;
  item: any;
  category: any;
}

export const isAddedToCart = ({
  cart,
  destination,
  tab,
  item,
  category,
}: cartAddedSchema): boolean => {
  const {country, city} = destination;
  return (
    cart?.[tab]?.[country]?.[city]?.[category]?.some(
      (cartItem: any) => cartItem.item === item,
    ) || false
  );
};

// --------------------------><--------------------------
interface cartCategorySchema {
  tab: activeTabStateType;
  country: string;
  city: string;
  category: string;
}
export function getCategory({
  tab,
  country,
  city,
  category,
}: cartCategorySchema): servicesSearchCategoriesItemType {
  return (
    servicesSearchCategories()[tab]?.[country]?.[city]?.servicesCategories?.[
      category
    ] || servicesSearchCategoriesDocument
  );
}
// --------------------------><--------------------------
const objSort = (prevValue: any, nextValue: any) => {
  if (nextValue.lastMessage.sentAt > prevValue.lastMessage.sentAt) {
    return 1;
  } else if (nextValue.lastMessage.sentAt < prevValue.lastMessage.sentAt) {
    return -1;
  } else {
    return 0;
  }
};

const allPublicChats = (chats: messagesStateType): allChatsSchema[] => {
  const newChat: allChatsSchema[] = [];
  Object.keys(chats)
    .filter(
      chatId =>
        Object.keys(chats[chatId].memberDetails).indexOf('--admin--') === -1,
    )
    .forEach(chatId => {
      newChat.push({
        chatId,
        chatDetails: chats[chatId].chatDetails,
        memberDetails: chats[chatId].memberDetails,

        lastMessage: Object.values(chats[chatId].messages).shift() ?? messageG,
      });
    });
  newChat.sort(objSort);
  return newChat;
};

const allAdminChats = (chats: messagesStateType): allChatsSchema[] => {
  const newChat: allChatsSchema[] = [];

  Object.keys(chats)
    .filter(
      chatId =>
        Object.keys(chats[chatId].memberDetails).indexOf('--admin--') > -1,
    )
    .forEach(chatId => {
      newChat.push({
        chatId,
        chatDetails: chats[chatId].chatDetails,
        memberDetails: chats[chatId].memberDetails,
        lastMessage: Object.values(chats[chatId].messages).pop() ?? messageG,
      });
    });

  newChat.sort(objSort);
  return newChat;
};

export const getPublicChats = createSelector(
  chatsSelector,

  allPublicChats,
);
export const getAdminChats = createSelector(
  chatsSelector,

  allAdminChats,
);

// --------------------------><--------------------------
const currentChatDocument = {
  chatDetails: {},
  memberDetails: {},
  messages: {},
};
const currentChat = (
  chatId: string,
  chats: messagesStateType,
): chatRoomPayloadSchema => {
  return chats[chatId] || currentChatDocument;
};

export const getCurrentChat = createSelector(
  currentChatIdSelector,
  chatsSelector,

  currentChat,
);
// --------------------------><--------------------------

const orderDetails = (
  orders: ordersStateType,
  orderId: string,
): singleOrderSchema => {
  return orders[orderId] ?? singleOrder;
};

export const getOrderDetails = createSelector(
  ordersSelector,
  idSelector,

  orderDetails,
);
// --------------------------><--------------------------
const adRequestDetails = (
  postAdRequests: postAdRequestsStateType,
  id: string,
): singlePostAdRequestSchema => {
  return postAdRequests[id] ?? singlePostAdRequest;
};

export const getPostAdRequestDetails = createSelector(
  adRequestsSelector,
  idSelector,

  adRequestDetails,
);
// --------------------------><--------------------------
const contactUsMessageDetails = (
  contactUsMessages: contactUsStateType,
  id: string,
): singleContactUsMessageSchema => {
  return contactUsMessages[id] ?? singleContactUsMessage;
};

export const getContactUsMessageDetails = createSelector(
  contactUsMessagesSelector,
  idSelector,

  contactUsMessageDetails,
);

// --------------------------><--------------------------

const trashOrderDetails = (
  trash: trashStateType,
  orderId: string,
): singleOrderSchema => {
  return (
    trash[orderId] ?? {
      ...singleOrder,
      collection: 'orders',
    }
  );
};

export const getTrashOrderDetails = createSelector(
  trashSelector,
  idSelector,

  trashOrderDetails,
);
// --------------------------><--------------------------

const trashAdRequestDetails = (
  trash: trashStateType,
  orderId: string,
): singlePostAdRequestSchema => {
  return (
    trash[orderId] ?? {
      ...singlePostAdRequest,
      collection: 'post-ad-requests',
    }
  );
};

export const getTrashAdRequestDetails = createSelector(
  trashSelector,
  idSelector,

  trashAdRequestDetails,
);

const trashContactUsMessageDetails = (
  trash: trashStateType,
  orderId: string,
): singleContactUsMessageSchema => {
  return (
    trash[orderId] ?? {
      ...singleContactUsMessage,
      collection: 'contact-us',
    }
  );
};

export const getTrashContactUsMessageDetails = createSelector(
  trashSelector,
  idSelector,

  trashContactUsMessageDetails,
);

// --------------------------><--------------------------
const pendingOrders = (
  orders: ordersStateType,
  userId: string,
): ordersStateType => {
  const objectData: ordersStateType = {};

  Object.keys(orders).forEach(key => {
    if (orders[key].userId === userId) {
      objectData[key] = orders[key];
    }
  });
  return objectData;
};

export const getPendingOrders = createSelector(
  ordersSelector,
  idSelector,
  pendingOrders,
);
// --------------------------><--------------------------
const pendingUserAdRequests = (
  adRequests: postAdRequestsStateType,
  userId: string,
): postAdRequestsStateType => {
  const objectData: postAdRequestsStateType = {};

  Object.keys(adRequests).forEach(key => {
    if (adRequests[key].userId === userId) {
      objectData[key] = adRequests[key];
    }
  });
  return objectData;
};

export const getPendingUserAdRequests = createSelector(
  adRequestsSelector,
  idSelector,
  pendingUserAdRequests,
);
// --------------------------><--------------------------

const unreadNotifications = (notifications: notificationsStateType): number => {
  return Object.values(notifications).reduce(
    (total, notify) => (!notify.shouldMark ? total + 1 : total),
    0,
  );
};

export const getUnReadNotifications = createSelector(
  notificationsSelector,
  unreadNotifications,
);

// --------------------------><--------------------------

const totalPrice = (cartList: cartStateType): number => {
  let grandTotal = 0;
  const tabs = Object.keys(cartList);
  tabs.forEach(tab => {
    const countries = Object.keys(cartList[tab]);
    countries.forEach(country => {
      const cities = Object.keys(cartList[tab][country]);
      cities.forEach(city => {
        const categories = Object.keys(cartList[tab][country][city]);
        categories.forEach(category => {
          cartList[tab][country][city][category].forEach(categoryItem => {
            grandTotal += categoryItem.document.price;
          });
        });
      });
    });
  });

  return grandTotal;
};

export const getTotalPrice = createSelector(cart, totalPrice);
