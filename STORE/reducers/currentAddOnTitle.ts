import {setCurrentAddOnConst} from '../constants';

import {addOnTitleStateType, addOnTitleActionType} from '../../types';

export default function currentAddOnTitle(
  state: addOnTitleStateType = {},
  action: addOnTitleActionType,
): addOnTitleStateType {
  switch (action.type) {
    case setCurrentAddOnConst: {
      const {shouldFetch, servicesAddOn} = action.payload;
      const {
        destination: {country, city},
        tab,
        category,
      } = servicesAddOn;
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
                servicesAddOn,
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
