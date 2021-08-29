import {STORE} from '../STORE/index';

import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

declare const alert: any;

export const removeFromFavourites = (item: string): any => {
  const userId = STORE.getState().userInfo?.uid;
  if (!userId) {
    alert('You must login to proceed this action');
    return;
  }
  database().ref(`users/${userId}/userFavourites/${item}`).remove();
};

export const addToFavourites = (item: string): any => {
  const userId = STORE.getState().userInfo?.uid;
  if (!userId) {
    alert('You must login to proceed this action');
    return;
  }
  database().ref(`users/${userId}/userFavourites/${item}`).set(true);
};

export const onPrimaryDelete = ({
  item,
  collection,
  id,
}: {
  item: any;
  collection: string;
  id: string;
}): any => {
  delete item['shouldMark'];

  const firestoreBatch = firestore().batch();

  firestoreBatch.set(firestore().collection('trash').doc(id), {
    ...item,
    time: firestore.FieldValue.serverTimestamp(),
    collection,
  });
  firestoreBatch.delete(firestore().collection(collection).doc(id));

  return firestoreBatch.commit();
};

export const onPrimaryRestore = ({
  item,
  collection,
  id,
}: {
  item: any;
  collection: string;
  id: string;
}): any => {
  delete item['collection'];
  delete item['shouldMark'];

  const firestoreBatch = firestore().batch();

  firestoreBatch.set(firestore().collection(collection).doc(id), {
    ...item,
    time: firestore.FieldValue.serverTimestamp(),
  });
  firestoreBatch.delete(firestore().collection('trash').doc(id));

  return firestoreBatch
    .commit()
    .then(() => {
      return {
        message: `Successfully restored document to ${collection}`,
      };
    })
    .catch(() => {
      return {
        message: `Error, Could not restore the document to ${collection}, try again!`,
      };
    });
};

export const onPostAdRequestApprove = ({
  item,
  collection,
  id,
}: {
  item: any;
  collection: string;
  id: string;
}): any => {
  delete item['collection'];

  const firestoreBatch = firestore().batch();

  firestoreBatch.set(firestore().collection(collection).doc(id), {
    ...item,
    time: firestore.FieldValue.serverTimestamp(),
  });
  firestoreBatch.delete(firestore().collection('trash').doc(id));

  firestoreBatch.commit();
};
