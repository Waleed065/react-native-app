import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
// import Modal from "react-native-modal";

import {useSelector} from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CheckBox from 'react-native-check-box';

import {root} from '../../css';
import {getPostAdRequestDetails} from '../../STORE/selectors';
import {stateTypes} from '../../types';
import {allAmenities} from '../../utils/allAmenities';
import SearchLocation from '../SearchLocation';

import TabsSelection from './TabsSelection';
import ViewFiles from '../ViewFiles';
import {Snackbar} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

// interface picturesSchema {
//   uri: string;
//   loading: boolean;
//   error: boolean;
//   fileType: string;
//   id: string;
// }
// type locationSchema = {
//   name: string;
//   coordinates: {
//     x_: number;
//     N_: number;
//   };
// };

export default function PostAd(): JSX.Element {
  const route = useRoute<any>();
  const id = route.params?.id;
  const data = useSelector((state: stateTypes) =>
    getPostAdRequestDetails(state, id),
  );

  const [snackBarNotification, setSnackBarNotification] = useState('');

  const [categoryTitle, setCategoryTitle] = useState<string>('');
  const [itemTitle, setItemTitle] = useState<string>('');
  // const [pictures, setPictures] = useState<picturesSchema[]>([]);

  const [about, setAbout] = useState<string>('');

  useEffect(() => {
    const {categoryTitle: category, itemTitle: item, about: userAbout} = data;
    setCategoryTitle(category);
    setItemTitle(item);
    setAbout(userAbout);
  }, [data]);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>The right kind of help</Text>
          <View style={[styles.headingContainer, styles.flexBox]}>
            <Text style={styles.heading}>Select A Service </Text>
            <MaterialIcons name="edit-off" color={'red'} size={20} />
          </View>
          <TabsSelection
            service={data.service}
            setSnackBarNotification={setSnackBarNotification}
          />
          <SearchLocation
            postAd={true}
            setSnackBarNotification={setSnackBarNotification}
            destination={data.destination}
          />
          <View style={[styles.headingContainer, styles.flexBox]}>
            <Text style={styles.heading}>Pin Location </Text>
            <MaterialIcons name="edit-off" color={'red'} size={20} />
          </View>
          <TouchableOpacity
            style={styles.textInput}
            onPress={() =>
              setSnackBarNotification('Admins can not edit location!')
            }>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode={'tail'}>
              {'Kindly pin your location'}
            </Text>
          </TouchableOpacity>

          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Enter A Category Title</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={'Please enter a category title'}
            placeholderTextColor={root.bgColor2}
            value={categoryTitle}
            onChangeText={setCategoryTitle}
          />
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Enter A Product Title</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder={"Please enter your product's title"}
            placeholderTextColor={root.bgColor2}
            value={itemTitle}
            onChangeText={setItemTitle}
          />
          <View style={[styles.headingContainer, styles.flexBox]}>
            <Text style={styles.heading}>Photos </Text>
            <MaterialIcons name="edit-off" color={'red'} size={20} />
          </View>
          <ViewFiles
            allFiles={data.pictures}
            // setAllFiles={setPictures}
          />
          <TouchableOpacity
            style={styles.photoButton}
            onPress={() =>
              setSnackBarNotification('Admins can not edit photos!')
            }>
            <MaterialIcons
              name="photo-library"
              size={24}
              color={root.primaryThemeColor}
            />
            <Text style={[styles.text, {color: root.bgColor2, marginLeft: 10}]}>
              Only Viewable
            </Text>
          </TouchableOpacity>

          <View style={[styles.headingContainer, styles.flexBox]}>
            <Text style={styles.heading}>Amenities </Text>
            <MaterialIcons name="edit-off" color={'red'} size={20} />
          </View>
          <View style={styles.amenitiesContainer}>
            {Object.keys(allAmenities[data.service]).map((amenity: string) => {
              return (
                <View key={amenity} style={styles.amenityContainer}>
                  <CheckBox
                    onClick={() =>
                      setSnackBarNotification('Admins can not edit amenities')
                    }
                    isChecked={!!data.amenities[amenity]}
                    checkBoxColor={root.primaryThemeColor}
                  />
                  <View style={styles.amenityIcon}>
                    {allAmenities[data.service][amenity].icon}
                  </View>
                  <Text
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}>
                    {allAmenities[data.service][amenity].title}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={[styles.headingContainer, styles.flexBox]}>
            <Text style={styles.heading}>Price ($USD) </Text>
            <MaterialIcons name="edit-off" color={'red'} size={20} />
          </View>
          <TouchableOpacity
            style={styles.textInput}
            onPress={() =>
              setSnackBarNotification('Admins can not edit price')
            }>
            <Text style={styles.text}>{data.price}</Text>
          </TouchableOpacity>

          <View style={styles.headingContainer}>
            <Text style={styles.heading}>About</Text>
          </View>
          <TextInput
            style={[
              styles.textInput,
              {height: 150, padding: root.defaultSpace},
            ]}
            textAlignVertical={'top'}
            multiline={true}
            placeholder={'Short description'}
            placeholderTextColor={root.bgColor2}
            value={about}
            onChangeText={setAbout}
          />
        </View>
      </ScrollView>

      <Snackbar
        visible={Boolean(snackBarNotification.length)}
        onDismiss={() => setSnackBarNotification('')}
        action={{
          label: 'Close',
          onPress: () => setSnackBarNotification(''),
        }}
        duration={5000}
        theme={{colors: {accent: root.primaryThemeColor}}}>
        {snackBarNotification}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: root.defaultSpace,
  },
  headingContainer: {
    marginTop: root.defaultVerticalSpace,
  },
  heading: {
    color: root.textColor2,
    fontSize: root.textSizeLarge,
    fontWeight: root.textWeightBold as any,
  },
  photoButton: {
    marginTop: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: root.bgColor2,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    lineHeight: 38,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 40,
    borderColor: root.bgColor2,
    marginTop: 5,
    paddingHorizontal: 10,
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,

    justifyContent: 'center',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: root.defaultSpace,
    height: 50,
    width: '48%',
    overflow: 'hidden',
    // borderWidth: 1,
  },
  amenityIcon: {
    marginHorizontal: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
