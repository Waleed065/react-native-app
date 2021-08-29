import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {getCurrentItem} from '../../STORE/selectors';
import {stateTypes} from '../../types';
import AboutThisPlace from './AboutThisPlace';
import DescriptionContainer from './Description';
import OurServicesHeader from './OurServicesHeader';
import RatingsChrisma from './RatingsChrisma';
import PopularAmenities from './PopularAmenities';
import MapSection from './MapSection';
import Slider from './Slider';
import Amenities from './Amenities';
import RatingContainer from './RatingContainer';
import ExpandedContainer from './ExpandedContainer';

import LoadingIndicator from '../LoadingIndicator';
import {fetchOurServicesItem} from '../../STORE/actions';
import {Snackbar} from 'react-native-paper';
import {root} from '../../css';

// import Calendar from "./Calendar";

export default function ViewOrder(): JSX.Element {
  const {
    itemParam,
    categoryParam,
    tabParam,
    countryParam,
    cityParam,
    fromDate,
    toDate,
    // isInTrash,
  } = useSelector((state: stateTypes) => state.orderDetails);
  const currentItem = useSelector((state: stateTypes) =>
    getCurrentItem(state, itemParam),
  );
  const [showSnackBar, setShowSnackBar] = useState(false);

  const loading = useSelector((state: stateTypes) => state.servicesLoading);
  const dispatch = useDispatch();

  const {
    destination,
    document: {
      about,
      amenities,
      // avatar,
      // details,
      pictures,
      premium,
      price,
      rating,
      title,
      location,
    },
    tab,
  } = currentItem;

  const {fiveStar, fourStar, threeStar, twoStar, oneStar} = rating;
  const averageRating =
    (5 * fiveStar + 4 * fourStar + 3 * threeStar + 2 * twoStar + 1 * oneStar) /
    (fiveStar + fourStar + threeStar + twoStar + oneStar);

  useEffect(() => {
    if (!currentItem.tab && !currentItem.item && !currentItem.category) {
      dispatch(
        fetchOurServicesItem({
          tabParam,
          countryParam,
          cityParam,
          categoryParam,
          itemParam,
        }),
      );
    }
  }, [currentItem]);

  return (
    <View style={styles.container}>
      <LoadingIndicator loading={loading} />

      <ScrollView scrollEventThrottle={16}>
        <OurServicesHeader
          title={title}
          averageRating={averageRating}
          />

        <ExpandedContainer
          fromDate={fromDate}
          toDate={toDate}
          setShowSnackBarTrue={() => setShowSnackBar(true)}
        />

        <Slider pictures={pictures} />

        <DescriptionContainer
          premium={premium}
          destination={destination}
          price={price}
        />

        <AboutThisPlace about={about} />

        <RatingsChrisma averageRating={averageRating} />
        <PopularAmenities tab={tab} amenities={amenities} />
        <MapSection tab={tab} location={location} destination={destination} />
        <Amenities tab={tab} amenities={amenities} />
        <RatingContainer rating={rating} />
      </ScrollView>
      <Snackbar
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
        duration={5000}
        theme={{colors: {accent: root.primaryThemeColor}}}
        action={{
          label: 'Close',
          onPress: () => setShowSnackBar(false),
        }}>
        Dates can only be viewed
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// // ----------------------------------------------------------------
