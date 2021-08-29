import { setServicesLoadingConst } from "../constants";

import { booleanActionType } from "../../types";

const defaultState = false;

export default function servicesLoading(
  state: boolean = defaultState,
  action: booleanActionType
): boolean {
  switch (action.type) {
    case setServicesLoadingConst:
      return action.payload;
    default:
      return state;
  }
}
