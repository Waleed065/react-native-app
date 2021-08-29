import { setServicesCategoryItemsConst } from "../constants";

import {
  servicesCategoryItemsStateType,
  servicesCategoryItemsActionType,
} from "../../types";

export default function servicesCategoryItems(
  state: servicesCategoryItemsStateType = {},
  action: servicesCategoryItemsActionType
): servicesCategoryItemsStateType {
  switch (action.type) {
    case setServicesCategoryItemsConst: {
      const {
        destination: { country, city },
        tab,
        category,
        categoryItems,
        shouldFetch,
      } = action.payload;

      return {
        ...state,
        [tab]: {
          ...state?.[tab],
          [country]: {
            ...state?.[tab]?.[country],
            [city]: {
              ...state?.[tab]?.[country]?.[city],
              [category]: {
                shouldFetch,
                servicesItems: {
                  ...state?.[tab]?.[country]?.[city]?.[category]?.servicesItems,
                  ...categoryItems
                },
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
