import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AccountOptions from '../../components/account/AccountOptions';
import ProfileBox from '../../components/account/ProfileBox';
import {root} from '../../css';
import {useRoute} from '@react-navigation/native';
import {stateTypes} from '../../types';
import {useSelector, useDispatch} from 'react-redux';
import LoadingIndicator from '../LoadingIndicator';
import {fetchUser} from '../../STORE/actions';

const defaultUserInfo = {
  displayName: '',
  phoneNumber: '',
  email: '',
  photoURL: '',
  emailVerified: false,
  uid: '',
};

export default function AccountMain(): JSX.Element {
  const route = useRoute<any>();
  const servicesLoading = useSelector(
    (state: stateTypes) => state.servicesLoading,
  );
  const dispatch = useDispatch();

  const id = route.params?.id;
  const userInfo =
    useSelector((state: stateTypes) => state.users[id]?.userInfo) ??
    defaultUserInfo;

  const {
    displayName,
    phoneNumber,
    email,
    photoURL,
    emailVerified,
    uid,
  } = userInfo;

  useEffect(() => {
    if (!uid.length) {
      dispatch(fetchUser(id));
    }
  }, [uid]);

  return (
    <>
      <LoadingIndicator loading={servicesLoading} />
      <ScrollView>
        <View style={styles.container}>
          <ProfileBox
            displayName={displayName}
            phoneNumber={phoneNumber}
            email={email}
            photoURL={photoURL}
            emailVerified={emailVerified}
          />

          <AccountOptions id={id} />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: root.bgColor1,
    padding: root.defaultSpace,
    flex: 1,
  },
});
