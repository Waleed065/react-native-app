import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Text,
} from 'react-native';
import {root} from '../../css';
import 'react-native-get-random-values';
import {v4} from 'uuid';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';

import InsertFiles from '../InsertFiles';
import {messageTypes} from '../../STORE/constants';
import {useRoute} from '@react-navigation/native';

interface allFilesSchema {
  uri: string;
  loading: boolean;
  error: boolean;
  fileType: string | undefined;
  id: string;
}
const userId = '--admin--';
export default function ChatInput(): JSX.Element {
  const route = useRoute<any>();
  const {withAdmin, chatId} = route.params;
  const [textMessage, setTextMessage] = useState('');

  const [allFiles, setAllFiles] = useState<allFilesSchema[]>([]);

  const sendFileMessage = () => {
    if (!userId || !chatId) return;

    allFiles.forEach(file => {
      setAllFiles(prevFiles =>
        prevFiles.map(prevFile =>
          prevFile.id === file.id
            ? {
                ...prevFile,
                loading: true,
              }
            : prevFile,
        ),
      );

      const metadata = {
        contentType: file.fileType,
      };

      const fileName = file.uri.substring(file.uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri;

      const storageRef = storage().ref(`chats/${fileName}`);

      storageRef
        .putFile(uploadUri, metadata)
        .then(() => {
          storageRef.getDownloadURL().then(async url => {
            const chatRef = database().ref(`chats/${chatId}/messages`);
            chatRef.push({
              type: file.fileType,
              from: userId,
              content: url,
              sentAt: database.ServerValue.TIMESTAMP,
            });
            setAllFiles(prevFiles =>
              prevFiles.filter(prevFile => prevFile.id !== file.id),
            );
          });
        })
        .catch(() => {
          setAllFiles(prevFiles =>
            prevFiles.map(prevFile =>
              prevFile.id === file.id
                ? {
                    ...prevFile,
                    loading: false,
                    error: true,
                  }
                : prevFile,
            ),
          );
        });
    });
  };

  const sendMessage = async () => {
    if (
      !userId ||
      !chatId ||
      !textMessage ||
      !textMessage.replace(/^\s+|\s+$/g, '').length
    ) {
      return;
    }

    const content = textMessage.replace(/^\s+|\s+$/g, '');

    const chatRef = database().ref(`chats/${chatId}/messages`);
    chatRef.push({
      type: 'text',
      from: userId,
      content,
      sentAt: database.ServerValue.TIMESTAMP,
    });

    setTextMessage('');
  };

  const onPictureChange = async () => {
    // const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (status !== 'granted') {
    //   alert('Sorry, we need camera roll permissions to make this work!');
    //   return;
    // }

    launchImageLibrary(
      {
        mediaType: 'photo',
        // allowsMultipleSelection: true,
        //   base64: true,
      },
      (result: any) => {
        if (!result.didCancel) {
          setAllFiles(prevState =>
            prevState.concat({
              uri: result.uri,
              fileType: messageTypes.image,
              loading: false,
              error: false,
              id: v4(),
            }),
          );
        }
      },
    );
  };
  const onVideoChange = async () => {
    // const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (status !== 'granted') {
    //   alert('Sorry, we need camera roll permissions to make this work!');
    //   return;
    // }

    launchImageLibrary(
      {
        mediaType: 'video',
        // allowsMultipleSelection: true,
        //   base64: true,
      },
      (result: any) => {
        if (!result.didCancel) {
          setAllFiles(prevState =>
            prevState.concat({
              uri: result.uri,
              fileType: messageTypes.image,
              loading: false,
              error: false,
              id: v4(),
            }),
          );
        }
      },
    );
  };

  return (
    <>
      {withAdmin ? (
        <View>
          <InsertFiles
            allFiles={allFiles}
            setAllFiles={setAllFiles}
            onSend={sendFileMessage}
          />
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <View style={styles.flexBox}>
                <TouchableOpacity
                  onPress={onVideoChange}
                  style={styles.marginRight}>
                  <Entypo
                    name="folder-video"
                    size={24}
                    color={root.primaryThemeColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPictureChange}>
                  <Entypo
                    name="folder-images"
                    size={24}
                    color={root.primaryThemeColor}
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.textInput}
                placeholder="Type a message"
                placeholderTextColor={root.primaryThemeColorLite}
                value={textMessage}
                onChangeText={setTextMessage}
                multiline={true}
                autoCorrect={false}
              />

              {Boolean(textMessage) ? (
                <TouchableOpacity
                  activeOpacity={root.activeOpacity}
                  onPress={sendMessage}>
                  <MaterialIcons
                    name="send"
                    size={24}
                    color={root.primaryThemeColor}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={root.activeOpacity}>
                  <MaterialIcons
                    name="cancel-schedule-send"
                    size={24}
                    color={root.primaryThemeColor}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.notAllowed}>
          <Entypo
            name="lock"
            color={root.textColor3}
            size={root.textSizeSmall}
          />
          <Text style={styles.text}>Admins can only view the public chats</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    backgroundColor: root.primaryThemeColorLite,
    paddingHorizontal: root.defaultSpace,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputContainer: {
    borderRadius: 1000,
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: root.bgColor1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 5,

    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginRight: {
    marginRight: 5,
  },
  notAllowed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
    color: root.textColor3,
    marginLeft: 5,
  },
});
