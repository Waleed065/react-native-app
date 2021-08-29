import {
  addToCartConst,
  removeFromCartConst,
  updateCartConst,
  emptyCartConst,
} from "../constants";

import { cartStateType, cartActionType } from "../../types";

export default function isLoggedIn(
  state: cartStateType = {},
  action: cartActionType
): cartStateType {
  switch (action.type) {
    case addToCartConst: {
      const {
        destination: { country, city },
        tab,
        category,
        item,
      } = action.payload;

      if (
        state?.[tab]?.[country]?.[city]?.[category]?.some(
          (categoryItem) => categoryItem.item === item
        )
      ) {
        return state;
      }
      return {
        ...state,
        [tab]: {
          ...state?.[tab],
          [country]: {
            ...state?.[tab]?.[country],
            [city]: {
              ...state?.[tab]?.[country]?.[city],
              [category]: state?.[tab]?.[country]?.[city]?.[category]?.concat(
                action.payload
              ) || [action.payload],
            },
          },
        },
      };
    }
    case removeFromCartConst: {
      const {
        destination: { country, city },
        tab,
        category,
        item,
      } = action.payload;

      if (
        state?.[tab]?.[country]?.[city]?.[category]?.some(
          (categoryItem) => categoryItem.item === item
        )
      ) {
        state = {
          ...state,
          [tab]: {
            ...state?.[tab],
            [country]: {
              ...state?.[tab]?.[country],
              [city]: {
                ...state?.[tab]?.[country]?.[city],
                [category]: state[tab]?.[country]?.[city]?.[category]?.filter(
                  (categoryItem) => categoryItem.item !== item
                ),
              },
            },
          },
        };

        if (state[tab][country][city][category].length < 1) {
          delete state[tab][country][city][category];

          if (!Object.keys(state[tab][country][city]).length) {
            delete state[tab][country][city];

            if (!Object.keys(state[tab][country]).length) {
              delete state[tab][country];

              if (!Object.keys(state[tab]).length) {
                delete state[tab];
              }
            }
          }
        }

        return state;
      } else {
        return state;
      }
    }
    case updateCartConst: {
      const {
        destination: { country, city },
        calendar: { from, to },
        tab,
        category,
        item,
      } = action.payload;

      return {
        ...state,
        [tab]: {
          ...state?.[tab],
          [country]: {
            ...state?.[tab]?.[country],
            [city]: {
              ...state?.[tab]?.[country]?.[city],
              [category]: state[tab]?.[country]?.[city]?.[category]?.map(
                (categoryItem) => {
                  if (categoryItem.item === item) {
                    return {
                      ...categoryItem,
                      calendar: {
                        from,
                        to,
                      },
                    };
                  } else return categoryItem;
                }
              ),
            },
          },
        },
      };
    }
    case emptyCartConst:
      return {};

    default:
      return state;
  }
}
