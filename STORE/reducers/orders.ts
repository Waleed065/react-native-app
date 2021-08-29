/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  addOrdersConst,
  modifyOrderConst,
  setUnMarkOrderConst,
  setMarkOrderConst,
  removeOrderConst,
  clearAllOrdersConst,
} from '../constants';

import {ordersStateType, ordersActionType} from '../../types';

export default function orders(
  state: ordersStateType = {},
  action: any,
): ordersStateType {
  switch (action.type) {
    case addOrdersConst: {
      // eslint-disable-next-line prefer-const
      // for (let key of Object.keys(action.payload)) {
      //   delete state[key];
      // }

      return {
        ...state,
        ...action.payload,
      } as ordersActionType['payload'];
    }
    case modifyOrderConst: {
      // for (const key of Object.keys(action.payload)) {
      //   delete state[key];
      // }

      return {
        ...state,
        ...action.payload,
      } as ordersActionType['payload'];
    }
    case removeOrderConst: {
      delete state[action.payload];

      return {
        ...state,
      } as ordersActionType['payload'];
    }
    case setUnMarkOrderConst: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          shouldMark: false,
        },
      };
    }
    case setMarkOrderConst: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          shouldMark: true,
        },
      };
    }
    case clearAllOrdersConst: {
      return {}
    }
    default:
      return state;
  }
}
