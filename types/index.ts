export interface booleanActionType {
  type: string;
  payload: boolean;
}

// ---------------------->Index<--------------------
export interface indexActionType {
  type: string;
  payload: number;
}
// ---------------------->string<--------------------
export interface stringActionType {
  type: string;
  payload: string;
}
// ---------------------->Active Tab<--------------------
export type activeTabSchema = string;
export type activeTabStateType = string;
export interface activeTabActionType {
  type: string;
  payload: activeTabSchema;
}

// ---------------------->Categories<--------------------

export const servicesSearchCategoriesDocument = {
  tab: '',
  category: '',
  destination: {
    country: '',
    city: '',
  },
  document: {
    avatar: undefined,
    details: '',
    price: 0,
    title: '',
  },
};

export interface servicesSearchCategoriesItemType {
  tab: string;
  category: string;
  destination: {
    country: string;
    city: string;
  };
  document: {
    avatar: string | undefined;
    details: string;
    price: number;
    title: string;
  };
}

export type servicesSearchCategoriesSchema = {
  shouldFetch: boolean;
  servicesCategories: {
    [category: string]: servicesSearchCategoriesItemType;
  };
};

export interface servicesSearchCategoriesStateType {
  [tab: string]: {
    [country: string]: {
      [city: string]: servicesSearchCategoriesSchema;
    };
  };
}
export interface servicesSearchCategoriesActionType {
  type: string;
  payload: {
    tab: string;
    destination: {
      country: string;
      city: string;
    };
    allCategories: servicesSearchCategoriesSchema;
  };
}
// ---------------------->Add-on categories<--------------------
export const addOnCategoriesDocument = {
  tab: '',
  category: '',
  addOn: '',
  destination: {
    country: '',
    city: '',
  },
  document: {
    avatar: undefined,
    details: '',
    price: 0,
    title: '',
  },
};

export interface addOnCategoriesItemType {
  tab: string;
  category: string;
  addOn: string;
  destination: {
    country: string;
    city: string;
  };
  document: {
    avatar: string | undefined;
    details: string;
    price: number;
    title: string;
  };
}

export type addOnCategoriesSchema = Array<addOnCategoriesItemType>;

export interface addOnCategoriesStateType {
  [tab: string]: {
    [country: string]: {
      [city: string]: {
        [category: string]: addOnCategoriesSchema;
      };
    };
  };
}
export interface addOnCategoriesActionType {
  type: string;
  payload: {
    tab: string;
    destination: {
      country: string;
      city: string;
    };
    category: string;
    allAddOns: addOnCategoriesSchema;
  };
}

// ---------------------->Title<--------------------
export const servicesSearchTitleDocument = {
  tab: '',
  category: '',
  destination: {
    country: '',
    city: '',
  },
  document: {
    avatar: undefined,
    details: '',
    price: 0,
    title: '',
  },
};

export type servicesSearchTitleSchema = servicesSearchCategoriesItemType;
export type servicesSearchTitlePayload = {
  shouldFetch: boolean;
  servicesTitle: servicesSearchTitleSchema;
};
export interface servicesSearchTitleStateType {
  [tab: string]: {
    [country: string]: {
      [city: string]: servicesSearchTitlePayload;
    };
  };
}
export interface servicesSearchTitleActionType {
  type: string;
  payload: servicesSearchTitlePayload;
}

// ---------------------->add-on-currentTitle<--------------------
export const addOnTitleDocument = {
  tab: '',
  category: '',
  addOn: '',
  destination: {
    country: '',
    city: '',
  },
  document: {
    avatar: undefined,
    details: '',
    price: 0,
    title: '',
  },
};

export interface addOnTitleSchema {
  tab: string;
  category: string;
  addOn: string;
  destination: {
    country: string;
    city: string;
  };
  document: {
    avatar: string | undefined;
    details: string;
    price: number;
    title: string;
  };
}
export type addOnTitlePayload = {
  shouldFetch: boolean;
  servicesAddOn: addOnTitleSchema;
};
export interface addOnTitleStateType {
  [tab: string]: {
    [country: string]: {
      [city: string]: {
        [category: string]: addOnTitlePayload;
      };
    };
  };
}
export interface addOnTitleActionType {
  type: string;
  payload: addOnTitlePayload;
}

