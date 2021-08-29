import {combineReducers} from 'redux';

import isLoggedIn from './isLoggedIn';
import activeTab from './activeTab';
import activeAdTab from './activeAdTab';
import servicesLoading from './servicesLoading';
import servicesHeadings from './servicesHeadings';
import showCategoryItems from './showCategoryItems';
import servicesSearchTitle from './servicesSearchTitle';
import servicesSearchCategories from './servicesSearchCategories';
import cart from './cart';
import servicesCategoryItems from './servicesCategoryItems';
import whiteList from './whiteList';
import destination from './destination';
import postAdDestination from './postAdDestination';
import showMessage from './showMessage';
import showMoreTabs from './showMoreTabs';
import comments from './comments';
import ourServicesUrlValid from './ourServicesUrlValid';
import messages from './messages';
import currentChatId from './currentChatId';
import currentItemId from './currentItemId';
import pendingAds from './pendingAds';
import activeAds from './activeAds';
import userInfo from './userInfo';
import favourites from './favourites';
import favourityIds from './favourityIds';
import orders from './orders';
import postAdRequests from './postAdRequests';
import contactUs from './contactUs';
import orderDetails from './orderDetails';
import addOnItems from './addOnItems';
import addOnCategories from './addOnCategories';
import currentAddOnTitle from './currentAddOnTitle';
import users from './users';
import trash from './trash';
import notifications from './notifications';

import {stateTypes} from '../../types';

export default combineReducers<stateTypes>({
  isLoggedIn,
  activeTab,
  activeAdTab,
  servicesLoading,
  servicesHeadings,
  showCategoryItems,
  ourServicesUrlValid,
  servicesSearchTitle,
  servicesSearchCategories,
  cart,
  servicesCategoryItems,
  whiteList,
  destination,
  postAdDestination,
  showMessage,
  showMoreTabs,
  comments,
  messages,
  currentChatId,
  currentItemId,
  pendingAds,
  activeAds,
  userInfo,
  favourites,
  favourityIds,
  orders,
  postAdRequests,
  contactUs,
  orderDetails,
  addOnItems,
  addOnCategories,
  currentAddOnTitle,
  users,
  trash,
  notifications,
});
