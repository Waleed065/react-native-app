import { setOurServicesUrlValidConst } from "../constants";

import { booleanActionType } from "../../types";

const defaultState = true;

export default function servicesSearchCategories(
  state: boolean = defaultState,
  action: booleanActionType
): boolean {
  switch (action.type) {
    case setOurServicesUrlValidConst:
      return action.payload;
    default:
      return state;
  }
}
