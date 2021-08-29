import { setCurrentItemIdConst } from "../constants";

import { stringActionType } from "../../types";

const defaultState = "";

export default function currentItemId(
  state: string = defaultState,
  action: stringActionType
): string {
  switch (action.type) {
    case setCurrentItemIdConst:
      return action.payload;
    default:
      return state;
  }
}
