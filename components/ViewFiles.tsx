import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  // Text,
  // TouchableOpacity,
  View,
} from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import LoadingIndicator from './LoadingIndicator';
import {root} from '../css';
// import {messageTypes} from '../STORE/constants';

// interface fileSchema {
//   uri: string;
//   loading: boolean;
//   error: boolean;
//   fileType: string | undefined;
//   id: string;
// }

interface schema {
  allFiles: string[];
  // setAllFiles: (arg: any) => void;
  // onSend?: () => void;
}

// function iconName(type: string) {
//   switch (type) {
//     case messageTypes.image:
//       return 'image';
//     case messageTypes.video:
//       return 'videocam';
//     default:
//       return 'contact-support';
//   }
// }

export default function InsertFiles({
  allFiles,
  // setAllFiles,
  // onSend,
}: schema): JSX.Element {
  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginVertical: allFiles.length ? root.defaultSpace : 0,
        }}>
        {Boolean(allFiles.length) &&
          allFiles.map((file, index) => (
            <View
              key={index}
              style={[
                styles.imageContainer,
                index === 0 && {marginLeft: root.defaultSpace},
              ]}>
              {/* <TouchableOpacity
                onPress={() =>
                  setAllFiles((prevFiles: fileSchema[]) =>
                    prevFiles.filter(prevFile => prevFile.id !== file.id),
                  )
                }
                style={styles.cancelIcon}>
                <MaterialIcons name="cancel" size={20} color="black" />
              </TouchableOpacity> */}
              <Image
                source={{uri: file}}
                resizeMode={'stretch'}
                style={styles.image}
              />
              {/* {!!file.fileType && (
                <View style={styles.fileTypeIcon}>
                  <MaterialIcons
                    name={iconName(file.fileType)}
                    size={20}
                    color={root.primaryThemeColor}
                  />
                </View>
              )} */}
              {/* {file.loading && <LoadingIndicator loading={true} />}
              {file.error && (
                <View style={styles.errorIcon}>
                  <MaterialIcons name="error" size={50} color="red" />
                </View>
              )} */}
            </View>
          ))}
      </ScrollView>
      {/* {Boolean(onSend) &&
        Boolean(allFiles.length) &&
        !allFiles.some(file => file.loading) && (
          <TouchableOpacity onPress={onSend} style={styles.sendButton}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        )} */}
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: root.defaultSpace,
  },
  cancelIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  fileTypeIcon: {
    position: 'absolute',
    top: 2,
    left: 2,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  image: {flex: 1, zIndex: 0},
  errorIcon: {
    position: 'absolute',
    backgroundColor: root.bgColor1,

    borderRadius: 100,
    top: 25,
    left: 25,
  },

  sendButton: {
    position: 'absolute',
    width: 80,
    height: 30,
    top: root.defaultSpace,
    right: root.defaultSpace,
    backgroundColor: root.primaryThemeColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sendText: {
    color: root.textColor1,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
  },
});
