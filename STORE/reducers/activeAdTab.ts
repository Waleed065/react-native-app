import { setAdTabConst } from "../constants";

import { activeTabStateType, activeTabActionType } from "../../types";

export default function activeTab(
  state: activeTabStateType = "cars",
  action: activeTabActionType
): activeTabStateType {
  switch (action.type) {
    case setAdTabConst:
      return action.payload;
    default:
      return state;
  }
}
