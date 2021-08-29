/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  addToContactUsMessagesConst,
  removeFromContactUsMessagesConst,
  modifyContactUsMessageConst,
  setMarkContactUsMessageConst,
  setUnMarkContactUsMessageConst,
  clearAllContactUsMessagesConst,
} from '../constants';

import {contactUsStateType, contactUsActionType} from '../../types';

export default function contactUs(
  state: contactUsStateType = {},
  action: any,
): contactUsStateType {
  switch (action.type) {
    case addToContactUsMessagesConst: {
      return {
        ...state,
        ...action.payload,
      } as contactUsActionType['payload'];
    }
    case modifyContactUsMessageConst: {
      for (const key of Object.keys(action.payload)) {
        delete state[key];
      }

      return {
        ...state,
        ...action.payload,
      };
    }
    case removeFromContactUsMessagesConst: {
      delete state[action.payload];

      return {
        ...state,
      };
    }
    case setUnMarkContactUsMessageConst: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          shouldMark: false,
        },
      };
    }
    case setMarkContactUsMessageConst: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          shouldMark: true,
        },
      };
    }
    case clearAllContactUsMessagesConst: {
      return {}
    }
    default:
      return state;
  }
}
