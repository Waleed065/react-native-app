/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  addToTrashConst,
  removeFromTrashConst,
  setUnMarkTrashConst,
  setMarkTrashConst,
  clearAllTrashConst,
} from '../constants';
import {trashStateType} from '../../types';

export default function favourityIds(
  state: trashStateType = {},
  action: any,
): trashStateType {
  switch (action.type) {
    case addToTrashConst: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case removeFromTrashConst: {
      delete state[action.payload];
      return {
        ...state,
      };
    }

    case setUnMarkTrashConst: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          shouldMark: false,
        },
      };
    }
    case setMarkTrashConst: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          shouldMark: true,
        },
      };
    }
    case clearAllTrashConst: {
      return {};
    }
    default:
      return state;
  }
}
