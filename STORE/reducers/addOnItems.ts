import { setAddOnItemsConst } from "../constants";

import { addOnItemsStateType, addOnItemsActionType } from "../../types";

export default function addOnItems(
  state: addOnItemsStateType = {},
  action: addOnItemsActionType
): addOnItemsStateType {
  switch (action.type) {
    case setAddOnItemsConst: {
      const {
        destination: { country, city },
        tab,
        category,
        addOn,
        addOnItems,
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
                ...state?.[tab]?.[country]?.[city]?.[category],
                [addOn]: {
                  shouldFetch,
                  addOnItems,
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
