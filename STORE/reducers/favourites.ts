/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { setFavouritesConst, removeFavouritesConst } from "../constants";

import {
  favouritesStateType,
  setFavouritesActionType,
  removeFavouritesActionType,
} from "../../types";

export default function favourites(
  state: favouritesStateType = [],
  action: any
): favouritesStateType {
  switch (action.type) {
    case setFavouritesConst:
      return state.concat(action.payload as setFavouritesActionType["payload"]);
    case removeFavouritesConst:
      return state.filter(
        (favourite) =>
          favourite.item !==
          (action.payload as removeFavouritesActionType["payload"])
      );
    default:
      return state;
  }
}
