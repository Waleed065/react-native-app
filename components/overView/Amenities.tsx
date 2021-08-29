import React from "react";
import { StyleSheet, View } from "react-native";
import { root } from "../../css";
import { allAmenities } from "../../utils/allAmenities";
import AmenitiesItem from "./AmenitiesItem";

interface schema {
  tab: string;
  amenities: {
    [key: string]: boolean;
  };
}

export default function Amenities({ tab, amenities }: schema): JSX.Element {
  return (
    <View style={styles.container}>
      {Object.keys(amenities)
        .filter((amenity) => amenities[amenity] === true)
        .map((amenity) => {
          if (
            Object.prototype.hasOwnProperty.call(allAmenities[tab], amenity)
          ) {
            return (
              <AmenitiesItem
                key={amenity}
                icon={allAmenities[tab][amenity].icon}
                title={allAmenities[tab][amenity].title}
                details={allAmenities[tab][amenity].details}
              />
            );
          }
          return undefined;
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: root.defaultSpace,
    paddingBottom: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
