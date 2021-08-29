import { setServicesHeadingsConst } from "../constants";

import {
  servicesHeadingsStateType,
  servicesHeadingsActionType,
} from "../../types";

export default function servicesHeadings(
  state: servicesHeadingsStateType = {},
  action: servicesHeadingsActionType
): servicesHeadingsStateType {
  switch (action.type) {
    case setServicesHeadingsConst: {
      const { shouldFetch, headings } = action.payload;
      return {
        ...state,
        [headings.tab]: {
          shouldFetch,
          headings,
        },
      };
    }
    default:
      return state;
  }
}
