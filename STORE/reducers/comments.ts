import { setCommentsConst } from "../constants";

import { commentsStateType, commentsActionType } from "../../types";

export default function servicesCategoryItems(
  state: commentsStateType = {},
  action: commentsActionType
): commentsStateType {
  switch (action.type) {
    case setCommentsConst: {
      const { tab, category, destination, itemId, comments } = action.payload;
      const { country, city } = destination;

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
                [itemId]: {
                  ...state?.[tab]?.[country]?.[city]?.[category]?.[itemId],
                  ...comments,
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
