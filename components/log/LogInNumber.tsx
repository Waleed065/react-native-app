import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import LoadingIndicator from '../LoadingIndicator';
import AllCountriesFlatlist from '../AllCountriesFlatlist';
import {root} from '../../css';
import ThemeButton from '../ThemeButton';

interface schema {
  setVerifyCodeTrue: () => void;
  setVerificationId: (arg: any) => void;
}

export default function LogInNumber({
  setVerifyCodeTrue,
  setVerificationId,
}: schema): JSX.Element {
  const [number, setNumber] = useState<string>('');
  const [numberError, setNumberError] = useState<boolean>(false);
  const [callInfo, setCallInfo] = useState({
    callingCode: '+92',
    emoji: '🇵🇰',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const bottomSheetRef = useRef<any>(null);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const handleVerifyNumber = () => {
    let errors = false;
    if (loading) return;

    if (number.length < 10 || number.length > 11) {
      setNumberError(true);
      errors = true;
    } else if (number[0] === '0' || number[0] === '3') setNumberError(false);
    else {
      setNumberError(true);
      errors = true;
    }

    if (errors) {
      return;
    }

    if (
      !(
        callInfo.callingCode + number === '+923355470075' ||
        callInfo.callingCode + number === '+9203355470075'
      )
    ) {
      setLoading(true);
      return setTimeout(() => {
        setLoading(false);
        Alert.alert(
          'Wrong Credentials!',
          'Enter the correct credentials to login as admin!',
        );
      }, 3000);
    }

    onSignInSubmit();
  };

  const onSignInSubmit = async () => {
    setLoading(true);

    try {
      const confirmation = await auth().signInWithPhoneNumber(
        callInfo.callingCode + number,
        true,
      );
      setVerificationId(confirmation);

      setLoading(false);
      setVerifyCodeTrue();
    } catch (err) {
      setLoading(false);
    }
  };

  const onCountryPress = useCallback(({callingCode, emoji}) => {
    setCallInfo({callingCode, emoji});
    bottomSheetRef.current?.close();
  }, []);

  return (
    <>
      <LoadingIndicator loading={loading} />

      <Text style={styles.mainHeading}>Log In</Text>
      <Text style={styles.heading}>Mobile Number</Text>

      <View style={styles.box}>
        <TouchableOpacity
          style={styles.countryBox}
          onPress={() => bottomSheetRef.current?.open()}>
          <Text style={styles.text}>{callInfo.emoji}</Text>
          <Text style={[styles.text, {marginLeft: 5}]}>
            {callInfo.callingCode}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={[
            styles.numberBox,
            {borderColor: numberError ? 'red' : root.textColor3},
          ]}
          placeholder={'***********'}
          value={number}
          onChangeText={e => setNumber(e)}
          keyboardType={'phone-pad'}
        />
      </View>
      <Text style={[styles.verifyText, {alignSelf: 'flex-start'}]}>
        Please verify your number
      </Text>
      <ThemeButton onPress={handleVerifyNumber} text={'Verify'} />

      <AllCountriesFlatlist onPress={onCountryPress} ref={bottomSheetRef} />
    </>
  );
}
// ------------------><-------------------

const styles = StyleSheet.create({
  mainHeading: {
    color: root.textColor2,
    fontSize: root.textSizeXLarge,
    fontWeight: root.textWeightBold as any,
    marginBottom: root.defaultSpace,
    alignSelf: 'flex-start',
  },
  heading: {
    color: root.textColor2,
    fontSize: root.textSizeLarge,
    fontWeight: root.textWeightBold as any,
    alignSelf: 'flex-start',
  },
  box: {
    flexDirection: 'row',
    marginVertical: root.defaultSpace,
  },
  countryBox: {
    borderWidth: 1,
    borderColor: root.textColor3,
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 40,
    marginRight: 10,
  },
  numberBox: {
    padding: 10,
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
  },
  verifyText: {
    color: root.textColor2Faded,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
  },
});
