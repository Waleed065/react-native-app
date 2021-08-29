import React, {useEffect, useState} from 'react';
import {
  DataTable,
  Switch,
  Card,
  Title,
  Button,
  Divider,
} from 'react-native-paper';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {root} from '../../css';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute, useNavigation} from '@react-navigation/native';
import {stateTypes} from '../../types';
import {getOrderDetails, getTrashOrderDetails} from '../../STORE/selectors';
import {
  // setUnMarkOrder,
  // setMarkOrder,
  setOrderDetails,
  // setUnMarkTrash,
  fetchOrder,
  setFirestoreShouldMark,
  setMarkNotification,
} from '../../STORE/actions';
import formattedTitle from '../../utils/formattedTitle';
import {firebaseTime} from '../../utils/firebaseTime';
import {stackNavigation} from '../../STORE/constants';
import LoadingIndicator from '../LoadingIndicator';

export default function OrderDetails(): JSX.Element {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const {id, isInTrash} = route.params;
  const {
    displayName,
    email,
    newOrder,
    phoneNumber,
    time,
    totalPrice,
    userId,
    shouldMark: marked,
  } = useSelector((state: stateTypes) =>
    !isInTrash ? getOrderDetails(state, id) : getTrashOrderDetails(state, id),
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
      dispatch(fetchOrder(id));
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const collection = !isInTrash ? 'orders' : 'trash';

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

  const viewAd = ({
    tabParam,
    itemParam,
    countryParam,
    cityParam,
    categoryParam,
    fromDate,
    toDate,
  }: {
    tabParam: string;
    itemParam: string;
    countryParam: string;
    cityParam: string;
    categoryParam: string;
    fromDate: {
      seconds: number;
      nanoseconds: number;
    };
    toDate: {
      seconds: number;
      nanoseconds: number;
    };
  }) => {
    dispatch(
      setOrderDetails({
        tabParam,
        itemParam,
        countryParam,
        cityParam,
        categoryParam,
        fromDate,
        toDate,
      }),
    );
    navigation.navigate({name: stackNavigation.orderView, params: undefined});
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
              <Text style={styles.heading}>Name</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.fadedText}>
                {displayName || 'Not Specified'}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
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
              <Text style={styles.heading}>Number</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.fadedText}>
                {phoneNumber || 'Not Specified'}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.heading}>User Id</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.fadedText}>{userId}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.heading}>Order Id</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.fadedText}>{id}</Text>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.heading}>Total Bookings</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.fadedText}>{newOrder.length}</Text>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>
              <Text style={styles.heading}>Total Price</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text style={styles.fadedText}>$ {totalPrice}</Text>
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

        {newOrder.map(
          (
            {
              avatar,
              title, // price,
              service,
              itemId,
              categoryId,

              destination: {city, country},
              calendar: {from, to},
            },
            index,
          ) => {
            const {date: fromDate} = firebaseTime(from);
            const {date: toDate} = firebaseTime(to);

            return (
              <Card key={index} style={styles.cardContainer}>
                <Card.Title
                  title={`Booking ${index + 1}`}
                  subtitle={`Service: ${formattedTitle(service)}`}
                  left={() => icon(service.toLowerCase())}
                />
                <Card.Content>
                  <Title>{title}</Title>
                  <Text style={styles.fadedText}>{`${formattedTitle(
                    city,
                  )}/${formattedTitle(country)}`}</Text>
                </Card.Content>
                <Card.Cover source={{uri: avatar}} style={styles.pic} />

                <Card.Content>
                  <View style={styles.flexBox}>
                    <Text style={styles.heading}>From</Text>
                    <Text style={styles.fadedText}>{fromDate}</Text>
                  </View>
                  <View style={styles.flexBox}>
                    <Text style={styles.heading}>Till</Text>
                    <Text style={styles.fadedText}>{toDate}</Text>
                  </View>
                </Card.Content>

                <Card.Actions>
                  <Button
                    color={root.primaryThemeColor}
                    onPress={() =>
                      viewAd({
                        categoryParam: categoryId,
                        cityParam: city,
                        countryParam: country,
                        itemParam: itemId,
                        tabParam: service,
                        fromDate: from,
                        toDate: to,
                      })
                    }>
                    View Ad
                  </Button>
                </Card.Actions>
              </Card>
            );
          },
        )}
      </ScrollView>
    </>
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
  flexCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: root.primaryThemeColorLite,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