// ---------------------->add-on-Items<--------------------
export const addOnItemsDocument = {
  document: {
    about: '',
    amenities: {},
    avatar: undefined,
    details: '',
    pictures: [],
    premium: false,
    price: 0,
    rating: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    title: '',
    // location: {
    //   x_: 0,
    //   N_: 0,
    // },
    userId: '',
    documentId: '',
  },
  tab: '',
  category: '',
  item: '',
  destination: {
    country: '',
    city: '',
  },
  addOn: '',
};

export interface addOnItemType {
  document: {
    about: string;
    amenities: {
      [key: string]: boolean;
    };
    avatar: string | undefined;
    details: string;
    documentId: string;
    // location: any;
    pictures: string[];
    premium: boolean;
    price: number;
    rating: {
      fiveStar: number;
      fourStar: number;
      threeStar: number;
      twoStar: number;
      oneStar: number;
    };
    title: string;
    // userId: string;
  };
  addOnItem: string;
  destination: {
    country: string;
    city: string;
  };
  tab: string;
  category: string;
  addOn: string;
}

export type addOnItemsPayloadType = {
  shouldFetch: boolean;
  addOnItems: addOnItemType[];
};

export interface addOnItemsStateType {
  [tab: string]: {
    [country: string]: {
      [city: string]: {
        [category: string]: {
          [addOn: string]: addOnItemsPayloadType;
        };
      };
    };
  };
}

export interface addOnItemsActionType {
  type: string;
  payload: {
    tab: string;
    category: string;
    addOn: string;
    destination: {
      country: string;
      city: string;
    };
    addOnItems: addOnItemType[];
    shouldFetch: boolean;
  };
}

// ---------------------->Items<--------------------
export const servicesCategoryItemsDocument = {
  document: {
    about: '',
    amenities: {},
    avatar: undefined,
    details: '',
    pictures: [],
    premium: false,
    price: 0,
    rating: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    title: '',
    location: {
      x_: 0,
      N_: 0,
    },
    userId: '',
    documentId: '',
  },
  tab: '',
  category: '',
  item: '',
  destination: {
    country: '',
    city: '',
  },
};

export interface servicesCategoryItemType {
  document: {
    about: string;
    amenities: {
      [key: string]: boolean;
    };
    avatar: string | undefined;
    commentsInfo?: {
      deletedComments: number;
      postedComments: number;
      totalComments: number;
    };
    details?: string;
    documentId: string;
    location: {
      x_: number;
      N_: number;
    };
    pictures: string[];
    premium: boolean;
    price: number;
    rating: {
      fiveStar: number;
      fourStar: number;
      threeStar: number;
      twoStar: number;
      oneStar: number;
    };
    title: string;
    userId: string;
  };
  destination: {
    country: string;
    city: string;
  };
  item: string;
  tab: string;
  category: string;
}

export type servicesItemsPayloadType = {
  shouldFetch: boolean;
  servicesItems: {
    [key: string]: servicesCategoryItemType;
  };
};

export interface servicesCategoryItemsStateType {
  [tab: string]: {
    [country: string]: {
      [city: string]: {
        [categoryKey: string]: servicesItemsPayloadType;
      };
    };
  };
}

export interface servicesCategoryItemsActionType {
  type: string;
  payload: {
    tab: string;
    category: string;
    destination: {
      country: string;
      city: string;
    };
    categoryItems: {
      [key: string]: servicesCategoryItemType;
    };
    shouldFetch: boolean;
  };
}

// ---------------------->Comments<--------------------

export type commentsItemType = {
  avatar: string | undefined;
  comment: string;
  dated: {
    seconds: number;
    nanoseconds: number;
  };
  downVotes: number;
  upVotes: number;
  id: string;
  name: string;
  rated: string;
};

export interface commentsStateType {
  [tab: string]: {
    [country: string]: {
      [city: string]: {
        [categoryKey: string]: {
          [itemId: string]: {
            [key: string]: commentsItemType;
          };
        };
      };
    };
  };
}
export interface commentsActionType {
  type: string;
  payload: {
    tab: string;
    category: string;
    destination: {
      country: string;
      city: string;
    };
    itemId: string;
    comments: {
      [key: string]: commentsItemType;
    };
  };
}
// ---------------------->Heading<--------------------
export const servicesHeadingsDocument = {
  tab: '',
  document: {
    calendarHeadingOne: '',
    calendarHeadingTwo: '',
    categoriesHeading: '',
    locationHeadingOne: '',
    locationHeadingTwo: '',
    itemsHeading: '',
    pictures: [],
  },
};

