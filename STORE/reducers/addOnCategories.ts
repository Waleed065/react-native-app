import { setAddOnCategoriesConst } from "../constants";

import {
  addOnCategoriesStateType,
  addOnCategoriesActionType,
} from "../../types";

export default function addOnCategories(
  state: addOnCategoriesStateType = {},
  action: addOnCategoriesActionType
): addOnCategoriesStateType {
  switch (action.type) {
    case setAddOnCategoriesConst: {
      const {
        destination: { country, city },
        tab,
        allAddOns,
        category,
      } = action.payload;

      return {
        ...state,
        [tab]: {
          ...state?.[tab],
          [country]: {
            ...state?.[tab]?.[country],
            [city]: {
              ...state?.[tab]?.[country]?.[city],
              [category]: allAddOns,
            },
          },
        },
      };
    }
    default:
      return state;
  }
}
