/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  addChatRoomConst,
  addNewMessageConst,
  clearAllMessagesConst,
  removeMessageConst,
  removeChatRoomConst,
} from '../constants';

import {
  addChatRoomActionType,
  addNewMessageActionType,
  messagesStateType,
  removeMessageActionType,
  removeChatRoomActionType,
} from '../../types';

export default function isLoggedIn(
  state: messagesStateType = {},
  action: any,
): messagesStateType {
  switch (action.type) {
    case addChatRoomConst: {
      const {
        chatRoomId,
        chatRoomPayload: {chatDetails, createdAt, memberDetails, messages},
      }: addChatRoomActionType['payload'] = action.payload;
      return {
        ...state,
        [chatRoomId]: {
          chatDetails: {
            ...state?.[chatRoomId]?.chatDetails,
            ...chatDetails,
          },
          memberDetails: {
            ...state?.[chatRoomId]?.memberDetails,
            ...memberDetails,
          },
          messages: {
            ...state?.[chatRoomId]?.messages,
            ...messages,
          },
          createdAt: createdAt ?? state?.[chatRoomId]?.createdAt ?? null,
        },
      };
    }
    case addNewMessageConst: {
      const {
        chatRoomId,
        messages,
      }: addNewMessageActionType['payload'] = action.payload;
      return {
        ...state,
        [chatRoomId]: {
          ...state[chatRoomId],
          messages: {
            ...state?.[chatRoomId]?.messages,
            ...messages,
          },
        },
      };
    }
    case removeChatRoomConst: {
      const {payload}: removeChatRoomActionType = action;
      delete state[payload];
      return {
        ...state,
      };
    }
    case removeMessageConst: {
      const {
        chatRoomId,
        messageId,
      }: removeMessageActionType['payload'] = action.payload;
      delete state[chatRoomId]?.messages[messageId];
      return {
        ...state,
      };
    }
    case clearAllMessagesConst:
      return {};
    default:
      return state;
  }
}
