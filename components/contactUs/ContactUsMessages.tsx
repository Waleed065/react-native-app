import React from 'react';

import {useSelector} from 'react-redux';
import ContactUsTabItSelf from './ContactUsTabItSelf';
import {stateTypes} from '../../types';
import PrimaryPage from '../PrimaryPage';

export default function ContactUsMessages(): JSX.Element {
  const objectData = useSelector((state: stateTypes) => state.contactUs);

  return (
    <PrimaryPage
      objectData={objectData}
      notAvailableTitle={'No Messages To Display! ☹️'}
      RenderItemComponent={ContactUsTabItSelf}
      snackBarTitle={'messages'}
    />
  );
}
