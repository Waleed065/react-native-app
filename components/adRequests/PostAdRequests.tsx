import React from 'react';
import {useSelector} from 'react-redux';
import PrimaryPage from '../PrimaryPage';
import {stateTypes} from '../../types';
import PostAdTabItSelf from './PostAdTabItSelf';

export default function PostAdRequests(): JSX.Element {
  const objectData = useSelector((state: stateTypes) => state.postAdRequests);

  return (
    <PrimaryPage
      objectData={objectData}
      notAvailableTitle={'No Ad Requests To Display! ☹️'}
      RenderItemComponent={PostAdTabItSelf}
      snackBarTitle={'Ad Requests'}
    />
  );
}
