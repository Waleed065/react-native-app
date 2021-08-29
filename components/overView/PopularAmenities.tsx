import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { root } from "../../css";
import { allAmenities } from "../../utils/allAmenities";

interface schema {
  tab: string;
  amenities: {
    [key: string]: boolean;
  };
}

export default function PopularAmenities({
  tab,
  amenities,
}: schema): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Popular Amenities</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {Object.keys(amenities)
          .filter((amenity) => amenities[amenity] === true)
          .slice(0, 5)
          .map((amenity, index) => {
            if (
              Object.prototype.hasOwnProperty.call(allAmenities[tab], amenity)
            ) {
              return (
                <View
                  key={index}
                  style={[
                    styles.amenityContainer,
                    index === 0 && { marginLeft: root.defaultSpace },
                  ]}
                >
                  {allAmenities[tab][amenity].icon}
                  <Text style={styles.text}>
                    {allAmenities[tab][amenity].title}
                  </Text>
                </View>
              );
            }
            return undefined;
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: root.defaultSpace,
  },
  heading: {
    marginHorizontal: root.defaultSpace,
    marginBottom: 10,
    color: root.textColor2,
    fontWeight: root.textWeightBold as any,
    fontSize: root.textSizeLarge,
  },
  amenityContainer: {
    alignItems: "center",
    marginRight: root.defaultSpace,
  },
  text: {
    color: root.textColor2,
    fontSize: root.textSizeNormal,
    fontWeight: root.textWeightThin as any,
    marginTop: 5,
  },
});
