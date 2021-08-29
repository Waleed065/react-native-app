import { setWhiteListConst } from "../constants";

import { whiteListStateType, whiteListActionType } from "../../types";

export default function whiteList(
  state: whiteListStateType = {},
  action: whiteListActionType
): whiteListStateType {
  switch (action.type) {
    case setWhiteListConst: {
      const { tab, whiteList } = action.payload;
      return {
        ...state,
        [tab]: whiteList,
      };
    }
    default:
      return state;
  }
}
