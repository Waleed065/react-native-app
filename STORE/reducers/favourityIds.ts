/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { setFavourityIdConst, removeFavourityIdConst } from "../constants";

import {
  favourityIdsStateType,
  setFavourityIdActionType,
  removeFavourityIdActionType,
} from "../../types";

export default function favourityIds(
  state: favourityIdsStateType = [],
  action: any
): favourityIdsStateType {
  switch (action.type) {
    case setFavourityIdConst:
      return state.concat(
        action.payload as setFavourityIdActionType["payload"]
      );
    case removeFavourityIdConst:
      return state.filter(
        (favourite) =>
          favourite !==
          (action.payload as removeFavourityIdActionType["payload"])
      );
    default:
      return state;
  }
}
