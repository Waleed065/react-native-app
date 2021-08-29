import React from 'react';
import PrimaryPage from '../PrimaryPage';
import {useSelector} from 'react-redux';
import {stateTypes} from '../../types';
import OrderItSelf from './OrderItSelf';

export default function Orders(): JSX.Element {
  const objectData = useSelector((state: stateTypes) => state.orders);

  return (
    <PrimaryPage
      objectData={objectData}
      notAvailableTitle={'No Orders To Display! ☹️'}
      RenderItemComponent={OrderItSelf}
      snackBarTitle={'Order'}
    />
  );
}
