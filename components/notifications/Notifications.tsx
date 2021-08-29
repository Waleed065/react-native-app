import React from 'react';
import PrimaryPage from '../PrimaryPage';
import {useSelector} from 'react-redux';
import {stateTypes} from '../../types';
import NotificationItSelf from './NotificationItSelf';

export default function Notifications(): JSX.Element {
  const objectData = useSelector((state: stateTypes) => state.notifications);

  return (
    <PrimaryPage
      objectData={objectData}
      notAvailableTitle={'No Notifications To Display! ☹️'}
      RenderItemComponent={NotificationItSelf}
      snackBarTitle={'Notification'}
    />
  );
}
