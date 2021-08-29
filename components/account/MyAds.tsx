import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PrimaryPage from '../PrimaryPage';
import {stateTypes, servicesCategoryItemType} from '../../types';
import firestore from '@react-native-firebase/firestore';
// import {stackNavigation} from '../../STORE/constants';
import PostAdTabItSelf from '../adRequests/PostAdTabItSelf';
import {useRoute} from '@react-navigation/native';
import {getPendingUserAdRequests} from '../../STORE/selectors';
import LoadingIndicator from '../LoadingIndicator';
import {root} from '../../css';
import {setActiveAds} from '../../STORE/actions';
import {TouchableRipple} from 'react-native-paper';

export default function MyAds(): JSX.Element {
  const route = useRoute<any>();
  const userId = route.params?.id;
  const pendingAds = useSelector((state: stateTypes) =>
    getPendingUserAdRequests(state, userId),
  );
  const activeAds = useSelector(
    (state: stateTypes) => state.activeAds[userId] ?? {},
  );
  const dispatch = useDispatch();

  const [showPendingAds, setShowPendingAds] = useState(true);
  const [loading, setLoading] = useState(false);

  const totalTries = useRef(0);
  const condition = Boolean(Object.keys(activeAds).length);
  useEffect(() => {
    if (totalTries.current > 2 || showPendingAds || !userId || condition) {
      return;
    }
    totalTries.current = totalTries.current + 1;
    setLoading(true);
    firestore()
      .collectionGroup('items')
      .where('userId', '==', userId)
      .get()
      .then(snapShot => {
        const allActiveAds: {[key: string]: servicesCategoryItemType} = {};
        snapShot.forEach(snap => {
          allActiveAds[snap.id] = {
            ...snap.data(),
            item: snap.id,
          } as servicesCategoryItemType;
        });
        if (allActiveAds.length) {
          dispatch(
            setActiveAds({
              userId,
              itemItSelf: allActiveAds,
            }),
          );
        }
        // console.log("No Active Ads");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [userId, showPendingAds, condition]);

  return (
    <>
      <LoadingIndicator loading={loading} />
      <TabsContainer
        showPendingAds={showPendingAds}
        setShowPendingAds={setShowPendingAds}
      />
      <PrimaryPage
        objectData={showPendingAds ? pendingAds : activeAds}
        notAvailableTitle={'User has no ads! ☹️'}
        RenderItemComponent={PostAdTabItSelf}
        snackBarTitle={'Ad Requests'}
        disableSnak={true}
      />
    </>
  );
}

interface tabsContainerSchema {
  showPendingAds: boolean;
  setShowPendingAds: (arg: boolean) => void;
}
function TabsContainer({
  showPendingAds,
  setShowPendingAds,
}: tabsContainerSchema) {
  return (
    <View style={styles.tabContainer}>
      <TouchableRipple
        rippleColor={root.underlayColor}
        style={[
          styles.tabButton,
          {
            backgroundColor: showPendingAds
              ? root.primaryThemeColor
              : root.bgColor1,
          },
        ]}
        onPress={() => setShowPendingAds(true)}>
        <Text
          style={[
            styles.tabButtonText,
            {
              color: showPendingAds ? root.textColor1 : root.textColor2,
            },
          ]}>
          Pending
        </Text>
      </TouchableRipple>
      <TouchableRipple
        rippleColor={root.underlayColor}
        style={[
          styles.tabButton,
          {
            backgroundColor: !showPendingAds
              ? root.primaryThemeColor
              : root.bgColor1,
          },
        ]}
        onPress={() => setShowPendingAds(false)}>
        <Text
          style={[
            styles.tabButtonText,
            {
              color: !showPendingAds ? root.textColor1 : root.textColor2,
            },
          ]}>
          Active
        </Text>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: root.defaultSpace,
  },
  tabButton: {
    height: 50,
    width: '48%',

    borderRadius: 1000,

    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  tabButtonText: {
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightBold as any,
  },
});
