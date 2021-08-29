import { setIsLoggedInConst } from "../constants";

import { booleanActionType } from "../../types";

const defaultState = false;

export default function isLoggedIn(
  state: boolean = defaultState,
  action: booleanActionType
): boolean {
  switch (action.type) {
    case setIsLoggedInConst:
      return action.payload;
    default:
      return state;
  }
}
