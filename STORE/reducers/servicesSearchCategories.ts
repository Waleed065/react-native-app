import { setServicesCategoriesConst } from "../constants";

import {
  servicesSearchCategoriesStateType,
  servicesSearchCategoriesActionType,
} from "../../types";

export default function servicesSearchCategories(
  state: servicesSearchCategoriesStateType = {},
  action: servicesSearchCategoriesActionType
): servicesSearchCategoriesStateType {
  switch (action.type) {
    case setServicesCategoriesConst: {
      const {
        destination: { country, city },
        tab,
        allCategories,
      } = action.payload;

      return {
        ...state,
        [tab]: {
          ...state?.[tab],
          [country]: {
            ...state?.[tab]?.[country],
            [city]: {
              shouldFetch: allCategories.shouldFetch,
              servicesCategories: {
                ...state?.[tab]?.[country]?.[city]?.servicesCategories,
                ...allCategories.servicesCategories,
              },
            },
          },
        },
      };
    }
    default:
      return state;
  }
}
