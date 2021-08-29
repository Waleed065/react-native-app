/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  addNotificationConst,
  clearAllNotificationsConst,
  setUnMarkNotificationConst,
  setMarkNotificationConst,
} from '../constants';

import {notificationsStateType, addNotificationActionType} from '../../types';

export default function notifications(
  state: notificationsStateType = {},
  action: any,
): notificationsStateType {
  switch (action.type) {
    case addNotificationConst: {
      return {
        ...state,
        ...(action.payload as addNotificationActionType['payload']),
      };
    }

    case setUnMarkNotificationConst: {
      if (!Object.prototype.hasOwnProperty.call(state, action.payload)) {
        return state;
      }

      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          shouldMark: false,
        },
      };
    }
    case setMarkNotificationConst: {
      if (!Object.prototype.hasOwnProperty.call(state, action.payload)) {
        return state;
      }

      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          shouldMark: true,
        },
      };
    }
    case clearAllNotificationsConst:
      return {};
    default:
      return state;
  }
}
