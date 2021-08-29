/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {setUsersConst, modifyUserConst, clearAllUsersConst} from '../constants';

import {
  setUsersActionType,
  modifyUserActionType,
  usersStateType,

} from '../../types';

const defaultState = {};

export default function servicesSearchCategories(
  state: usersStateType = defaultState,
  action: any,
): usersStateType {
  switch (action.type) {
    case setUsersConst: {
      return {
        ...state,
        ...action.payload,
      } as setUsersActionType['payload'];
    }
    case modifyUserConst: {
      const {
        userId,
        userDetails,
      }: modifyUserActionType['payload'] = action.payload;

      return {
        ...state,
        [userId]: {
          ...state?.[userId],
          ...userDetails,
        },
      };
    }
    case clearAllUsersConst: {
      return {}
    }
    default:
      return state;
  }
}
