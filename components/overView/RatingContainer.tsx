import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { abbreviateNumber } from "../../utils";
import RatingBarItSelf from "./RatingBarItSelf";
import Ratings from "../Ratings";
import { root } from "../../css";

interface schema {
  rating: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
}
export default function RatingContainer({ rating }: schema): JSX.Element {
  const { fiveStar, fourStar, threeStar, twoStar, oneStar } = rating;
  const totalReviews = fiveStar + fourStar + threeStar + twoStar + oneStar;
  const averageRating =
    (5 * fiveStar + 4 * fourStar + 3 * threeStar + 2 * twoStar + 1 * oneStar) /
    (fiveStar + fourStar + threeStar + twoStar + oneStar);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reviews</Text>
      <View style={styles.flexBox}>
        <Text style={styles.text}>{`${abbreviateNumber(
          totalReviews
        )} Reviews`}</Text>
        <Ratings averageRating={averageRating} />
      </View>
      <View>
        <RatingBarItSelf
          barNumber={5}
          totalReviews={totalReviews}
          recievedReviews={fiveStar}
        />
        <RatingBarItSelf
          barNumber={4}
          totalReviews={totalReviews}
          recievedReviews={fourStar}
        />
        <RatingBarItSelf
          barNumber={3}
          totalReviews={totalReviews}
          recievedReviews={threeStar}
        />
        <RatingBarItSelf
          barNumber={2}
          totalReviews={totalReviews}
          recievedReviews={twoStar}
        />
        <RatingBarItSelf
          barNumber={1}
          totalReviews={totalReviews}
          recievedReviews={oneStar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: root.defaultSpace,
    flex: 1,
  },
  flexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    marginRight: 10,
  },
  heading: {
    color: root.textColor2,
    fontSize: root.textSizeLarge,
    fontWeight: root.textWeightBold as any,
    marginBottom: 5,
  },
});
