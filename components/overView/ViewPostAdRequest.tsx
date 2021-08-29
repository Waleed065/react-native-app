import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {
  getPostAdRequestDetails,
  getTrashAdRequestDetails,
} from '../../STORE/selectors';
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

import LoadingIndicator from '../LoadingIndicator';
import {useRoute} from '@react-navigation/native';
// import Calendar from "./Calendar";

const rating = {fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0};

export default function ViewPostAdRequest(): JSX.Element {
  const route = useRoute<any>();
  const {id, isInTrash} = route.params;
  const {
    destination,

    about,
    amenities,
    // avatar,
    // details,
    pictures,
    price,
    itemTitle,
    location,
    service,
  } = useSelector((state: stateTypes) =>
    !isInTrash
      ? getPostAdRequestDetails(state, id)
      : getTrashAdRequestDetails(state, id),
  );

  const loading = useSelector((state: stateTypes) => state.servicesLoading);

  const averageRating = 0;

  return (
    <View style={styles.container}>
      <LoadingIndicator loading={loading} />

      <ScrollView scrollEventThrottle={16}>
        <OurServicesHeader title={itemTitle} averageRating={averageRating} />

        <Slider pictures={pictures} />

        <DescriptionContainer
          premium={false}
          destination={destination}
          price={price}
        />

        <AboutThisPlace about={about} />

        <RatingsChrisma averageRating={averageRating} />
        <PopularAmenities tab={service} amenities={amenities} />
        <MapSection
          tab={service}
          location={location}
          destination={destination}
        />
        <Amenities tab={service} amenities={amenities} />
        <RatingContainer rating={rating} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// // ----------------------------------------------------------------
