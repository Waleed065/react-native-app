import React, {useEffect, useState} from 'react';
import {
  DataTable,
  Switch,
  Card,
  Title,
  Button,
  Divider,
} from 'react-native-paper';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,

} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {root} from '../../css';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import {stateTypes} from '../../types';
import {
  getPostAdRequestDetails,
  getTrashAdRequestDetails,
} from '../../STORE/selectors';
import {
  // setUnMarkPostAdRequest,
  // setMarkPostAdRequest,
  // setUnMarkTrash,
  fetchPostAdRequest,
  setFirestoreShouldMark,
  setMarkNotification,
} from '../../STORE/actions';
import formattedTitle from '../../utils/formattedTitle';
import {firebaseTime} from '../../utils/firebaseTime';
import {stackNavigation} from '../../STORE/constants';

export default function PostAdDetails(): JSX.Element {
  const route = useRoute<any>();
  const {id, isInTrash} = route.params;
  const {
    categoryTitle,
    destination: {country, city},
    pictures,
    itemTitle,
    location,
    price,
    service,
    time,
    about,
    userId,
    shouldMark: marked,
  } = useSelector((state: stateTypes) =>
    !isInTrash
      ? getPostAdRequestDetails(state, id)
      : getTrashAdRequestDetails(state, id),
  );
  const notificationMarked = useSelector(
    (state: stateTypes) => state.notifications[id]?.shouldMark,
  );

  const [shouldMark, setShouldMark] = useState(marked);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (notificationMarked === false) {

      dispatch(setMarkNotification(id));
    }
  }, [id]);


  useEffect(() => {
    if (!userId) {
      dispatch(fetchPostAdRequest(id));
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const collection = !isInTrash ? 'post-ad-requests' : 'trash';

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

  const viewDemoAd = () => {
    navigation.navigate({
      name: stackNavigation.adRequestView,
      params: {id, isInTrash},
    });
  };

  const {date, atTime} = firebaseTime(time);

  return (
    <ScrollView contentContainerStyle={styles.contentContainerStyle}>
      <DataTable style={styles.dataTableContainer}>
        <DataTable.Header>
          <DataTable.Title>{date}</DataTable.Title>
          <DataTable.Title numeric>{atTime}</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.heading}>Service</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.fadedText}>
              {formattedTitle(service) || 'Not Specified'}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.heading}>Category Title</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.fadedText}>
              {categoryTitle || 'Not Specified'}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.heading}>Product Title</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.fadedText}>{itemTitle || 'Not Specified'}</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.heading}>Country</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.fadedText}>{formattedTitle(country)}</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.heading}>City</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.fadedText}>{formattedTitle(city)}</Text>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.heading}>Location</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.fadedText}>
              {location._latitude}
              {', '}
              {location._longitude}
            </Text>
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.heading}>About</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.fadedText}>${about}</Text>
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

        <DataTable.Row>
          <DataTable.Cell>
            <Text style={styles.heading}>Price</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text style={styles.fadedText}>${price}</Text>
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
          title={formattedTitle(service)}
          subtitle={`Category: ${categoryTitle}`}
          left={() => icon(service.toLowerCase())}
        />

        <Card.Content>
          <Title>{itemTitle}</Title>
          <Text style={styles.fadedText}>{`${formattedTitle(
            city,
          )}/${formattedTitle(country)}`}</Text>
        </Card.Content>
        <Card.Cover source={{uri: pictures[0] || ''}} style={styles.pic} />

        <Card.Content>
          <View style={styles.flexBox}>
            <Text style={styles.heading}>Price</Text>
            <Text style={styles.fadedText}>$ {price}</Text>
          </View>
        </Card.Content>

        <Card.Actions>
          <Button color={root.primaryThemeColor} onPress={viewDemoAd}>
            View Demo Ad
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

function icon(type: string): JSX.Element {
  switch (type) {
    case 'hotels':
      return (
        <View style={styles.avatar}>
          <FontAwesome5
            name={'hotel'}
            size={25}
            color={root.primaryThemeColor}
          />
        </View>
      );
    case 'cars':
      return (
        <View style={styles.avatar}>
          <FontAwesome5 name="car" size={30} color={root.primaryThemeColor} />
        </View>
      );
    case 'security':
      return (
        <View style={styles.avatar}>
          <MaterialIcons
            name="security"
            size={30}
            color={root.primaryThemeColor}
          />
        </View>
      );
    default:
      return (
        <FontAwesome5 name={'hotel'} size={30} color={root.primaryThemeColor} />
      );
  }
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
  more: {
    paddingHorizontal: root.defaultSpace,
    paddingVertical: 10,
  },
});
