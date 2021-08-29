import {setActiveAdsConst} from '../constants';

import {activeAdsStateType, activeAdsActionType} from '../../types';

export default function servicesSearchCategories(
  state: activeAdsStateType = {},
  action: activeAdsActionType,
): activeAdsStateType {
  switch (action.type) {
    case setActiveAdsConst: {
      const {userId, itemItSelf} = action.payload;
      return {
        ...state,
        [userId]: {
          ...state?.[userId],
          ...itemItSelf,
        },
      };
    }
    default:
      return state;
  }
}
