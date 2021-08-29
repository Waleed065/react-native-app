import React from 'react';

import {useSelector} from 'react-redux';
import {stateTypes} from '../../types';
import PrimaryPage from '../PrimaryPage';
import {useRoute} from '@react-navigation/native';
import {getPendingOrders} from '../../STORE/selectors';
// import {stackNavigation} from '../../STORE/constants';
import OrderItSelf from '../orders/OrderItSelf';

// import ItemRow from "../ItemRow";

export default function MyOrders(): JSX.Element {
  const route = useRoute<any>();
  const id = route.params?.id;

  const objectData = useSelector((state: stateTypes) =>
    getPendingOrders(state, id),
  );

  return (
    <PrimaryPage
      objectData={objectData}
      notAvailableTitle={'This user has no orders! ☹️'}
      RenderItemComponent={OrderItSelf}
      snackBarTitle={'Order'}
    />
  );
}
