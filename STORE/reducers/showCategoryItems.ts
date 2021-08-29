import { setShowCategoryItemsConst } from "../constants";

import { booleanActionType } from "../../types";

const defaultState = false;

export default function servicesSearchCategories(
  state: boolean = defaultState,
  action: booleanActionType
): boolean {
  switch (action.type) {
    case setShowCategoryItemsConst:
      return action.payload;
    default:
      return state;
  }
}