export interface servicesHeadingsSchema {
  tab: string;
  document: {
    calendarHeadingOne: string;
    calendarHeadingTwo: string;
    categoriesHeading: string;
    locationHeadingOne: string;
    locationHeadingTwo: string;
    itemsHeading: string;
    pictures: string[];
  };
}
export type servicesHeadingsPayload = {
  shouldFetch: boolean;
  headings: servicesHeadingsSchema;
};
export interface servicesHeadingsStateType {
  [tab: string]: servicesHeadingsPayload;
}
export interface servicesHeadingsActionType {
  type: string;
  payload: servicesHeadingsPayload;
}

// ---------------------->Calendar<--------------------
export const defaultCalendarDate = {
  dateString: '',
  day: 0,
  month: 0,
  timestamp: 0,
  year: 0,
};

export type calendarDate = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

// ---------------------->Cart<--------------------

export interface cartSchema {
  document: {
    about: string;
    amenities: {
      [key: string]: boolean;
    };
    avatar: string | undefined;
    commentsInfo?: {
      deletedComments: number;
      postedComments: number;
      totalComments: number;
    };
    details?: string;
    documentId: string;
    location: {
      x_: number;
      N_: number;
    };

    pictures: string[];
    premium: boolean;
    price: number;
    rating: {
      fiveStar: number;
      fourStar: number;
      threeStar: number;
      twoStar: number;
      oneStar: number;
    };
    title: string;
    userId: string;
  };
  destination: {
    country: string;
    city: string;
  };
  calendar: {
    from: {
      day: number;
      month: number;
      year: number;
    } | null;
    to: {
      day: number;
      month: number;
      year: number;
    } | null;
  };
  item: string;
  tab: string;
  category: string;
}

export interface cartStateType {
  [tab: string]: {
    [country: string]: {
      [city: string]: {
        [categoryKey: string]: cartSchema[];
      };
    };
  };
}

export interface cartActionType {
  type: string;
  payload: cartSchema;
}

// ---------------------->White List<--------------------

export type whiteListStateType = {
  [tab: string]: {
    [country: string]: string[];
  };
};
export interface whiteListActionType {
  type: string;
  payload: {
    tab: string;
    whiteList: {
      [country: string]: string[];
    };
  };
}
// ---------------------->Destination<--------------------

export type destinationStateType = {
  country: string;
  city: string;
};
export interface destinationActionType {
  type: string;
  payload: destinationStateType;
}

// ---------------------->Flash Message<--------------------
export type flashMessageStateType = {
  message: string;
  color?: string;
  icon?: any;
};

export interface flashMessageActionType {
  type: string;
  payload: flashMessageStateType;
}
// ---------------------->Pendings Ads<--------------------
export type pendingAdsItemType = {
  about: string;
  amenities: {
    [key: string]: boolean;
  };
  avatar: string | undefined;
  categoryTitle: string;
  destination: {
    country: string;
    city: string;
  };
  itemTitle: string;
  location: {
    x_: number;
    N_: number;
  };

  details: string;
  pictures: string[];
  price: number;
  item: string;

  service: string;
  userId: string;
};
export type pendingAdsStateType = servicesCategoryItemType[];

export interface pendingAdsActionType {
  type: string;
  payload: servicesCategoryItemType[];
}
// ---------------------->Active Ads<--------------------
export type activeAdsStateType = {
  [userId: string]: {
    [key: string]: servicesCategoryItemType;
  };
};

export interface activeAdsActionType {
  type: string;
  payload: {
    userId: string;
    itemItSelf: {
      [key: string]: servicesCategoryItemType;
    };
  };
}
// ---------------------->Favourites<--------------------
export type favouritesStateType = servicesCategoryItemType[];

