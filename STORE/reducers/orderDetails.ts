import {setOrderDetailsConst, clearOrderDetailsConst} from '../constants';

import {orderDetailsStateType, orderDetailsActionType} from '../../types';

const defaultState = {
  tabParam: '',
  itemParam: '',
  countryParam: '',
  cityParam: '',
  categoryParam: '',
  fromDate: {
    seconds: 0,
    nanoseconds: 0,
  },
  toDate: {
    seconds: 0,
    nanoseconds: 0,
  },
};

export default function orderDetails(
  state: orderDetailsStateType = defaultState,
  action: orderDetailsActionType,
): orderDetailsStateType {
  switch (action.type) {
    case setOrderDetailsConst:
      return action.payload;
    case clearOrderDetailsConst:
      return defaultState
    default:
      return state;
  }
}
