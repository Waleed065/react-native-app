import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {root} from '../css';
// import {getStatusBarHeight} from 'react-native-status-bar-height';
// import {stateTypes} from '../types';
// import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {libraryNavigation} from '../STORE/constants';

const icon = (name: any) => (
  <Entypo name={name} size={20} color={root.primaryThemeColor} />
);
// const noDisplay =
//   'https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png';

export default function Library(): JSX.Element {
  const navigation = useNavigation<any>();
  //   const isLoggedIn = useSelector((state: stateTypes) => state.isLoggedIn);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Image
          source={{
            uri:
              'https://news.airbnb.com/wp-content/uploads/sites/4/2020/04/Airbnb_Bali_Bamboo_House.jpg?fit=1024%2C576&resize=1920%2C1080',
          }}
          style={styles.cover}
          resizeMode={'stretch'}
        />

        <View style={styles.subjectContainer}>
          <View style={styles.buttonsContainer}>
            {/* {isLoggedIn && (
              <ProfileButton onPress={() => navigation.navigate('/account')} />
            )} */}

            <LibraryButton
              onPress={() =>
                navigation.navigate(libraryNavigation.allUsersNavigation)
              }
              title={'All Users'}
              iconName={'users'}
            />
            <LibraryButton
              //   onPress={() => navigation.navigate('/contact-us')}
              title={'Contact Us'}
              iconName={'new-message'}
            />
            <LibraryButton
              //   onPress={() =>
              //     navigation.navigate('/our-services-navigation', {
              //       screen: '/our-services-items',
              //     })
              //   }
              title={'Our Services'}
              iconName={'news'}
            />
            <LibraryButton
              //   onPress={() => navigation.navigate('/terms')}
              title={'Terms of Service'}
              iconName={'text'}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <LibraryButton
              onPress={() => navigation.navigate(libraryNavigation.logout)}
              style={styles.logButton}
              title={'Log Out'}
              iconName={'log-out'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

interface libraryButtonSchema {
  iconName: string;
  title: string;
  style?: any;
  onPress?: () => void;
}

function LibraryButton({onPress, iconName, title, style}: libraryButtonSchema) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={1}
      underlayColor={root.underlayColor}>
      <>
        <View style={styles.buttonFlex}>
          {icon(iconName)}
          <Text style={styles.text}>{title}</Text>
        </View>
        {icon('chevron-right')}
      </>
    </TouchableHighlight>
  );
}

// interface profileButtonSchema {
//   onPress: () => void;
// }
// function ProfileButton({onPress}: profileButtonSchema) {
//   const {displayName, photoURL} = useSelector(
//     (state: stateTypes) => state.userInfo,
//   );
//   return (
//     <TouchableHighlight
//       style={styles.profileButton}
//       onPress={onPress}
//       underlayColor={root.underlayColor}
//       activeOpacity={1}>
//       <>
//         <View style={styles.buttonFlex}>
//           <Image style={styles.avatar} source={{uri: photoURL || noDisplay}} />
//           <View style={styles.textContainer}>
//             <Text
//               style={[styles.heading]}
//               ellipsizeMode={'tail'}
//               numberOfLines={1}>
//               {displayName || 'No Name'}
//             </Text>
//             <Text style={[styles.smallFont]}>See your profile</Text>
//           </View>
//         </View>
//         {icon('chevron-right')}
//       </>
//     </TouchableHighlight>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: root.bgColor1,
    // marginTop: getStatusBarHeight(),
  },
  cover: {
    height: Math.round(root.height * 0.3),
    width: '100%',
  },
  subjectContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    backgroundColor: root.primaryThemeColorLite,
  },
  profileButton: {
    height: 120,
    flexDirection: 'row',
    padding: root.defaultSpace,
    marginBottom: 1,
    backgroundColor: root.bgColor1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    height: 50,
    flexDirection: 'row',
    padding: root.defaultSpace,
    marginBottom: 1,
    backgroundColor: root.bgColor1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logButton: {
    marginBottom: 0,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 1000,
  },
  buttonFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    marginLeft: 10,
  },
  heading: {
    color: root.textColor2,
    fontSize: root.textSizeLarge,
    fontWeight: root.textWeightBold as any,
  },
  smallFont: {
    color: root.textColor3,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
    marginTop: 5,
  },
  textContainer: {
    marginLeft: 10,
  },
});