export interface setFavouritesActionType {
  type: string;
  payload: favouritesStateType;
}
export interface removeFavouritesActionType {
  type: string;
  payload: string;
}
// ---------------------->Favourites<--------------------
export type favourityIdsStateType = string[];
export interface setFavourityIdActionType {
  type: string;
  payload: favourityIdsStateType;
}
export interface removeFavourityIdActionType {
  type: string;
  payload: string;
}
// ---------------------->orders<--------------------
export const singleOrder = {
  displayName: '',
  email: '',
  newOrder: [],
  phoneNumber: '',
  time: {
    seconds: 0,
    nanoseconds: 0,
  },
  totalPrice: 0,
  userId: '',
  shouldMark: undefined,
};
export type singleOrderSchema = {
  displayName: string | null | false;
  email: string | null;
  newOrder: {
    calendar: {
      from: {
        seconds: number;
        nanoseconds: number;
      };
      to: {
        seconds: number;
        nanoseconds: number;
      };
    };
    categoryId: string;
    destination: {
      country: string;
      city: string;
    };
    itemId: string;
    premium: boolean;
    price: number;
    service: string;
    title: string;
    avatar: string | undefined;
  }[];
  phoneNumber: string;
  time: {
    seconds: number;
    nanoseconds: number;
  } | null;
  totalPrice: number;
  userId: string;
  shouldMark?: boolean;
};
export type ordersStateType = {
  [orderId: string]: singleOrderSchema;
};
export interface ordersActionType {
  type: string;
  payload: ordersStateType;
}

// ---------------------->Order Details<--------------------
export type orderDetailsStateType = {
  tabParam: string;
  itemParam: string;
  countryParam: string;
  cityParam: string;
  categoryParam: string;
  fromDate: {
    seconds: number;
    nanoseconds: number;
  };
  toDate: {
    seconds: number;
    nanoseconds: number;
  };
};
export interface orderDetailsActionType {
  type: string;
  payload: orderDetailsStateType;
}

// ---------------------->Post Ad Requests<--------------------
export const singlePostAdRequest = {
  about: '',
  amenities: {},
  avatar: false,
  categoryTitle: '',
  destination: {
    country: '',
    city: '',
  },
  itemTitle: '',
  location: {
    x_: 0,
    N_: 0,
  },
  pictures: [],
  price: 0,
  service: '',
  time: {
    seconds: 0,
    nanoseconds: 0,
  },
  userId: '',
};
export type singlePostAdRequestSchema = {
  shouldMark?: boolean;
  about: string;
  amenities: {
    [key: string]: boolean;
  };
  avatar: string | false;
  categoryTitle: string;
  destination: {
    country: string;
    city: string;
  };
  itemTitle: string;
  location: {
    _latitude: number;
    _longitude: number;
  };
  pictures: string[];
  price: number;
  service: string;
  time: {
    seconds: number;
    nanoseconds: number;
  } | null;
  userId: string;
};
export interface postAdRequestsStateType {
  [key: string]: singlePostAdRequestSchema;
}

export interface postAdRequestsActionType {
  type: string;
  payload: postAdRequestsStateType;
}

// ---------------------->Contact Us<--------------------
export const singleContactUsMessage = {
  shouldMark: undefined,
  email: '',
  message: '',
  name: '',
  number: '',
  time: {
    seconds: 0,
    nanoseconds: 0,
  },
  userId: '',
};
export type singleContactUsMessageSchema = {
  shouldMark?: boolean;
  email: string;
  message: string;
  name: string;
  number: string;
  time: {
    seconds: number;
    nanoseconds: number;
  } | null;
  userId: string;
};

export interface contactUsStateType {
  [key: string]: singleContactUsMessageSchema;
}

export interface contactUsActionType {
  type: string;
  payload: contactUsStateType;
}

// ---------------------->User Info<--------------------
type userInfoPayload = {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
};

export type userInfoStateType = userInfoPayload;

export interface userInfoActionType {
  type: string;
  payload: userInfoPayload;
}
export interface updateUserInfoActionType {
  type: string;
  payload: {
    displayName?: string | null;
    email?: string | null;
    emailVerified?: boolean;
    phoneNumber?: string | null;
    photoURL?: string | null;
    uid?: string;
  };
}

// ---------------------->Messages<--------------------

export const messageG = {
  msgId: '',
  type: '',
  from: '',
  content: '',
  sentAt: 0,
};
export type messageSchema = {
  msgId: string;
  type: string;
  from: string;
  content: string;
  sentAt: number;
};
export type memberDetailsSchema = {
  displayName: string | false;
  photoURL: string | false;
};
export type messagesStateType = {
  [chatRoomId: string]: {
    chatDetails: memberDetailsSchema;
    memberDetails: {
      [id: string]: memberDetailsSchema;
    };
    messages: {
      [key: string]: messageSchema;
    };
    createdAt: number | null;
  };
};

