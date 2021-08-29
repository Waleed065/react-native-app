/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { setUserInfoConst, removeUserInfoConst, updateUserInfoConst } from "../constants";

import { updateUserInfoActionType, userInfoStateType } from "../../types";

const defaultState = {
  displayName: "",
  email: "",
  emailVerified: false,
  phoneNumber: "",
  photoURL: "",
  uid: "",
};

export default function servicesSearchCategories(
  state: userInfoStateType = defaultState,
  action: any
): userInfoStateType {
  switch (action.type) {
    case setUserInfoConst:
      return action.payload as userInfoStateType;
    case removeUserInfoConst:
      return defaultState as userInfoStateType;
    case updateUserInfoConst:
      return {
        ...state,
        ...action.payload as updateUserInfoActionType['payload']
      };
    default:
      return state;
  }
}
