import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Headline, Text} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {root} from '../css';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogInNumber from '../components/log/LogInNumber';
import LogInCode from '../components/log/LogInCode';

export default function Login(): JSX.Element {
  const [numberLogIn, setNumberLogIn] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {numberLogIn && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setNumberLogIn(false)}>
              <Ionicons name="arrow-back" size={24} color={root.textColor3} />
            </TouchableOpacity>
          )}

          <Image
            style={styles.image}
            resizeMode={'stretch'}
            source={{
              uri:
                '',
            }}
          />
        </View>
        <View style={styles.box}>
          {!numberLogIn ? (
            <LogInOptions setNumberLogIn={setNumberLogIn} />
          ) : (
            <LogInByNumber />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

interface logInOptionsSchema {
  setNumberLogIn: (arg: boolean) => void;
}

function LogInOptions({setNumberLogIn}: logInOptionsSchema) {
  const renderNumberLogIn = () => {
    setNumberLogIn(true);
  };

  return (
    <>
      <Headline style={styles.heading}>Admin Panel</Headline>

      <TouchableOpacity style={styles.button} onPress={renderNumberLogIn}>
        <FontAwesome name="phone-square" size={24} color="green" />
        <Text style={styles.buttonText}>Log in with phone number</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button}>
        <FontAwesome name="google-plus-square" size={24} color="red" />
        <Text style={styles.buttonText}>Log in with google</Text>
      </TouchableOpacity> */}

      <Text style={styles.termsText}>Only admins can login</Text>
      <Entypo name="lock" size={30} color={root.primaryThemeColor} />
    </>
  );
}

function LogInByNumber() {
  const [verifyCode, setVerifyCode] = useState(false);
  const [verificationId, setVerificationId] = useState('');

  return (
    <>
      {!verifyCode ? (
        <LogInNumber
          setVerifyCodeTrue={() => setVerifyCode(true)}
          setVerificationId={setVerificationId}
        />
      ) : (
        <LogInCode
          setVerifyCodeFalse={() => setVerifyCode(false)}
          verificationId={verificationId}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: root.bgColor1,
  },

  container: {
    flexGrow: 1,
  },

  imageContainer: {
    width: '100%',
    height: root.height * 0.35,
  },
  backButton: {
    position: 'absolute',
    top: root.defaultSpace,
    left: root.defaultSpace,
    width: 35,
    height: 35,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: root.bgColor1,
    zIndex: 1,
  },
  image: {
    flex: 1,
    zIndex: 0,
  },
  box: {
    flex: 1,
    minHeight: root.height * 0.5,
    paddingVertical: root.defaultVerticalSpace * 2,
    paddingHorizontal: root.defaultVerticalSpace * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: root.defaultVerticalSpace,
    borderWidth: 1,
    borderColor: root.textColor2Faded,
    paddingHorizontal: root.defaultSpace,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  buttonText: {
    marginLeft: 10,
    flex: 1,
  },

  termsText: {
    fontSize: root.textSizeNormal,
    color: root.textColor2Faded,
    fontWeight: root.textWeightThin as any,
    marginBottom: 20,
  },

  heading: {
    fontSize: root.textSizeXLarge,
    fontWeight: root.textWeightBold as any,
    marginBottom: 20,
  },
});
