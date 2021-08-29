import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// import {Button} from 'react-native-paper';
import {root} from '../css';
// import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';

import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {stateTypes} from '../types';

export default function LogOut(): JSX.Element {
  const {email, phoneNumber} = useSelector(
    (state: stateTypes) => state.userInfo,
  );

  const renderLogOut = () => {
    auth().signOut();
  };

  // const makeAdmin = () => {
  //   const makeAdmin = functions().httpsCallable('makeAdmin');
  //   makeAdmin({email: 'waleed.tariq065@gmail.com'}).then(result =>
  //     console.log(result),
  //   );
  // };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            resizeMode={'stretch'}
            source={{
              uri:
                'https://i.pinimg.com/originals/8f/26/6d/8f266d1e455ca21055247f7a3304fdb2.jpg',
            }}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.mainHeading}>Log In</Text>
          <Text style={styles.heading}>You&#39;re logged in as</Text>

          <View style={styles.boxPack}>
            <Text style={[styles.numberBox, {borderColor: root.textColor3}]}>
              {email || phoneNumber}
            </Text>
          </View>
          <Text style={[styles.verifyText, {alignSelf: 'flex-start'}]}>
            Your&#39;e now an Admin
          </Text>

          <TouchableOpacity onPress={renderLogOut}>
            <View style={styles.buttonContainer}>
              <Text style={[styles.verifyText, {color: '#fff'}]}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  boxPack: {
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
  buttonContainer: {
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: 'red',
  },
});
