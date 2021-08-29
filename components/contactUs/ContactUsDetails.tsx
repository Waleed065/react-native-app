import React, {useEffect, useState} from 'react';
import {
  DataTable,
  Switch,
  Card,
  Title,
  Button,
  Paragraph,
  Divider,
} from 'react-native-paper';
import {StyleSheet, View, ScrollView, Text, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {root} from '../../css';
import {useSelector, useDispatch} from 'react-redux';
import Mailer from 'react-native-mail';
import {useRoute, useNavigation} from '@react-navigation/native';
import {stateTypes} from '../../types';
import {
  getContactUsMessageDetails,
  getTrashContactUsMessageDetails,
} from '../../STORE/selectors';
import {
  // setUnMarkContactUsMessage,
  // setMarkContactUsMessage,
  // setUnMarkTrash,
  fetchContactUsMessage,
  setFirestoreShouldMark,
  setMarkNotification,
} from '../../STORE/actions';
import {firebaseTime} from '../../utils/firebaseTime';
import LoadingIndicator from '../LoadingIndicator';
import {stackNavigation} from '../../STORE/constants';

export default function ContactUsDetails(): JSX.Element {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const {id, isInTrash} = route.params;
  const {
    email,
    name,
    number,
    time,
    userId,
    message,
    shouldMark: marked,
  } = useSelector((state: stateTypes) =>
    !isInTrash
      ? getContactUsMessageDetails(state, id)
      : getTrashContactUsMessageDetails(state, id),
  );
  const servicesLoading = useSelector(
    (state: stateTypes) => state.servicesLoading,
  );
  const notificationMarked = useSelector(
    (state: stateTypes) => state.notifications[id]?.shouldMark,
  );
  const [shouldMark, setShouldMark] = useState(marked);

  const dispatch = useDispatch();


  useEffect(() => {
    if (notificationMarked === false) {

      dispatch(setMarkNotification(id));
    }
  }, [id]);

  
  
  
  useEffect(() => {
    if (!userId) {
      dispatch(fetchContactUsMessage(id));
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const collection = !isInTrash ? 'contact-us' : 'trash';

    if (shouldMark === undefined) {
      // console.log('In Undefined');
      setFirestoreShouldMark({
        collection,
        shouldMark: false,
        id,
      });
    } else if (marked !== shouldMark) {
      // console.log('state');
      setFirestoreShouldMark({
        collection,
        shouldMark,
        id,
      });
    }
  }, [shouldMark]);

  const handleEmail = () => {
    Mailer.mail(
      {
        subject: 'Subject Here',
        recipients: [email],
        // ccRecipients: ['supportCC@example.com'],
        // bccRecipients: ['supportBCC@example.com'],
        body: 'Custom Body',
        // customChooserTitle: 'This is my new title', // Android only (defaults to "Send Mail")
        isHTML: true,
        attachments: [
          {
            // Specify either `path` or `uri` to indicate where to find the file data.
            // The API used to create or locate the file will usually indicate which it returns.
            // An absolute path will look like: /cacheDir/photos/some image.jpg
            // A URI starts with a protocol and looks like: content://appname/cacheDir/photos/some%20image.jpg
            path: '', // The absolute path of the file from which to read data.
            uri: '', // The uri of the file from which to read the data.
            // Specify either `type` or `mimeType` to indicate the type of data.
            type: '', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            mimeType: '', // - use only if you want to use custom type
            name: '', // Optional: Custom filename for attachment
          },
        ],
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              // onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              // onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      },
    );
  };

  const {date, atTime} = firebaseTime(time);

  return (
    <>
      <LoadingIndicator loading={servicesLoading} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <DataTable style={styles.dataTableContainer}>
          <DataTable.Header>
            <DataTable.Title>{date}</DataTable.Title>
            <DataTable.Title numeric>{atTime}</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.heading}>Email</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.fadedText}>{email || 'Not Specified'}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.heading}>Name</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.fadedText}>{name || 'Not Specified'}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.heading}>Contact</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.fadedText}>{number || 'Not Specified'}</Text>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.heading}>User Id</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.fadedText}>${userId}</Text>
            </DataTable.Cell>
          </DataTable.Row>

          {!isInTrash && (
            <>
              <View style={styles.flexCenter}>
                <Text style={styles.fadedText}>Mark As Read </Text>
                <Switch
                  value={shouldMark}
                  onValueChange={setShouldMark}
                  color={root.primaryThemeColor}
                />
              </View>
              <Divider />
            </>
          )}

          <Button
            color={root.primaryThemeColor}
            onPress={() =>
              navigation.navigate({
                name: stackNavigation.accountMain,
                params: {id: userId},
              })
            }>
            View User Profile
          </Button>
        </DataTable>

        <Card style={styles.cardContainer}>
          <Card.Title
            title={'Message'}
            subtitle={email}
            left={() => (
              <View style={styles.avatar}>
                <MaterialIcons
                  name="contact-mail"
                  size={30}
                  color={root.primaryThemeColor}
                />
              </View>
            )}
          />
          <Card.Content>
            <Title>{name}</Title>
            <Paragraph style={styles.text}>{message}</Paragraph>

            <Text style={styles.fadedText}>{`${date}/${atTime}`}</Text>
          </Card.Content>

          <Card.Actions>
            <Button color={root.primaryThemeColor} onPress={handleEmail}>
              Reply
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: root.bgColor1,
    padding: 10,
    flexGrow: 1,
  },
  dataTableContainer: {
    backgroundColor: root.bgColor1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 5,
  },
  heading: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
    marginRight: 5,
  },
  pic: {
    marginVertical: 5,
  },
  fadedText: {
    color: root.textColor3,
    fontSize: root.textSizeSmall,
    fontWeight: root.textWeightThin as any,
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
  },
  cardContainer: {
    marginVertical: 10,

    backgroundColor: root.bgColor1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 5,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: root.primaryThemeColorLite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
});
