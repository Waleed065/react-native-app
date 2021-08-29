import { showMessageConst } from "../constants";

import { flashMessageActionType, flashMessageStateType } from "../../types";

const defaultState = {
    message: '',
}

export default function showSideBar(
  state: flashMessageStateType = defaultState,
  action: flashMessageActionType
): flashMessageStateType {
  switch (action.type) {
    case showMessageConst:
      return action.payload;
    default:
      return state;
  }
}