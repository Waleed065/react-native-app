import { setCurrentChatIdConst } from "../constants";

import { stringActionType } from "../../types";

const defaultState = "";

export default function currentChatId(
  state: string = defaultState,
  action: stringActionType
): string {
  switch (action.type) {
    case setCurrentChatIdConst:
      return action.payload;
    default:
      return state;
  }
}
