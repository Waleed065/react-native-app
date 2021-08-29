import { setServicesSearchTitleConst } from "../constants";

import {
  servicesSearchTitleStateType,
  servicesSearchTitleActionType,
} from "../../types";

export default function servicesSearchCategories(
  state: servicesSearchTitleStateType = {},
  action: servicesSearchTitleActionType
): servicesSearchTitleStateType {
  switch (action.type) {
    case setServicesSearchTitleConst: {
      const { shouldFetch, servicesTitle } = action.payload;
      const {
        destination: { country, city },
        tab,
      } = servicesTitle;
      return {
        ...state,
        [tab]: {
          ...state?.[tab],
          [country]: {
            ...state?.[tab]?.[country],
            [city]: {
              shouldFetch,
              servicesTitle,
            },
          },
        },
      };
    }
    default:
      return state;
  }
}

// state = {
//   hotels?: {
//     this will contain currently active hotel's category
//   },
//   cars?: {
//     this will contain currently active cars's category
//   },
//   security?: {
//     this will contain currently active security's category
//   },
//   add-ons?: {
//     this will contain currently active add-ons's category
//   };
// }
