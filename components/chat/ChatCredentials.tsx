import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {getCurrentChat} from '../../STORE/selectors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {root} from '../../css';
import {stateTypes} from '../../types';

const details = {
  displayName: '',
  photoURL: '',
};

const noDisplay =
  'https://firebasestorage.googleapis.com/v0/b/myfirebase-cd72c.appspot.com/o/private%2FnoDisplay.png?alt=media&token=81ed5147-dff9-41a6-a31a-92c15c8d9dd9';

export default function ChatCredentials(): JSX.Element {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const chatId = route.params?.chatId;
  const {memberDetails} = useSelector((state: stateTypes) =>
    getCurrentChat(state, chatId),
  );
  const userId = Object.keys(memberDetails ?? {}).find(
    memberId => memberId !== '--admin--',
  );
  const {displayName = 'No Name', photoURL} =
    memberDetails?.[userId ?? ''] || details;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Image style={styles.avatar} source={{uri: photoURL || noDisplay}} />
      <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text}>
        {displayName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,

    padding: root.defaultSpace,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: root.primaryThemeColorLite,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 1000,
    marginHorizontal: 10,
    backgroundColor: root.bgColor2,
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeLarge,
    fontWeight: root.textWeightBold as any,
  },
});