export type chatRoomPayloadSchema = {
  chatDetails: memberDetailsSchema | Record<string, never>;
  memberDetails: {
    [id: string]: memberDetailsSchema;
  };

  messages: {
    [key: string]: messageSchema;
  };
  createdAt: number | undefined | null;
};
export interface addChatRoomActionType {
  type: string;
  payload: {
    chatRoomId: string;
    chatRoomPayload: chatRoomPayloadSchema;
  };
}
export interface addNewMessageActionType {
  type: string;
  payload: {
    chatRoomId: string;
    messages: {
      [key: string]: messageSchema;
    };
  };
}
export interface removeMessageActionType {
  type: string;
  payload: {
    chatRoomId: string;
    messageId: string;
  };
}
export interface removeChatRoomActionType {
  type: string;
  payload: string;
}

export type allChatsSchema = {
  chatId: string;
  chatDetails: memberDetailsSchema;
  lastMessage: messageSchema;
  memberDetails: {
    [id: string]: memberDetailsSchema;
  };
};
// ------------------------->Users<--------------------------
export const userBaby: userType = {
  userChats: {},
  userFavorites: {},
  userInfo: {
    displayName: false,
    email: false,
    emailVerified: false,
    phoneNumber: false,
    photoURL: false,
    uid: '',
  },
  createdAt: null,
};

export type userType = {
  userChats: {
    [chatId: string]: {
      chatDetails: {
        displayName: string | false;
        photoUrl: string | false;
      };
      memberDetails: {
        [memberId: string]: {
          displayName: string | false;
          photoUrl: string | false;
        };
      };
      members: {
        [memberId: string]: boolean;
      };
    };
  };
  userFavorites?: {
    [favourityId: string]: boolean;
  };
  userInfo: {
    displayName: string | false;
    email: string | false;
    emailVerified: boolean;
    phoneNumber: string | false;
    photoURL: string | false;
    uid: string;
  };
  createdAt: number | undefined | null;
};

export interface usersStateType {
  [userId: string]: userType;
}
export interface setUsersActionType {
  type: string;
  payload: usersStateType;
}
export interface modifyUserActionType {
  type: string;
  payload: {
    userId: string;
    userDetails: {
      [key: string]: any;
    };
  };
}

// ---------------------->trash<--------------------
export type trashStateType = {
  [key: string]: any;
};
export type addToTrashActionType = {
  type: string;
  payload: {
    [key: string]: any;
  };
};
// ---------------------->notifications<--------------------
export type notificationType = {
  heading: string;
  content: string;
  msgId: string;
  msgType: string;
  shouldMark: boolean;
  navigateTo: {
    name: string;
    params: any;
  };
  time: {
    seconds: number;
    nanoseconds: number;
  };
  reduxRef: 'orders' | 'postAdRequests' | 'contactUs';
};
export type notificationsStateType = {
  [key: string]: notificationType;
};
export type addNotificationActionType = {
  type: string;
  payload: notificationsStateType;
};

// ---------------------->Main Application State<--------------------
export interface stateTypes {
  isLoggedIn: boolean;
  servicesLoading: boolean;
  showCategoryItems: boolean;
  showMoreTabs: boolean;
  ourServicesUrlValid: boolean;
  activeTab: activeTabStateType;
  activeAdTab: activeTabStateType;
  servicesHeadings: servicesHeadingsStateType;
  servicesSearchTitle: servicesSearchTitleStateType;
  currentAddOnTitle: addOnTitleStateType;
  cart: cartStateType;
  servicesSearchCategories: servicesSearchCategoriesStateType;
  addOnCategories: addOnCategoriesStateType;
  servicesCategoryItems: servicesCategoryItemsStateType;
  addOnItems: addOnItemsStateType;
  whiteList: whiteListStateType;
  destination: destinationStateType;
  postAdDestination: destinationStateType;
  showMessage: flashMessageStateType;
  comments: commentsStateType;
  messages: messagesStateType;
  currentChatId: string;
  currentItemId: string;
  pendingAds: pendingAdsStateType;
  activeAds: activeAdsStateType;
  userInfo: userInfoStateType;
  favourites: favouritesStateType;
  favourityIds: favourityIdsStateType;
  orders: ordersStateType;
  postAdRequests: postAdRequestsStateType;
  contactUs: contactUsStateType;
  orderDetails: orderDetailsStateType;
  users: usersStateType;
  trash: trashStateType;
  notifications: notificationsStateType;
}
// ----------------------><--------------------
