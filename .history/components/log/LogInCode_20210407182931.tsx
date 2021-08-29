import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import LoadingIndicator from '../LoadingIndicator';
import {root} from '../../css';

interface schema {
  setVerifyCodeFalse: () => void;
  verificationId: any;
}

const CELL_COUNT = 6;

export default function LogInCode({
  setVerifyCodeFalse,
  verificationId,
}: schema): JSX.Element {
  const [verificationCode, setVerificationCode] = useState('');
  const codeFieldRef = useBlurOnFulfill({
    value: verificationCode,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verificationCode,
    setValue: setVerificationCode,
  });
  // const [codeError, setCodeError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (verificationCode.length > 5) {
      confirmCode();
    }
    return () => setLoading(false);
  }, [verificationCode]);

  const confirmCode = async () => {
    setLoading(true);
    try {
      await verificationId.confirm(verificationCode);
      // const credential = auth.PhoneAuthProvider.credential(
      //   verificationId,
      //   verificationCode,
      // );
      // await auth().signInWithCredential(credential);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingIndicator loading={loading} />
      <Text style={styles.mainHeading}>Log In</Text>
      <Text style={styles.heading}>Verify Number</Text>

      <View style={styles.box}>
        <CodeField
          ref={codeFieldRef}
          {...props}
          value={verificationCode}
          onChangeText={setVerificationCode}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[
                styles.cell,
                index === 0 ? styles.leftCell : styles.rightCell,
                isFocused && styles.focusCell,
              ]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <Text style={[styles.verifyText, {alignSelf: 'flex-start'}]}>
        We&#39;ve Sent You An Sms Verification!
      </Text>

      <TouchableOpacity onPress={() => setVerifyCodeFalse()}>
        <LinearGradient
          colors={root.primaryThemeColorDarkGradient}
          style={styles.buttonContainer}>
          <Text style={[styles.verifyText, {color: '#fff'}]}>
            Re-Enter Number
          </Text>
        </LinearGradient>
      </TouchableOpacity>
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
  buttonContainer: {
    width: 150,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },

  box: {
    marginVertical: root.defaultSpace,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
  },

  leftCell: {
    margin: 0,
  },
  rightCell: {
    marginLeft: 5,
  },
  cell: {
    flex: 1,
    height: 40,
    textAlign: 'center',
    lineHeight: 38,

    fontSize: root.textSizeLarge,
    borderRadius: 10,
    backgroundColor: root.bgColor2,
    overflow: 'hidden',
  },
  focusCell: {
    borderColor: root.primaryThemeColor,
  },
});
