/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  addToPostAdRequestsConst,
  modifyPostAdRequestConst,
  setUnMarkPostAdRequestConst,
  setMarkPostAdRequestConst,
  removeFromPostAdRequestsConst,
  clearAllPostAdRequestsConst,
} from '../constants';

import {postAdRequestsStateType, postAdRequestsActionType} from '../../types';

export default function postAdRequests(
  state: postAdRequestsStateType = {},
  action: any,
): postAdRequestsStateType {
  switch (action.type) {
    case addToPostAdRequestsConst: {
      return {
        ...state,
        ...action.payload,
      } as postAdRequestsActionType['payload'];
    }
    case modifyPostAdRequestConst: {
      // for (const key of Object.keys(action.payload)) {
      //   delete state[key];
      // }

      return {
        ...state,
        ...action.payload,
      };
    }
    case removeFromPostAdRequestsConst: {
      delete state[action.payload];

      return {
        ...state,
      };
    }
    case setUnMarkPostAdRequestConst: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          shouldMark: false,
        },
      };
    }
    case setMarkPostAdRequestConst: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          shouldMark: true,
        },
      };
    }
    case clearAllPostAdRequestsConst: {
      return {}
    }
    default:
      return state;
  }
}
